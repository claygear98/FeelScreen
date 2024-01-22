import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// import { Cookies } from 'react-cookie';
import { useState } from 'react';

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

const ProfileModify = styled.form`
	width: 70%;
	margin-top: 10px;
	margin-bottom: 20px;
	border: 2px solid black;
	border-radius: 10px;
	padding: 20px 30px 10px 30px;
	text-align: right;
	box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
	button {
		margin-top: 20px;
		font-size: 14.5px;
		width: 130px;
		height: 35px;
		border-radius: 10px;
		border: 1px solid black;
		background-color: #d9d9d9;
	}
`;

const InputInfo = styled.div`
	width: 100%;
	text-align: left;
	> label {
		font-size: 15px;
		font-weight: 700;
	}
	> input {
		margin: 10px 0 0 0;
		width: 100%;
		font-size: 12px;
		border: none;
		border-bottom: 2px solid black;
		outline: none;
		box-shadow: none;
		transition: 0.3s all;
	}
	> input:hover {
		border-bottom: 2px solid blue;
	}
`;

const Error = styled.span`
	font-size: 11px;
	font-weight: 600;
	color: red;
`;

const MyPage = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		reset,
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			username: '',
		},
	});
	const [isProfileModifyVisible, setProfileModifyVisible] = useState(false);

	function onSubmit(data) {
		console.log(data);
		axios
			.post('http://localhost:3001/allow', {
				username: data.username,
			})
			.then((Response) => {
				console.log(Response);
				if (Response.status === 201) {
					alert('아이디(닉네임)이/가 변경되었습니다.');
					setProfileModifyVisible(false);
					reset();
				} else {
					alert('아이디(닉네임)변경에 실패했습니다 다시시도해주세요.');
				}
			});
	}

	function logOut() {
		// 홈화면으로 네비게이트
		// 토큰 삭제
		alert('로그아웃 되었습니다!');
	}

	function deleteUser() {
		//axios.delete 로 토큰 보내기
	}

	function myPost() {
		//내가 쓴글로 네비게이트
	}

	function modifyUsername() {
		setProfileModifyVisible(true);
	}
	return (
		<MypageContainer>
			<Section>
				<button onClick={modifyUsername}>닉네임 수정</button>
				<button onClick={logOut}>로그아웃</button>
			</Section>
			<Section>
				<button onClick={myPost}>내가 쓴 글</button>
				<button className="deleteUser" onClick={deleteUser}>
					회원 탈퇴
				</button>
			</Section>
			{isProfileModifyVisible && (
				<ProfileModify onSubmit={handleSubmit(onSubmit)}>
					<InputInfo>
						<label>아이디(닉네임)</label>
						<br />
						<input
							type="text"
							{...register('username', {
								validate: {
									check: () => {
										if (
											getValues('username').length > 10 ||
											getValues('username').length < 2
										) {
											return '아이디는 2~10자이내여야합니다.';
										}
									},
								},
							})}
							placeholder="아이디는 2~10자이내여야 합니다."
							required
							maxLength={10}
						/>
						{errors.username && <Error>{errors.username.message}</Error>}
					</InputInfo>
					<button type="submit">변경하기</button>
				</ProfileModify>
			)}
		</MypageContainer>
	);
};

export default MyPage;
