const multer = require('multer');
const userDB = require('../db/userDB.js');

function feelAll(res) {
	userDB.feelstaAll(res);
}

function feelOne(id, res) {
	userDB.feelstaOne(id, res);
}

function feelPost(req, res, urlArr) {
	userDB.feelstaPost(req, res, urlArr);
}

const storage = multer.diskStorage({
	// (2)
	destination: (req, file, cb) => {
		// (3)

		cb(null, '../../public/assets/feelsta');
	},
	filename: (req, file, cb) => {
		// (4)
		cb(null, file.originalname); // (5)
	},
});

const FeelUpload = multer({
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

module.exports = {
	feelAll,
	feelOne,
	feelPost,
	FeelUpload,
};
