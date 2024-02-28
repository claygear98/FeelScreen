import React, { useEffect } from 'react';
import styled from 'styled-components';
import useHeaderInfo from './HeadStore';

const HeaderDiv = styled.div`
	display: flex;
	justify-content: space-between;
	height: 90px;
	padding: 10px;
`;
const Hello = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: center;
	justify-content: center;
	.hi {
		font-size: 17px;
		font-weight: 800;
	}
	.imfill {
		font-size: 11px;
		font-weight: 500;
		color: #555555;
	}
`;
const UserImage = styled.div`
	width: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	> img {
		width: 70px;
		height: 70px;
		border-radius: 100%;
	}
`;
const Header = () => {
	const { username, userImage, getInfo } = useHeaderInfo();
	useEffect(() => {
		getInfo();
	}, [getInfo]);
	return (
		<HeaderDiv>
			<Hello>
				<span className="hi">안녕하세요,</span>
				<span className="hi">{username}님!</span>
				<span className="imfill">하단 필스크린입니다.</span>
			</Hello>
			<UserImage>
				{/*  */}
				<img src={`/${userImage}`} alt="userImage" />
			</UserImage>
		</HeaderDiv>
	);
};

export default Header;
