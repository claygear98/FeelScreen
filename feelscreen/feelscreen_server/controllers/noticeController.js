const userDB = require('../db/userDB.js');

function noticePost(title, content, res) {
	userDB.noticePost(title, content, res);
}

function noticeList(res) {
	userDB.noticeList(res);
}

function noticeDetail(notice_id, res) {
	userDB.noticeDetail(notice_id, res);
}
module.exports = {
	noticePost,
	noticeList,
	noticeDetail,
};
