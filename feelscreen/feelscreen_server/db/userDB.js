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
    feelsta.FEELSTA_TITLE, 
    feelsta.FEELSTA_IMAGE, 
    feelsta.FEELSTA_CONTENT, 
    feelsta.FEELSTA_DATE, 
    feelsta.FEELSTA_LIKE, 
    feelsta.FEELSTA_TAG, 
    (SELECT COUNT(*) FROM COMMENT WHERE COMMENT.FEELSTA_ID = feelsta.FEELSTA_ID) AS COMMENTS,
    USER.USERNAME, 
    USER.PROFILEIMAGE
FROM FEELSTA
JOIN USER ON feelsta.USER_ID = USER.USER_ID;`;
	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			console.log(result);
			res.send({
				success: true,
				feelsta: result,
			});
		}
	});
}

function feelstaOne(id, res) {
	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			// console.log(result);
			res.send({
				success: true,
				notice: result,
			});
		}
	});
}

function feelstaPost(req, res, urlArr, user_id) {
	let sql = `INSERT INTO FEELSTA (FEELSTA_TITLE, FEELSTA_CONTENT, FEELSTA_LIKE, FEELSTA_TAG, FEELSTA_DATE, FEELSTA_IMAGE, USER_ID) VALUES ("${req.body.title}", "${req.body.description}", 0, "${req.body.tag}",CURDATE(), "${urlArr}", ${user_id})`;

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

function feelstaDetail(feelsta_id, res) {
	let sql = `SELECT 
	feelsta.FEELSTA_ID, 
	feelsta.FEELSTA_TITLE, 
	feelsta.FEELSTA_CONTENT, 
	feelsta.FEELSTA_DATE, 
	feelsta.FEELSTA_LIKE, 
	feelsta.FEELSTA_TAG,
	feelsta.FEELSTA_IMAGE, 
	USER.USERNAME, 
	USER.PROFILEIMAGE 
	FROM feelsta 
	JOIN USER ON feelsta.USER_ID = USER.USER_ID
	WHERE feelsta.FEELSTA_ID=${feelsta_id};`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			console.log(result);
			res.send({
				success: true,
			});
		}
	});
}

function noticeList(res) {
	let sql = `SELECT NOTICE_ID, NOTICETITLE FROM NOTICE`;

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
	let date = new Date();
	console.log('date', date);
	//
	let sql = `INSERT INTO NOTICE (NOTICETITLE, NOTICECONTENT, NOTICEDATE) VALUES ("${title}", "이 바보들아 너네는 미쳣다", date_format(now(), '%Y-%m-%d %H:%i:%s'))`;

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

module.exports = {
	logIn,
	allow,
	duplicate,
	header,
	feelstaAll,
	noticeList,
	feelstaOne,
	feelstaPost,
	feelstaDetail,
	noticePost,
};
