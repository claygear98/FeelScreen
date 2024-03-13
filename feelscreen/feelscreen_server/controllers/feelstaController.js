const multer = require('multer');
const feelstaDB = require('../db/feelstaDB.js');
let count = 0;

function feelAll(res) {
	if (count === 0) {
	} else {
		count += 3;
	}

	console.log('count', count);
	feelstaDB.feelstaAll(count, res);
}

function feelOne(id, res) {
	feelstaDB.feelstaOne(id, res);
}

function feelPost(req, res, urlArr, user_id) {
	console.log(req.body.tag);
	feelstaDB.feelstaPost(req, res, urlArr, user_id);
}

function feelLike(user_id, feelsta_id, res) {
	feelstaDB.feelstaLike(user_id, feelsta_id, res);
}

function feelDeleteLike(user_id, feelsta_id, res) {
	feelstaDB.feelstaDeleteLike(user_id, feelsta_id, res);
}

function feelstaMin(res) {
	feelstaDB.feelstaMin(res);
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
	feelLike,
	feelDeleteLike,
	feelstaMin,
	FeelUpload,
};
