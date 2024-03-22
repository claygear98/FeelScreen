const express = require('express');
const router = express.Router();
const feelstaController = require('../controllers/feelstaController.js');
const JWT = require('../JWT/jwtMiddle.js');
//필스타 전체 목록(최신순)
router.get('/view', feelstaController.feelAllDate);

//(좋아요순)
router.get('/likes', feelstaController.feelAllLike);

//등록
router.post(
	'/post',
	feelstaController.FeelUpload.array('image', 4),
	feelstaController.feelPost
);

//좋아요 등록
router.get('/postlike', JWT.authGetJWT, feelstaController.feelLike);

//좋아요 삭제
router.delete('/postlike', JWT.authGetJWT, feelstaController.feelDeleteLike);

router.get('/min', feelstaController.feelstaMin);

//댓글 등록
router.post(
	'/comment-register',
	JWT.authJWT,
	feelstaController.feelCommentPost
);

//필스타 삭제
router.delete('/delete', JWT.authGetJWT, feelstaController.feelstaDelete);

//댓글 수정
router.patch(
	'/comment-modify',
	JWT.authJWT,
	feelstaController.feelCommentModify
);

//댓글 삭제
router.delete(
	'/comment-delete',
	JWT.authJWT,
	feelstaController.feelCommentDelete
);

//필스타 디테일
router.get('/detail', feelstaController.feelOne);

module.exports = router;
