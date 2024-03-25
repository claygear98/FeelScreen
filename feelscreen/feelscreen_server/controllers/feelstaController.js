const multer = require('multer');
const feelstaDB = require('../db/feelstaDB.js');

const feelAllDate = (req, res) => {
	console.log(req.query);
	feelstaDB.feelstaAllDate(req.query.counter, res);
};

const feelAllLike = (req, res) => {
	console.log(req.query);
	feelstaDB.feelstaAllLike(req.query.counter, res);
};

const feelOne = (req, res) => {
	let feelsta_id = req.query.feelsta_id;

	feelstaDB.feelstaOne(feelsta_id, res);
};

const feelPost = (req, res) => {
	let user_id = req.userId;
	console.log(user_id, '바보');
	let urlArr = new Array();
	for (let i = 0; i < req.files.length; i++) {
		urlArr.push(`/assets/feelsta/${req.files[i].originalname}`);
	}

	feelstaDB.feelstaPost(req, res, urlArr, user_id);
};

const feelstaMin = (req, res) => {
	feelstaDB.feelstaMin(res);
};
const feelstaDelete = (req, res) => {
	console.log(req.body);
	feelstaDB.feelstaDelete(req.get('feelsta_id'), res);
};

const feelstaUpdate = (req, res) => {};

//좋아요
function feelLike(req, res) {
	let user_id = req.userId;

	feelstaDB.feelstaLike(user_id, req.get('feelsta_id'), res);
}

function feelDeleteLike(req, res) {
	let user_id = req.userId;
	feelstaDB.feelstaDeleteLike(user_id, req.get('feelsta_id'), res);
}

//댓글
const feelCommentPost = (req, res) => {
	feelstaDB.feelstaCommentPost(req, res);
};

const feelCommentModify = (req, res) => {
	feelstaDB.feelstaCommentModify(req, res);
};

const feelCommentDelete = (req, res) => {
	feelstaDB.feelstaCommentDelete(req, res);
};

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
