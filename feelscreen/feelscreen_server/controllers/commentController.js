const userDB = require('../db/userDB.js');

function feelComment(req, res, user_id) {
	userDB.feelstaDetail(req, res, user_id);
}

module.exports = {
	feelComment,
};
