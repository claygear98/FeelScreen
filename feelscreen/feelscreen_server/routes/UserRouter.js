const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController.js');
const mainController = require('../controllers/mainController.js');
const mypageController = require('../controllers/mypageController.js');
const createToken = require('../JWT/jwt-util.js');
const JWT = require('../JWT/jwtMiddle.js');

//로그인(토큰 생성)
router.post('/log-in', loginController.login);

//헤더 요청(토큰 필요)
router.post('/header', JWT.authJWT, mainController.header);

// //리프레시 토큰 재요청
// router.get('/refresh', (req, res) => {
// 	createToken.refresh(req, res);
// });

//닉네임 수정
router.patch('/namemodify', JWT.authJWT, mypageController.nameUpdate);

//회원탈퇴
router.delete('/delete', JWT.authGetJWT, mypageController.userDelete);

router.get('/feelsta', JWT.authGetJWT, mypageController.userFeelsta);
