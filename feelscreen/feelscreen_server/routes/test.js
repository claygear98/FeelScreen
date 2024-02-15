const express = require('express');
const app = express();
const multer = require('multer'); // (1)
const path = require('path');
const mime = require('mime-types');
const { v4: uuid } = require('uuid');
const cors = require('cors');

let imageNames = [
	'3f292902-58ef-44e2-b3a4-b409838f3151.jpeg',
	'7c419739-4d78-4e6e-b090-e8af6cebd027.jpeg',
];

app.use(cors());
const storage = multer.diskStorage({
	// (2)
	destination: (req, file, cb) => {
		// (3)

		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		// (4)

		cb(null, `${uuid()}.${mime.extension(file.mimetype)}`); // (5)
	},
});

const upload = multer({
	// (6)
	storage,
	fileFilter: (req, file, cb) => {
		if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
			console.log(5);
			cb(null, true);
		} else cb(new Error('해당 파일의 형식을 지원하지 않습니다.'), false);
	},
	limits: {
		fileSize: 1024 * 1024 * 5,
	},
});

app.post('/image', upload.single('image'), async (req, res) => {
	// (7)
	console.log(req.file);
	// res.status(200).json(req.file);
});

app.post('/notice-post', (req, res) => {
	console.log('hello');

	// let imageName = '2dd3caa7-8a4b-46f4-86eb-a46cff8363ae.jpeg';
	let from = './images';
	let to = '../../public/assets/notice';
	moveImage(from, to, imageNames);
});

app.use('/', express.static(path.join(__dirname, 'images'))); // (8)
app.listen(3001, () => {
	console.log('Server is running on port');
});
