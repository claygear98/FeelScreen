const aligoapi = require('aligoapi');
// 해당 예제는 npm에서도 확인하실 수 있습니다

var AuthData = {
	key: '7zf2pvdjqux2e7qkuy1kvbolqk58jju6',
	user_id: 'hnk1203',
};
// 인증용 데이터는 모든 API 호출시 필수값입니다.

AuthData.testmode_yn = 'Y';
// test 모드를 사용하시려면 'Y'값으로 설정하세요

// form데이터를 포함한 request를 모두 보내시고 JSON data는 body pares를 사용하시기 바랍니다.
const send = (req, res, random, phone) => {
	// 메시지 발송하기
	req.body = {
		sender: '01051040742', // (최대 16bytes)
		receiver: phone, // 컴마()분기 입력으로 최대 1천명
		msg: '인증번호는 ' + random + '입니다', // (1~2,000Byte)
		msg_type: 'SMS',
		testmode_yn: 'Y',
	};
	// req.body 요청값 예시입니다.

	aligoapi
		.send(req, AuthData)
		.then((r) => {
			if (r.result_code === '1') {
				res.send({ success: true });
			} else {
				res.send({ success: false });
			}
		})
		.catch((e) => {});
};

module.exports = {
	send,
};
