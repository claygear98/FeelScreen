//로그인, 로그아웃
const express = require('express');
const app = express();
const db = require('../db/databaseSet.js');
const redisClient = require('../JWT/redis.js');

const encode = require('../crypto/Usercrypto.js');

//redis 연결
redisClient.on('connect', () => {
	console.info('Redis connected!');
});
redisClient.on('error', (err) => {
	console.error('Redis Client Error', err);
});

redisClient.connect().then(); // redis v4 연결 (비동기)

app.use(express.json());

app.listen(3000, () => {
	console.log('안뇽');
});

app.post('/log-in', (req, res) => {
	const { phone, password } = req.body;

	let phoneEn = encode.AES_encrypt(phone);

	let sql = `SELECT USER_ID, PASSWORD, PASSWORDSALT FROM USER WHERE PHONE = "${phoneEn}"`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: '' });
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
					//토큰 생성
				} else {
					res.send({ success: false, message: 'password is incorrect' });
				}

				res.send({ success: true });
			}
		}
	});
});
