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
	if (Auth) {
		Auth = Auth.split('.');
		console.log(Auth);
	}
	Auth = Auth[1];
	Auth = JSON.parse(base64.decode(Auth));
	Auth = Auth.exp;
	console.log(Auth);
	console.log(Date.now() / 1000);
	if (Auth > parseInt(Date.now() / 1000)) {
		return true;
	} else if (Auth <= parseInt(Date.now() / 1000)) {
		console.log('s');
		axios
			.get('http://localhost:3001/refresh', {
				headers: {
					Authorization: cookies.get('Authorization'),
					Refresh: cookies.get('Refresh'),
				},
			})
			.then((res) => {
				console.log('박지훈');
				cookies.set('Authorization', res.data.Authorization);
				return true;
			})
			.catch((error) => {
				console.error(error);
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
			//config.headers.set({ Authorization: cookies.get('Authorization') });
			return config;
		} else {
			console.log('안뇽');
			alert('로그인 유효기간 만료! 다시 로그인해주세요.---------');
		}
		console.log('먼데');
	},
	function (error) {
		// 요청 오류가 있는 작업 수행

		return Promise.reject(error);
	}
);

// 응답 인터셉터 추가하기
tokenCheckAxios.interceptors.response.use(
	function (response) {
		// 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
		// 응답 데이터가 있는 작업 수행을 바로뒤에서 하기 때문에 안씀
		console.log(response);
		console.log('인터셉터');
		return response;
	},
	function (error) {
		console.log(error);
		// 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
		// 응답 오류가 있는 작업 수행
		console.log('인터셉터 흠');
		alert('로그인 유효기간 만료! 다시 로그인해주세요.!!!!!!!!!!!!');

		return Promise.reject(error);
	}
);

export default tokenCheckAxios;
