const user = require('../db/userDB.js');

const header = (req, res) => {
	user.header(req.userId, res);
};

module.exports = {
	header,
};
