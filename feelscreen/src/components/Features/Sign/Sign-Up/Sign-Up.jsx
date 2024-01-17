import React from "react";
import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import axios from 'axios';

const Wrapper = styled.div`
		width:100%;
		box-sizing:border-box;
	`
	const Container = styled.div`
		width: 90%;
		margin: 0 auto;
	`
	const FeelLogo = styled.div`
		height: 50px;
		font-weight: 700;
		text-align: left;
		margin-top: 15px;
	`
	const SignUpForm = styled.div`
		border: 2px solid black;
		border-radius: 10px;
		padding: 40px 30px 30px;
		text-align: left;
		box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);

		> h2 {
			font-weight: 800;
			font-size: 20px;
		}
		> form > hr {
			border: 0;
			height: 2px;
			background-color: black;
			margin: 20px 0;
		}
	`; 
	const InputInfo = styled.div`
		width:100%;
		margin-top: 10px;
		>label {
			font-size:15px;
			font-weight:700;
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
		>input:hover, >div>input:hover {
			border-bottom: 2px solid blue;

		}

		>div {
			display: flex;
			justify-content:space-between;
			font-size:14px;
		}
		>div>p {
			margin-left: 10px;    
			margin-bottom: 0;
		}
		>div>.inputsub {
			margin: 10px 0 0 0;
			width: 70%;
			margin-bottom: 6px;
			border: none;
			border-bottom: 2px solid black;
			outline: none;
			box-shadow: none;
			transition: 0.3s all;
		}
	`
	const Submit = styled.div`
		text-align:center;
		padding-top: 30px;
		Button {
			width: 200px;
			height: 40px;
		}
	`

	const Error = styled.span`
		font-size:11px;
		font-weight: 600;
		color:red;
		
	`
	const Button = styled.button`
		width: 100px;
		border: 2px solid black;
		border-radius: 10px;
		background-color : #C3E2C2;
		font-weight: 700;
		font-size : 14px;
	`;
function SignUp() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	function onSubmit(data) {
		console.log(data);
	};


	return (
		<Wrapper>
			<Container>
				<FeelLogo>Feel Screen</FeelLogo>
				<SignUpForm>
					<h2>
						회원 가입을 위해 <br />
						정보를 입력해주세요.
					</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<InputInfo>
							<label>아이디(닉네임)</label>
							<br />
							<input
								type="text"
								{...register('username')}
								placeholder="아이디는 2~10자 여야 합니다."
								required
							/>
							{errors.username && <Error>{errors.username.message}</Error>}
						</InputInfo>
						<InputInfo className="subcheck">
							<label>전화번호</label>
							<br />
							<div>
								<input
									type="text"
									{...register('phone')}
									placeholder="전화번호를 입력해 주세요."
									required
									className="inputsub"
								/>
								<Button type="submit">인증하기</Button>
							</div>
							{errors.phone && <Error>{errors.phone.message}</Error>}
						</InputInfo>
						<InputInfo className="subcheck">
							<label>인증번호 입력</label>
							<br />
							<div>
								<input
									type="text"
									{...register('code')}
									placeholder="인증번호를 입력해 주세요."
									required
									className="inputsub"
								/>
								<Button type="submit">인증확인</Button>
							</div>
							{errors.code && <Error>{errors.code.message}</Error>}
						</InputInfo>
						<InputInfo>
							<label>비밀번호</label>
							<br />
							<input
								type="password"
								{...register('password')}
								placeholder="비밀번호를 입력해 주세요."
								required
								autoComplete="new-password"
							/>
							{errors.password && <Error>{errors.password.message}</Error>}
						</InputInfo>
						<InputInfo>
							<label>비밀번호 확인</label>
							<br />
							<input
								type="password"
								{...register('passwordCheck', {
									validate: {
										check: (val) => {
											if (getValues('password') !== val) {
												return '비밀번호가 일치하지 않습니다.';
											}
										},
									},
								})}
								placeholder="비밀번호를 한번더 입력해 주세요."
								required
								autoComplete="new-password"
							/>
						</InputInfo>
						{errors.passwordCheck && (
							<Error>{errors.passwordCheck.message}</Error>
						)}
						<InputInfo>
							<div>
								<input
									type="checkbox"
									{...register('checkbox', {
										validate: {
											check: (val) => {
												if (val === false) {
													return '체크박스 확인부탁드립니다.';
												}
											},
										},
									})}
								/>
								<p>
									이용약관 개인정보 수집 및 이용, 마케팅 활용 선택에 모두
									동의합니다. <Link to="http://www.naver.com">자세히 보기</Link>
								</p>
							</div>
							{errors.checkbox && <Error>{errors.checkbox.message}</Error>}
						</InputInfo>
						<hr></hr>
						<Submit>
							<Button type="submit">회원가입</Button>
						</Submit>
					</form>
				</SignUpForm>
			</Container>
		</Wrapper>
	);
}

export default SignUp;
