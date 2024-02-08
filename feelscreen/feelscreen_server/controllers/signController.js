//회원가입과 관련한 api 요청
const userDB = require('../db/userDB.js');
const sms = require('../sms/aligo_sms.js');
const axios = require('axios');
let random;

const encode = require('../crypto/Usercrypto.js');

function allow(req, res) {
	const { username, phone, password, code } = req.body;

	if (!code) {
		res.send({ success: false, message: 'CODE DISABLED' });
	}

	const { passwordSalt, passwordEn } = encode.hash(password); //비밀번호 암호화
	let phoneEn = encode.AES_encrypt(phone);

	let sql = `INSERT INTO USER (USERNAME, PHONE, PASSWORD, PASSWORDSALT) VALUES ("${username}", "${phoneEn}","${passwordEn}", "${passwordSalt}")`;

	userDB.allow(sql, res);
}

function phone(req, res) {
	console.log('시작');
	//전화번호 중복 확인
	let phoneEn = encode.AES_encrypt(req.body.phone);

	let sql = `SELECT USER_ID FROM USER WHERE PHONE="${phoneEn}"`;

	let dbResult = userDB.duplicate(sql, req, res);

	random = dbResult;
}

const code = function (req, res) {
	console.log(req.body.code);
	if (req.body.code.toString() === random.toString()) {
		res.send({ success: true });
	} else {
		res.send({ success: false });
	}
};

module.exports = {
	allow,
	phone,
	code,
};
