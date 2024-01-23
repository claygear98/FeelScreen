const express = require('express');
const app = express();
const db = require('../db/databaseSet.js');

app.use(express.json());
const encode = require('../crypto/Usercrypto.js');

app.listen(3000, () => {
	console.log('안뇽');
});

app.post('', (req, res) => {});
