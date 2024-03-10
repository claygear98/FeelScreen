//마이페이지 요청(회원정보 수정, 정보 get, 탈퇴)
const userDB = require('../db/userDB.js');
const jsonwebtoken = require('jsonwebtoken');

const nameUpdate = (req, res) => {
	let user_id = jwt.decode(req.get('Authorization')).id;

	userDB.nameUpdate(user_id, req.get('username'), res);
};

const userDelete = (req, res) => {
	let user_id = jwt.decode(req.get('Authorization')).id;

	userDB.userDelete(user_id, password, res);
};
module.exports = { nameUpdate, userDelete };
