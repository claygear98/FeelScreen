const userDB = require('../db/userDB.js');

function noticePost(req, res, next) {}

function noticeList(res) {
	userDB.noticeList(res);
}

module.exports = {
	noticePost,
	noticeList,
};
