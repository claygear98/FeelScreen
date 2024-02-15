const fs = require('fs').promises;

async function moveImage(sourceDir, destDir, imageNames) {
	try {
		// 읽기 가능한 디렉터리인지 확인
		await fs.access(sourceDir, fs.constants.R_OK);

		// 대상 디렉터리가 존재하지 않으면 생성
		await fs.mkdir(destDir, { recursive: true });

		for (let imageName of imageNames) {
			const sourcePath = path.join(sourceDir, imageName);
			const destPath = path.join(destDir, imageName);
			// 파일 복사
			await fs.copyFile(sourcePath, destPath);

			// 원본 파일 삭제
			await fs.unlink(sourcePath);
		}

		console.log('이미지 이동이 성공적으로 완료되었습니다.');
	} catch (err) {
		console.error(`이미지 이동 중 오류 발생: ${err.message}`);
	}
}

module.exports = {
	moveImage,
};
