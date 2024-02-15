// const db = require('../db/databaseSet.js');

// app.post('/image', (req, res) => {
// 	console.log('하이하이');
// 	console.log(req);
// 	console.log('하이하이');
// });

// app.get('/header', (req, res) => {
// 	res.send({
// 		success: true,
// 		username: '하단',
// 		image: 'url',
// 	});
// });

const multer = require('multer');
const mime = require('mime-types');

const upload = multer({
	storage: multer.diskStorage({
		filename(req, file, done) {
			console.log(file);
			done(null, file.originalname);
		},
		destination(req, file, done) {
			console.log(file);
			done(null, path.join(__dirname, 'temp'));
		},
	}),
	fileFilter: (req, file, cb) => {
		if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype))
			cb(null, true);
		else cb(new Error('해당 파일의 형식을 지원하지 않습니다.'), false);
	},
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

// async function noticeImage(req, res) {
// 	console.log(await req.body.image);
// }

module.exports = {
	upload,
};
