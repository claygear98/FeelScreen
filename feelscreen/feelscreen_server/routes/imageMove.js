const fs = require('fs').promises;
const path = require('path');
const nc = require('../controllers/noticeController');

async function moveImage(sourceDir, destDir, imageNames, req, res) {
	try {
		// 읽기 가능한 디렉터리인지 확인
		await fs.access(sourceDir, fs.constants.R_OK);

		// 대상 디렉터리가 존재하지 않으면 생성
		await fs.mkdir(destDir, { recursive: true });

		console.log(imageNames);
		for (let imageName of imageNames) {
			const sourcePath = path.join(sourceDir, imageName);
			const destPath = path.join(destDir, imageName);
			// 파일 복사
			await fs.copyFile(sourcePath, destPath);

			// 원본 파일 삭제
			await fs.unlink(sourcePath);
		}

		console.log('이미지 이동이 성공적으로 완료되었습니다.');
		nc.noticePost(req.body.title, req.body.content, res);
	} catch (err) {
		console.error(`이미지 이동 중 오류 발생: ${err}`);
		res.send({ success: false });
	}
}

async function imageDelete(imageNames) {
	for (let image of imageNames) {
		// if (await fs.exists('./image/' + image)) {
		// 파일이 존재한다면 true 그렇지 않은 경우 false 반환
		try {
			await fs.unlink('./image/' + image);
			console.log('image delete');
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = {
	moveImage,
	imageDelete,
};
