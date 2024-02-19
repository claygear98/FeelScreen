const userDB = require('../db/userDB.js');

function feelAll(res) {
	userDB.feelstaAll(res);
}

module.exports = {
	feelAll,
};
