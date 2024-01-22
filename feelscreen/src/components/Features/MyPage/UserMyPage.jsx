import React from 'react';
import styled from 'styled-components';

const MypageContainer = styled.div`
	margin-top: 20px;
	width: 100%;
	text-align: center;
	align-items: center;
	display: flex;
	flex-direction: column;
`;
const Section = styled.div`
	display: flex;
	width: 80%;
	justify-content: space-between;
	button {
		font-size: 14.5px;
		width: 130px;
		height: 35px;
		border-radius: 10px;
		border: 1px solid black;
		margin-bottom: 15px;
		background-color: #d9d9d9;
	}
	.deleteUser {
		background-color: #ff5656;
		color: white;
	}
`;

const UserWriteList = styled.ul`
	list-style: none;
	text-align: left;
	width: 80%;
`;
const MyPage = () => {
	return (
		<MypageContainer>
			<Section>
				<button>닉네임 수정</button>
				<button>로그아웃</button>
			</Section>
			<Section>
				<button>내가 쓴 글</button>
				<button className="deleteUser">회원 탈퇴</button>
			</Section>
			<UserWriteList>
				<li>1번글</li>
				<li>2번글</li>
				<li>3번글</li>
			</UserWriteList>
		</MypageContainer>
	);
};

export default MyPage;
