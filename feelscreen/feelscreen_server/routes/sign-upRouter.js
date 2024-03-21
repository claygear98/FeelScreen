const signController = require('../controllers/signController.js');
const express = require('express');
const router = express.Router();

//회원가입
router.post('/allow', (req, res) => {
	signController.allow(req, res);
});

router.post('/phone', (req, res) => {
	signController.phone(req, res);
});

router.post('/code', signController.code);

module.exports = router;
