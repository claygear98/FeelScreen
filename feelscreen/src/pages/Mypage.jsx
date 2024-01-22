import React from 'react';
import Nav from '../components/Features/Nav/Nav';
import Header from '../components/Features/Header/Header';
import UserMyPage from '../components/Features/MyPage/UserMyPage';

const Mypage = () => {
	return (
		<div>
			<Header />
			<UserMyPage />
			<Nav />
		</div>
	);
};

export default Mypage;
