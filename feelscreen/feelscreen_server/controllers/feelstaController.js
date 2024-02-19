const userDB = require('../db/userDB.js');

function feelAll(res) {
	userDB.feelstaAll(res);
}

function feelOne(id, res) {
	userDB.feelstaOne(id, res);
}
module.exports = {
	feelAll,
	feelOne,
};
