const express = require('express');
const router = express.Router();
const app = express();
const loginController = require('../controllers/loginController.js');
const signController = require('../controllers/signController.js');
const noticeController = require('../controllers/noticeController.js');
const mainController = require('../controllers/mainController.js');
const imageMove = require('./imageMove.js');
const cors = require('cors');
const path = require('path');
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
		let name = `${uuid()}.${mime.extension(file.mimetype)}`;
		imageNames.push(name);
		cb(null, name); // (5)
	},
});

const upload = multer({
	// (6)
	storage,
	fileFilter: (req, file, cb) => {
		if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
			console.log(5);
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
	console.log(req.file);
	// res.status(200).json(req.file);
});

//공지 게시물 등록
app.post('/notice-post', (req, res) => {
	let from = './images';
	let to = '../../public/assets/notice';

	console.log(req.body);
	imageMove.moveImage(from, to, imageNames);
});

//헤더 요청
router.post('/header', async (req, res) => {
	mainController.header(await JWT.authJWT(req, res), res);
});

app.use('/', express.static(path.join(__dirname, 'images')));
app.use('/', router);
app.listen(3001, () => {
	console.log('Server is running on port');
});
