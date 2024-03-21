const db = require('../db/databaseSet.js');

function noticeList(res) {
	let sql = `SELECT NOTICE_ID, NOTICETITLE FROM NOTICE ORDER BY NOTICEDATE DESC`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({
				success: true,
				notice: result,
			});
		}
	});
}

function noticePost(title, content, imagenames, res) {
	content = content
		.replaceAll(/style='(.*?)'/g, '')
		.replaceAll(/<img(.*?)>/g, '<img$1 />'); // 이미지 태그에 닫힌 태그 추가

	let sql = `INSERT INTO NOTICE (NOTICETITLE, NOTICECONTENT, NOTICEDATE, NOTICENAME) VALUES ("${title}", "${content}", date_format(now(), '%Y-%m-%d %H:%i:%s'), "${imagenames}")`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({
				success: true,
			});
		}
	});
}

function noticeDetail(notice_id, res) {
	let sql = `SELECT NOTICE_ID, NOTICETITLE, NOTICECONTENT, NOTICEDATE FROM NOTICE WHERE NOTICE_ID = ${notice_id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({
				success: true,
				notice: result,
			});
		}
	});
}

function noticeMin(res) {
	let sql = `SELECT NOTICE_ID, NOTICETITLE FROM NOTICE ORDER BY NOTICEDATE DESC LIMIT 3`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true, result: result });
		}
	});
}

function noticeDelete(notice_id, res) {
	let sql = `DELETE FROM NOTICE WHERE NOTICE_ID = ${notice_id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

module.exports = {
	noticeDetail,
	noticeList,
	noticePost,
	noticeMin,
	noticeDelete,
};
