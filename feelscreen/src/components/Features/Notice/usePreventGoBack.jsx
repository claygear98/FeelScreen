import { createBrowserHistory } from 'history';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const usePreventGoBack = () => {
	const history = createBrowserHistory();
	const navigate = useNavigate();
	const preventGoBack = () => {
		// 2. custom hook에서 실행될 함수를 생성하고, 함수명을 preventGoBack으로 설정한다.
		history.push(null, '', history.location.href);
		// 2-1. 현재 상태를 세션 히스토리 스택에 추가(push)한다.
		axios.get('http://localhost:3001/imagedelete').then((res) => {
			console.log(123);
			console.log(12);
			console.log(1);
			navigate('/');
		});
		// 2-2. 토스트 메세지를 출력한다.
	};

	// 브라우저에 렌더링 시 한 번만 실행하는 코드
	useEffect(() => {
		(() => {
			history.push(null, '', history.location.href);
			// 3. 렌더링 완료 시 현재 상태를 세션 히스토리 스택에 추가(push)한다.
			window.addEventListener('popstate', preventGoBack);
			// 3-1. addEventListener를 이용해 "popstate"라는 이벤트를 감지하게 한다.
			// 3-2. popstate 이벤트를 감지했을 때 preventGoBack 함수가 실행된다.
		})();

		return () => {
			window.removeEventListener('popstate', preventGoBack);
			// 3-3. 렌더링이 끝난 이후엔 eventListner을 제거한다.
			navigate('/');
		};
		// eslint-disable-next-line
	}, []);
	// eslint-disable-next-line

	useEffect(() => {
		history.push(null, '', history.location.href);
		// 4-1. 현재 상태를 세션 히스토리 스택에 추가(push)한다.
	}, [history]);
	// 4. history.location (pathname)이 변경될때마다,
};

export default usePreventGoBack;
