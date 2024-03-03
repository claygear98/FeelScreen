const db = require('../db/databaseSet.js');
const jwt = require('../JWT/jwt-util.js');
const axios = require('axios');
const sms = require('../sms/aligo_sms.js');
const redisClient = require('../JWT/redis.js');
const crypto = require('crypto');
//redis 연결
redisClient.on('connect', () => {
	console.info('Redis connected!');
});
redisClient.on('error', (err) => {
	console.error('Redis Client Error', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4;

function logIn(sql, password, res) {
	// let check = false;
	db.query(sql, async function (error, result) {
		if (error) {
			res.send({ success: false, message: 'DB ERROR' });
		} else {
			console.log(result);
			if (result.length === 0) {
				res.send({ success: false, message: 'NOT FOUND PHONE' });
			} else if (result.length === 1) {
				//패스워드 확인해주기
				//맞으면 토큰 생성 후 보내주기
				let salt = result[0].PASSWORDSALT;
				let check = crypto
					.pbkdf2Sync(password, salt, 1, 32, 'sha512')
					.toString('hex');

				if (result[0].PASSWORD === check) {
					let user_id = result[0].USER_ID;
					let accessToken = jwt.sign(user_id); //'Bearer ' +
					let refreshToken = jwt.refresh();

					await redisCli.set(user_id.toString(), refreshToken);
					await redisCli.set(user_id + 'access', accessToken);
					res.send({
						success: true,
						Authorization: accessToken,
						Refresh: refreshToken,
					});
				} else {
					res.send({ success: false, message: 'password is incorrect' });
				}
			}
		}
	});
}

function allow(sql, res) {
	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'SAVE FAILED' });
		} else {
			res.send({ success: true });
		}
	});
}

function duplicate(sql, req, res) {
	let random = 0;
	console.log('dhkd');
	db.query(sql, async function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'SAVE FAILED' });
		} else {
			if ((await result.length) !== 0) {
				res.send({ success: false, message: 'DUPLICATE PHONE' });
			} else {
				random = Math.floor(Math.random() * 100000);
				// console.log(req.body.phone, ' ', random);
				axios.post(
					'https://apis.aligo.in/send/',
					sms.send(req, res, random, req.body.phone)
				);
			}
		}
	});

	return random;
}

function header(id, res) {
	let sql = `SELECT USERNAME, PROFILEIMAGE FROM USER WHERE USER_ID = ${id}`;
	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({
				success: true,
				username: result[0].USERNAME,
				image: result[0].PROFILEIMAGE,
			});
		}
	});
}

function feelstaAll(res) {
	//
	let sql = `SELECT 
    feelsta.FEELSTA_ID, 
    feelsta.FEELSTA_IMAGE, 
    feelsta.FEELSTA_CONTENT, 
    feelsta.FEELSTA_DATE, 
    (SELECT COUNT(FEELSTA_ID) FROM HEART WHERE feelsta.FEELSTA_ID = HEART.FEELSTA_ID) AS FEELSTA_LIKE, 
    feelsta.FEELSTA_TAG, 
    (SELECT COUNT(*) FROM COMMENT WHERE COMMENT.FEELSTA_ID = feelsta.FEELSTA_ID) AS COMMENTS,
    USER.USERNAME, 
    USER.PROFILEIMAGE
	FROM FEELSTA
	JOIN USER ON feelsta.USER_ID = USER.USER_ID
	ORDER BY FEELSTA_DATE DESC`;

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
		feelsta.FEELSTA_LIKE, 
		feelsta.FEELSTA_TAG, 
		(
			SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
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
	let sql = `INSERT INTO FEELSTA (FEELSTA_CONTENT, FEELSTA_LIKE, FEELSTA_TAG, FEELSTA_DATE, FEELSTA_IMAGE, USER_ID) VALUES ("${req.body.description}", 0, "${req.body.tag}",date_format(now(), '%Y-%m-%d %H:%i:%s'), "${urlArr}", 15)`;

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

function noticePost(title, content, res) {
	// content = content
	// 	.replaceAll(/style='(.*?)'/g, '')
	// 	.replaceAll(/<img(.*?)>/g, '<img$1 />'); // 이미지 태그에 닫힌 태그 추가

	let sql = `INSERT INTO NOTICE (NOTICETITLE, NOTICECONTENT, NOTICEDATE) VALUES ("${title}", "${content}", date_format(now(), '%Y-%m-%d %H:%i:%s'))`;

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
module.exports = {
	logIn,
	allow,
	duplicate,
	header,
	feelstaAll,
	noticeList,
	feelstaOne,
	feelstaPost,
	noticePost,
	noticeDetail,
};
