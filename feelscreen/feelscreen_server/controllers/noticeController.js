const noticeDB = require('../db/noticeDB.js');

const noticePost = async (req, res) => {
	let image = imageNames.filter((name) => {
		if (req.body.content.includes(name)) {
			return name;
		}
	});
	imageNames = [];

	let from = './images';
	let to = '../../public/assets/notice';

	await imageMove.moveImage(from, to, image, req, res);
};

const noticeList = (req, res) => {
	noticeDB.noticeList(res);
};

const noticeDetail = (req, res) => {
	let { notice_id } = req.query;
	noticeDB.noticeDetail(notice_id, res);
};

const noticeMin = (req, res) => {
	noticeDB.noticeMin(res);
};

const noticeDelete = (req, res) => {
	noticeDB.noticeDelete(req.get('noticeId'), res);
};

const imageDelete = (req, res) => {
	let image = [...imageNames];
	imageNames = [];

	imageMove.imageDelete(image);

	console.log('뒤로가기 확인 완');
};

module.exports = {
	noticePost,
	noticeList,
	noticeDetail,
	noticeMin,
	noticeDelete,
	imageDelete,
};
