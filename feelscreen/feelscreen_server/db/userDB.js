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
					let accessToken = 'Bearer ' + jwt.sign(user_id);
					let refreshToken = jwt.refresh();

					await redisCli.set(user_id.toString(), refreshToken);
					let data = await redisCli.get(user_id.toString());

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
				console.log(req.body.phone, ' ', random);
				axios.post(
					'https://apis.aligo.in/send/',
					sms.send(req, res, random, req.body.phone)
				);
			}
		}
	});

	return random;
}

module.exports = {
	logIn,
	allow,
	duplicate,
};
