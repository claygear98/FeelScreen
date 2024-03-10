const { sign, verify, refreshVerify } = require('./jwt-util.js');
const jwt = require('jsonwebtoken');

function refresh(req, res) {
	// access token과 refresh token의 존재 유무를 체크
	if (req.body.Authorization) {
		const authToken = req.body.Authorization;

		// access token 검증 -> expired여야 함.
		const authResult = verify(authToken);

		// access token 디코딩하여 user의 정보 가져옴
		const decoded = jwt.decode(authToken);
		console.log('토쿠ㅡㄴ' + decoded.id, redisCli.get(decoded.id));

		// 디코딩 결과가 없으면 권한이 없음을 응답.
		if (decoded === null) {
			res.status(401).send({
				ok: false,
				message: '유효하지 않은 토큰(토큰 존재 X)',
			});
		}

		/* access token의 decoding 된 값에서
      유저의 id를 가져와 refresh token을 검증. */
		const refreshResult = refreshVerify(refreshToken, decoded.id);

		// 재발급을 위해서 access token이 만료
		if (authResult.ok === false && authResult.message === 'jwt expired') {
			// 1. access token이 만료되고, refresh token도 만료 된 경우 => 새로 로그인
			if (refreshResult.ok === false) {
				res.status(401).send({
					ok: false,
					message: '액세스, 리프레시 토큰 만료 - 새 로그인 필요',
				});
			} else {
				// 2. access token이 만료되고, refresh token은 만료되지 않은 경우 => 새로운 access token을 발급
				const newAccessToken = sign(user);

				res.status(200).send({
					ok: true,
					data: {
						Authorization: newAccessToken,
						Refresh: refreshToken,
					},
				});
			}
		} else {
			// 3. access token이 만료되지 않은경우 => refresh 할 필요가 없습니다.
			res.status(400).send({
				ok: false,
				message: 'Access token is not expired!',
			});
		}
	} else {
		// access token 또는 refresh token이 헤더에 없는 경우
		res.status(400).send({
			ok: false,
			message:
				'유효하지 않은 토큰 - (토큰 존재 X)Access token and refresh token are need for refresh!',
		});
	}
}

module.exports = { refresh };
