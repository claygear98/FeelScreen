const { verify } = require('./jwt-util');

const authJWT = (req, res, next) => {
	if (req.body.Authorization) {
		const token = req.body.Authorization; // header에서 access token을 가져옵니다.
		const result = verify(token); // token을 검증합니다.
		console.log('체크');
		if (result.ok) {
			// token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.

			req.userId = result.id;
			next();
		} else {
			console.log(result.message);
			// 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
			res.send({
				success: false,
				message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
			});
		}
	}
};

const authGetJWT = (req, res, next) => {
	if (req.get('Authorization')) {
		console.log('바보');
		const token = req.get('Authorization'); // header에서 access token을 가져옵니다.
		const result = verify(token); // token을 검증합니다.
		if (result.ok) {
			// token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
			req.userId = result.id;
			next();
		} else {
			// 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
			res.send({
				success: false,
				message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
			});
		}
	}
};

module.exports = { authJWT, authGetJWT };
