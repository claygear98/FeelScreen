//마이페이지 요청(회원정보 수정, 정보 get, 탈퇴)
const userDB = require('../db/userDB.js');
const jsonwebtoken = require('jsonwebtoken');

const nameUpdate = (req, res) => {
	let user_id = req.userId;

	userDB.userUpdate(user_id, req.body.username, res);
};

const userDelete = (req, res) => {
	let user_id = req.userId;

	userDB.userDelete(user_id, req.get('password'), res);
};

const userFeelsta = (req, res) => {
	let user_id = req.userId;

	userDB.userFeelsta(user_id, res);
};
module.exports = { nameUpdate, userDelete, userFeelsta };
