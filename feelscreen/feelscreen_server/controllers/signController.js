//회원가입과 관련한 api 요청
const express = require('express');
const app = express();
const db = require('../db/databaseSet.js');
const sms = require('../sms/aligo_sms.js');
const axios = require('axios');
let random;
app.use(express.json());
const encode = require('../crypto/Usercrypto.js');
const cors = require('cors');

app.use(cors());
app.listen(3001, () => {
	console.log('안뇽');
});

//회원가입 요청
app.post('/sign-up/allow', (req, res) => {
	const { username, phone, password, code } = req.body;

	if (!code) {
		res.send({ success: false, message: 'CODE DISABLED' });
	}

	const { passwordSalt, passwordEn } = encode.hash(password); //비밀번호 암호화
	let phoneEn = encode.AES_encrypt(phone);

	let sql = `INSERT INTO USER (USERNAME, PHONE, PASSWORD, PASSWORDSALT) VALUES ("${username}", "${phoneEn}","${passwordEn}", "${passwordSalt}")`;

	db.query(sql, function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'SAVE FAILED' });
		} else {
			res.send({ success: true });
		}
	});
});

//전화번호 인증 요청
app.post('/sign-up/phone', (req, res) => {
	//전화번호 중복 확인
	let phoneEn = encode.AES_encrypt(req.body.phone);

	let sql = `SELECT USER_ID FROM USER WHERE PHONE="${phoneEn}"`;

	db.query(sql, async function (error, result) {
		if (error) {
			console.log(error);
			res.send({ success: false, message: 'SAVE FAILED' });
		} else {
			if ((await result.length) !== 0) {
				return res.send({ success: false, message: 'DUPLICATE PHONE' });
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
});

//인증번호 확인 요청
app.post('/sign-up/code', (req, res) => {
	if (req.body.autoCode.toString() === random.toString()) {
		res.send({ success: true });
	} else {
		res.send({ success: false });
	}
});
