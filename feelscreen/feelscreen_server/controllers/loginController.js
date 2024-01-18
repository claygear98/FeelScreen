//로그인, 로그아웃

const mysql = require('mysql2');
const express = require('express');
const app = express();
const db = require('../db/databaseSet.js');

app.use(express.json());
const encode = require('../crypto/Usercrypto.js');

app.listen(3000, () => {
	console.log('안뇽');
});

app.post('/log-in', (req, res) => {
	const [phone, password] = req.body;

	let phoneEn = encode.AES_encrypt(phone);

	let sql = `SELECT USER_ID, PASSWORD FROM USER WHERE PASSWORD="${phoneEn}"`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: '' });
		} else {
			if (result.length === 0) {
				res.send({ success: false, message: 'NOT FOUND PHONE' });
			} else if (result.length === 1) {
				//패스워드 확인해주기
				//맞으면 토큰 생성 후 보내주기

				res.send({ success: true });
			}
		}
	});
});
