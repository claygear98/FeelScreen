const express = require('express');
const router = express.Router();
const app = express();
const loginController = require('../controllers/loginController.js');
const signController = require('../controllers/signController.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());

router.post('/log-in', loginController.login);

router.post('/sign-up/allow', (req, res) => {
	signController.allow(req, res);
});

router.post('/sign-up/phone', (req, res) => {
	console.log('통과');
	signController.phone(req, res);
});

router.post('/sign-up/code', signController.code);

app.use('/', router);
app.listen(3001, () => {
	console.log('Server is running on port');
});
