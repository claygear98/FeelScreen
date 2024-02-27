const express = require('express');
const router = express.Router();
const app = express();
const loginController = require('../controllers/loginController.js');
const signController = require('../controllers/signController.js');
const noticeController = require('../controllers/noticeController.js');
const mainController = require('../controllers/mainController.js');
const feelstaController = require('../controllers/feelstaController.js');
const commentController = require('../controllers/commentController.js');
const imageMove = require('./imageMove.js');
const cors = require('cors');
const path = require('path');
const multer = require('multer'); // (1)
const JWT = require('../JWT/jwtMiddle.js');

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

//로그인
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
app.post('/image', upload.single('image'), async (req, res) => {
	res.status(200).json(req.file);
});

//공지 게시물 등록
app.post('/notice-post', async (req, res) => {
	imageNames = imageNames.filter((name) => {
		if (req.body.content.includes(name)) {
			return name;
		}
	});

	let from = './images';
	let to = '../../public/assets/notice';

	await imageMove.moveImage(from, to, imageNames, req, res);

	// noticeController.noticePost(req.body.title, req.body.content, res);
});

//헤더 요청
router.post('/header', async (req, res) => {
	mainController.header(await JWT.authJWT(req, res), res);
});

//필스타 전체 목록
router.get('/feelsta', (req, res) => {
	feelstaController.feelAll(res);
});

router.get('/notice', (req, res) => {
	noticeController.noticeList(res);
});

//진행 중
router.get('/feelstadetail', (req, res) => {
	let { feelsta_id } = req.query;

	feelstaController.feelDetail(feelsta_id, res);
});

//필스타 등록
router.post(
	'/feelsta-post',
	feelstaController.FeelUpload.array('image', 4),
	async (req, res) => {
		let user_id = await JWT.authJWT(req, res);

		let urlArr = new Array();
		for (let i = 0; i < req.files.length; i++) {
			urlArr.push(`/assets/feelsta/${req.files[i].originalname}`);
		}

		console.log(req.body);

		feelstaController.feelPost(req, res, urlArr, user_id);
	}
);

//댓글 등록
router.post('/feelsta/comment-register', async (req, res) => {
	let user_id = await JWT.authJWT(req, res);

	commentController.feelComment(req, res, user_id);
});

app.use('/', express.static(path.join(__dirname, 'images')));
app.use('/', router);
app.listen(3001, () => {
	console.log('Server is running on port');
});
