const express = require('express');
const router = express.Router();
const app = express();
const loginController = require('../controllers/loginController.js');
const signController = require('../controllers/signController.js');
const noticeController = require('../controllers/noticeController.js');
const mainController = require('../controllers/mainController.js');
const feelstaController = require('../controllers/feelstaController.js');
const commentController = require('../controllers/commentController.js');
const mypageController = require('../controllers/mypageController.js');
const imageMove = require('./imageMove.js');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const createToken = require('../JWT/jwt-util.js');
const JWT = require('../JWT/jwtMiddle.js');
const JWT_token = require('../JWT/refreshCheck.js');
const jwt = require('jsonwebtoken');

let imageNames = [];

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
	// (2)
	destination: (req, file, cb) => {
		// (3)

		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		// (4)
		imageNames.push(file.originalname);
		cb(null, file.originalname); // (5)
	},
});

const upload = multer({
	// (6)
	storage,
	fileFilter: (req, file, cb) => {
		if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
			cb(null, true);
		} else cb(new Error('해당 파일의 형식을 지원하지 않습니다.'), false);
	},
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

//로그인(토큰 생성)
router.post('/log-in', loginController.login);

//회원가입
router.post('/sign-up/allow', (req, res) => {
	signController.allow(req, res);
});

router.post('/sign-up/phone', (req, res) => {
	signController.phone(req, res);
});

router.post('/sign-up/code', signController.code);

//공지 사진 업로드
router.post('/image', upload.single('image'), async (req, res) => {
	res.status(200).json(req.file);
});

router.get('/imagedelete', (req, res) => {
	let image = [...imageNames];
	imageNames = [];

	imageMove.imageDelete(image);

	console.log('뒤로가기 확인 완');
});

//공지 게시물 등록
router.post('/notice-post', async (req, res) => {
	let image = imageNames.filter((name) => {
		if (req.body.content.includes(name)) {
			return name;
		}
	});
	imageNames = [];

	let from = './images';
	let to = '../../public/assets/notice';

	await imageMove.moveImage(from, to, image, req, res);
});

router.get('/noticeDetail', (req, res) => {
	let { notice_id } = req.query;
	noticeController.noticeDetail(notice_id, res);
});

//헤더 요청(토큰 필요)
router.post('/header', async (req, res) => {
	console.log(jwt.decode(req.body.Authorization).id);
	mainController.header(jwt.decode(req.body.Authorization).id, res);
});

//필스타 전체 목록
router.get('/feelsta', (req, res) => {
	feelstaController.feelAll(res);
});

router.get('/notice', (req, res) => {
	noticeController.noticeList(res);
});

router.get('/feelstadetail', (req, res) => {
	let { feelsta_id } = req.query;

	feelstaController.feelOne(feelsta_id, res);
});

router.get('/refresh', (req, res) => {
	res.send({ Authorization: createToken.refresh() });
});

//필스타 등록(토큰)
router.post(
	'/feelsta-post',
	feelstaController.FeelUpload.array('image', 4),
	async (req, res) => {
		let user_id = JWT.authJWT;

		let urlArr = new Array();
		for (let i = 0; i < req.files.length; i++) {
			urlArr.push(`/assets/feelsta/${req.files[i].originalname}`);
		}

		console.log(req.body);

		feelstaController.feelPost(req, res, urlArr, user_id);
	}
);

//댓글 등록(토큰)
router.post('/feelsta/comment-register', JWT.authJWT, async (req, res) => {
	let user_id = jwt.decode(req.body.Authorization).id;

	commentController.feelComment(req, res, user_id);
});

//좋아요 등록
router.get('/feelstalike', JWT.authGetJWT, async (req, res) => {
	let user_id = jwt.decode(req.body.Authorization).id;
	feelstaController.feelLike(user_id, req.get('feelsta_id'), res);
});

//좋아요 삭제
router.delete('/feelstalike', JWT.authGetJWT, async (req, res) => {
	let user_id = jwt.decode(req.body.Authorization).id;
	feelstaController.feelDeleteLike(user_id, req.get('feelsta_id'), res);
});

router.get('/feelstamin', (req, res) => {
	feelstaController.feelstaMin(res);
});

router.get('/noticemin', (req, res) => {
	noticeController.noticeMin(res);
});

router.delete('/notice', JWT.authJWT, (req, res) => {});
router.patch('/modify-user', JWT.authJWT, mypageController.nameUpdate);
app.use('/', express.static(path.join(__dirname, 'images')));
app.use('/', router);
app.listen(3001, () => {
	console.log('Server is running on port');
});
