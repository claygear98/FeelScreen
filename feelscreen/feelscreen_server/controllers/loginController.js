//로그인, 로그아웃

const encode = require('../crypto/Usercrypto.js');
const userDB = require('../db/userDB.js');

const login = async function (req, res, next) {
	const { phone, password } = req.body;

	let phoneEn = encode.AES_encrypt(phone);

	let sql = `SELECT USER_ID, PASSWORD, PASSWORDSALT FROM USER WHERE PHONE = "${phoneEn}"`;
	userDB.logIn(sql, password, res);
};

module.exports = {
	login,
};
