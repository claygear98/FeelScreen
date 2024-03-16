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
					let accessToken = jwt.sign(user_id);
					let refreshToken = jwt.refresh();

					await redisCli.set(user_id.toString(), refreshToken);
					// await redisCli.set(user_id + 'access', accessToken);

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

function userUpdate(user_id, username, res) {
	let sql = `UPDATE USER SET USERNAME = "${username}" WHERE USER_ID = ${user_id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

//탈퇴 전 비밀번호 확인
function userDelete(user_id, password, res) {
	let sql = `SELECT PASSWORD, PASSWORDSALT FROM USER WEHRE USER_ID = ${user_id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			let salt = result[0].PASSWORDSALT;
			let check = crypto
				.pbkdf2Sync(password, salt, 1, 32, 'sha512')
				.toString('hex');

			if (result[0].PASSWORD === check) {
				withDraw(user_id, res);
			} else {
				res.send({ success: false, message: 'incorrect password' });
			}
		}
	});
}

//회원 탈퇴
function withDraw(user_id, res) {
	let sql = `DELETE FROM USER WHERE USER_ID = ${user_id}`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			res.send({ success: true });
		}
	});
}

function userFeelsta(user_id, res) {
	let sql = `SELECT FEELSTA_CONTENT, FEELSTA_DATE, FEELSTA_IMAGE FROM FEELSTA WHERE USER_ID = ${user_id} ORDER BY FEELSTA_DATE DESC;`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'db error' });
		} else {
			console.log(result);
			res.status(200).send({ success: true, user: result });
		}
	});
}
module.exports = {
	logIn,
	allow,
	duplicate,
	header,
	userUpdate,
	userDelete,
	userFeelsta,
};
