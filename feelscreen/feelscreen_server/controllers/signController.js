//회원가입과 관련한 api 요청
const mysql = require('mysql2');
const express = require('express');
const app = express();
const db = require('../db/databaseSet.js');

app.use(express.json());
const encode = require('../crypto/Usercrypto.js');

app.listen(3000, () => {
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
	//req: phone
	//개발 순서
	/*
    1. 전화번호 db에 존재하는지 확인
    2. 존재여부에 따라 409에러 or 인증번호 생성해서 문자 보내주기
    */
	//res:
	/*
    중복된 전화번호
    "status": 409,
    "message": "DUPLICATE PHONE", 
    
    */
	//success:"true", "false" --> 인증번호 생성 완료
});

//인증번호 확인 요청
app.post('/sign-up/code', (req, res) => {
	//req : autoCode
	//res: success: true
});
