const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const feelstaRouter = require('./feelstaRouter.js');
const noticeRouter = require('./noticeRouter.js');
const userRouter = require('./UserRouter.js');
const signRouter = require('./sign-upRouter.js');

app.use(cors());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'images')));

app.use('/user', userRouter);
app.use('/feelsta', feelstaRouter);
app.use('/notice', noticeRouter);
app.use('/sign-up', signRouter);

app.listen(3001, () => {
	console.log('Server is running on port');
});
