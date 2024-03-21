const db = require('../db/databaseSet.js');

//최신순
function feelstaAllDate(count, res) {
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
	LIMIT ${count * 3}, 3`;

	db.query(sql, async function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			if (result.length < 3) {
				await res.send({
					success: true,
					end: true,
					feelsta: result,
				});
			} else {
				await res.send({
					success: true,
					end: false,
					feelsta: result,
				});
			}
		}
	});
}

//좋아요순
function feelstaAllLike(count, res) {
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
	ORDER BY FEELSTA_LIKE DESC
	LIMIT ${count * 3}, 3`;

	db.query(sql, async function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			if (result.length < 3) {
				await res.send({
					success: true,
					end: true,
					feelsta: result,
				});
			} else {
				console.log(result);
				await res.send({
					success: true,
					end: false,
					feelsta: result,
				});
			}
		}
	});
}

//필스타 디테일
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
					'USERNAME', USER.USERNAME,
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

//필스타 등록
function feelstaPost(req, res, urlArr, user_id) {
	let sql = `INSERT INTO FEELSTA (FEELSTA_CONTENT, FEELSTA_TAG, FEELSTA_DATE, FEELSTA_IMAGE, USER_ID) VALUES ("${req.body.description}", "${req.body.tag}",date_format(now(), '%Y-%m-%d %H:%i:%s'), "${urlArr}", 15)`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.status(200).send({
				success: true,
			});
		}
	});
}

//좋아요
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

//좋아요 취소
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

//메인화면
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

//댓글 등록
function feelstaCommentPost(req, res) {
	let sql = `INSERT INTO COMMENT (COMMENT_CONTENT, USER_ID, COMMENT_DATE, FEELSTA_ID)VALUES ("${req.body.Comment}", ${req.userId}, date_format(now(), '%Y-%m-%d %H:%i:%s'), ${req.body.feelsta_id});`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

//댓글 수정
function feelstaCommentModify(req, res) {
	let sql = `UPDATE COMMENT SET COMMENT_CONTENT = "${req.body.Comment}" WHERE COMMENT_ID = ${req.body.comment_id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

//댓글 삭제
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

//필스타 삭제
function feelstaDelete(feelsta_id, res) {
	let sql = `DELETE FROM FEELSTA, COMMENT, HEART WHERE FEELSTA_ID = ${feelsta_id}`;

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
	feelstaAllDate,
	feelstaAllLike,
	feelstaOne,
	feelstaPost,
	feelstaDeleteLike,
	feelstaLike,
	feelstaMin,
	feelstaCommentPost,
	feelstaCommentModify,
	feelstaCommentDelete,
	feelstaDelete,
};
