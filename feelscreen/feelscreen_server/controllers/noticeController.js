const userDB = require('../db/userDB.js');

function noticePost(title, content, res) {
	userDB.noticePost(title, content, res);
}

function noticeList(res) {
	userDB.noticeList(res);
}

module.exports = {
	noticePost,
	noticeList,
};
