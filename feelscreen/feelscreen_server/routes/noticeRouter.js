const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController.js');
const multer = require('multer');
const imageMove = require('./imageMove.js');

let imageNames = [];
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

//공지 삭제(진행 중)
router.delete('/delete', noticeController.noticeDelete);

router.get('/min', noticeController.noticeMin);

router.get('/view', noticeController.noticeList);

router.post('/notice-post', noticeController.noticePost);

router.get('/noticeDetail', noticeController.noticeDetail);

//공지 사진 업로드
router.post('/image', upload.single('image'), (req, res) => {
	res.status(200).json(req.file);
});

router.get('/imagedelete', noticeController.imageDelete);

module.exports = router;
