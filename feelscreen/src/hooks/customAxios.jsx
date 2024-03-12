import axios from 'axios';
import { Cookies } from 'react-cookie';
import base64 from 'base-64';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();
let Auth = cookies.get('Authorization');

const tokenCheckAxios = axios.create({
	baseURL: 'http://localhost:3001',
});

const tokenChecker = () => {
	Auth = Auth.split('.');
	Auth = Auth[1];
	Auth = JSON.parse(base64.decode(Auth));
	Auth = Auth.exp + Date.now();

	console.log(Auth);
	console.log(Date.now());
	if (Auth > Date.now()) {
		return true;
	} else if (Auth <= Date.now()) {
		axios
			.get('http://localhost:3001/refresh', {
				headers: {
					Refresh: cookies.get('Refresh'),
				},
			})
			.then((res) => {
				cookies.set('Authorization', res.data.Authorization);
				return true;
			});
	}
};

// 요청 인터셉터 추가하기
tokenCheckAxios.interceptors.request.use(
	function (config) {
		// 요청이 전달되기 전에 작업 수행
		console.log('1');
		const TFcheck = tokenChecker();
		if (TFcheck === true) {
			console.log('2');
			console.log(config);
			return config;
		} else {
			console.log('안뇽');
			alert('로그인 유효기간 만료! 다시 로그인해주세요.');
		}
	}
	// function (error) {
	// 	// 요청 오류가 있는 작업 수행

	// 	return Promise.reject(error);
	// }
);

// 응답 인터셉터 추가하기
tokenCheckAxios.interceptors.response.use(
	function (response) {
		// 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
		// 응답 데이터가 있는 작업 수행을 바로뒤에서 하기 때문에 안씀
		console.log('인터셉터');
		return response;
	},
	function (error) {
		// 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
		// 응답 오류가 있는 작업 수행
		console.log('인터셉터 흠');
		alert('로그인 유효기간 만료! 다시 로그인해주세요.');

		return Promise.reject(error);
	}
);

export default tokenCheckAxios;
