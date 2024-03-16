const db = require('../db/databaseSet.js');

function feelstaAll(count, res) {
	console.log(count);
	//
	let sql = `SELECT 
    feelsta.FEELSTA_ID, 
    feelsta.FEELSTA_IMAGE, 
    feelsta.FEELSTA_CONTENT, 
    feelsta.FEELSTA_DATE, 
    (SELECT COUNT(FEELSTA_ID) FROM HEART WHERE feelsta.FEELSTA_ID = HEART.FEELSTA_ID) AS FEELSTA_LIKE,
    (SELECT GROUP_CONCAT(USER.USERNAME SEPARATOR ',') FROM HEART
		JOIN USER ON HEART.USER_ID = USER.USER_ID
            WHERE HEART.FEELSTA_ID = FEELSTA.FEELSTA_ID) AS LIKE_NAME,
    feelsta.FEELSTA_TAG, 
    (SELECT COUNT(*) FROM COMMENT WHERE COMMENT.FEELSTA_ID = feelsta.FEELSTA_ID) AS COMMENTS,
    USER.USERNAME, 
    USER.PROFILEIMAGE
	FROM FEELSTA
	JOIN USER ON feelsta.USER_ID = USER.USER_ID
	ORDER BY FEELSTA_DATE DESC
	LIMIT 3 OFFSET ${count * 3}`;

	db.query(sql, async function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			await res.send({
				success: true,
				feelsta: result,
			});
		}
	});
}

function feelstaOne(id, res) {
	let sql = `
	SELECT 
		feelsta.FEELSTA_ID, 
		feelsta.FEELSTA_IMAGE, 
		feelsta.FEELSTA_CONTENT, 
		feelsta.FEELSTA_DATE,
		(SELECT COUNT(FEELSTA_ID) FROM HEART WHERE feelsta.FEELSTA_ID = HEART.FEELSTA_ID) AS FEELSTA_LIKE,
		feelsta.FEELSTA_TAG,
        (SELECT GROUP_CONCAT(USER.USERNAME SEPARATOR ',') FROM HEART
			JOIN USER ON HEART.USER_ID = USER.USER_ID
            WHERE HEART.FEELSTA_ID = FEELSTA.FEELSTA_ID) AS LIKE_NAME, 
		(
			SELECT JSON_ARRAYAGG(
                JSON_OBJECT
				(
					'COMMENT_ID', COMMENT.COMMENT_ID,
					'COMMENT_CONTENT', COMMENT.COMMENT_CONTENT,
					'USER_ID', COMMENT.USER_ID,
					'COMMENT_DATE', COMMENT.COMMENT_DATE,
					'PROFILEIMAGE', USER.PROFILEIMAGE
                )
            )
			FROM COMMENT
			JOIN USER ON COMMENT.USER_ID = USER.USER_ID   
			WHERE COMMENT.FEELSTA_ID = feelsta.FEELSTA_ID
		) AS COMMENTS,
		USER.USERNAME, 
		USER.PROFILEIMAGE
	FROM FEELSTA
	JOIN USER ON feelsta.USER_ID = USER.USER_ID
	WHERE feelsta.FEELSTA_ID = ${id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			// console.log(result);
			res.send({
				success: true,
				feelsta: result,
			});
		}
	});
}

function feelstaPost(req, res, urlArr, user_id) {
	let sql = `INSERT INTO FEELSTA (FEELSTA_CONTENT, FEELSTA_TAG, FEELSTA_DATE, FEELSTA_IMAGE, USER_ID) VALUES ("${req.body.description}", "${req.body.tag}",date_format(now(), '%Y-%m-%d %H:%i:%s'), "${urlArr}", 15)`;

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

function feelstaLike(user_id, feelsta_id, res) {
	let sql = `INSERT INTO HEART (FEELSTA_ID, USER_ID) VALUES (${feelsta_id}, ${user_id})`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: true, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

function feelstaDeleteLike(user_id, feelsta_id, res) {
	let sql = `DELETE FROM HEART WHERE (FEELSTA_ID = ${feelsta_id} AND USER_ID = ${user_id})`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: true, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

function feelstaMin(res) {
	let sql = `SELECT 
    feelsta.FEELSTA_ID, 
    feelsta.FEELSTA_IMAGE, 
    feelsta.FEELSTA_CONTENT, 
    feelsta.FEELSTA_DATE, 
    USER.USERNAME, 
    USER.PROFILEIMAGE
	FROM FEELSTA
	JOIN USER ON feelsta.USER_ID = USER.USER_ID
	ORDER BY FEELSTA_DATE DESC LIMIT 3`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true, result: result });
		}
	});
}

function feelstaCommentPost(req, res) {
	let sql = `INSERT INTO COMMENT VALUES (${req.body.comment}, ${req.userId}, date_format(now(), '%Y-%m-%d %H:%i:%s'), ${req.body.feelsta_id});`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

function feelstaCommentModify(req, res) {
	let sql = `UPDATE COMMENT SET COMMENT_CONTENT = ${req.body.comment} WHERE COMMENT_ID = ${req.body.comment_id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

function feelstaCommentDelete(req, res) {
	let sql = `DELETE FROM COMMENT WHERE COMMENT_ID = ${req.body.comment_id}`;

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
	feelstaAll,
	feelstaOne,
	feelstaPost,
	feelstaDeleteLike,
	feelstaLike,
	feelstaMin,
	feelstaCommentPost,
	feelstaCommentModify,
	feelstaCommentDelete,
};
