const multer = require('multer');
const feelstaDB = require('../db/feelstaDB.js');

function feelAllDate(req, res) {
	feelstaDB.feelstaAllDate(req.get('counter'), res);
}

function feelAllLike(req, res) {
	feelstaDB.feelstaAllLike(req.get('counter'), res);
}

function feelOne(id, res) {
	feelstaDB.feelstaOne(id, res);
}

function feelPost(req, res, urlArr, user_id) {
	console.log(req.body.tag);
	feelstaDB.feelstaPost(req, res, urlArr, user_id);
}

function feelstaMin(res) {
	feelstaDB.feelstaMin(res);
}
const feelstaDelete = (req, res) => {
	feelstaDB.feelstaDelete(req.get('feelsta_id'), res);
};

const feelstaUpdate = (req, res) => {};

//좋아요
function feelLike(user_id, feelsta_id, res) {
	feelstaDB.feelstaLike(user_id, feelsta_id, res);
}

function feelDeleteLike(user_id, feelsta_id, res) {
	feelstaDB.feelstaDeleteLike(user_id, feelsta_id, res);
}

//댓글
const feelCommentPost = (req, res) => {
	feelstaDB.feelstaCommentPost(req, res);
};
const feelCommentModify = (req, res) => {};
const feelCommentDelete = (req, res) => {};

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
	feelAllDate,
	feelAllLike,
	feelOne,
	feelPost,
	feelLike,
	feelDeleteLike,
	feelstaMin,
	FeelUpload,
	feelCommentPost,
	feelCommentModify,
	feelCommentDelete,
	feelstaDelete,
	feelstaUpdate,
};
