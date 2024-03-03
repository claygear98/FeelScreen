const noticeDB = require('../db/noticeDB.js');

function noticePost(title, content, res) {
	noticeDB.noticePost(title, content, res);
}

function noticeList(res) {
	noticeDB.noticeList(res);
}

function noticeDetail(notice_id, res) {
	noticeDB.noticeDetail(notice_id, res);
}

module.exports = {
	noticePost,
	noticeList,
	noticeDetail,
};
