import axios from 'axios';
import { Cookies } from 'react-cookie';
import base64 from 'base-64';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

const tokenCheckAxios = axios.create({
	baseURL: 'http://localhost:3001',
});

const tokenChecker = async () => {
	let Auth = cookies.get('Authorization');
	if (!Auth) return false;

	Auth = Auth.split('.')[1];
	Auth = JSON.parse(base64.decode(Auth));
	const expirationTime = Auth.exp;

	if (expirationTime > parseInt(Date.now() / 1000)) {
		return true;
	} else {
		try {
			const response = await axios.get('http://localhost:3001/refresh', {
				headers: {
					Authorization: cookies.get('Authorization'),
					Refresh: cookies.get('Refresh'),
				},
			});

			cookies.set('Authorization', response.data.Authorization);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
};

tokenCheckAxios.interceptors.request.use(
	async function (config) {
		const isTokenValid = await tokenChecker();
		if (isTokenValid) {
			return config;
		} else {
			alert('로그인 유효기간 만료! 다시 로그인해주세요.');
			// 여기서 네비게이션을 사용하여 로그인 페이지로 이동하거나 다른 작업을 수행할 수 있음
			return Promise.reject(new Error('Token expired'));
		}
	},
	function (error) {
		return Promise.reject(error);
	}
);

tokenCheckAxios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.error(error);
		alert('서버와의 통신에 문제가 발생했습니다.');
		return Promise.reject(error);
	}
);

export default tokenCheckAxios;
