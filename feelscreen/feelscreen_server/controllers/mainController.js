const user = require('../db/userDB.js');

function header(id, res) {
	user.header(id, res);
}

module.exports = {
	header,
};
