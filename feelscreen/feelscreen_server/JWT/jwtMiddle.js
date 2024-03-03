const { verify } = require('./jwt-util');

function authJWT(req, res) {
	if (req.body.Authorization) {
		const token = req.body.Authorization; // header에서 access token을 가져옵니다.
		const result = verify(token); // token을 검증합니다.
		if (result.ok) {
			// token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.

			return result.id;
		} else {
			// 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
			res.send({
				success: false,
				message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
			});
		}
	}
}

function authGetJWT(req, res) {
	if (req.header.Authorization) {
		const token = req.body.Authorization; // header에서 access token을 가져옵니다.
		const result = verify(token); // token을 검증합니다.
		if (result.ok) {
			// token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.

			return result.id;
		} else {
			// 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
			res.send({
				success: false,
				message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
			});
		}
	}
}
module.exports = { authJWT, authGetJWT };
