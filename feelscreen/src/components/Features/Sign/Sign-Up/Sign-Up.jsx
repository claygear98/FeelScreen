import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
	width: 90%;
	margin: 0 auto;
`;
const FeelLogo = styled.div`
	height: 50px;
	font-weight: 700;
	text-align: left;
	margin-top: 15px;
`;
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
const Error = styled.span`
	font-size: 11px;
	font-weight: 600;
	color: red;
`;
const InputInfo = styled.div`
	width: 100%;
	margin-top: 10px;
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
	> input:hover,
	> div > input:hover {
		border-bottom: 2px solid blue;
	}

	> div {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
	}
	> div > p {
		margin-left: 10px;
		margin-bottom: 0;
	}
	> div > .inputsub {
		margin: 10px 0 0 0;
		width: 70%;
		margin-bottom: 6px;
		border: none;
		border-bottom: 2px solid black;
		outline: none;
		box-shadow: none;
		transition: 0.3s all;
	}
`;
const Submit = styled.div`
	text-align: center;
	padding-top: 30px;
	Button {
		width: 200px;
		height: 40px;
	}
`;


const Button = styled.button`
	width: 100px;
	border: 2px solid black;
	border-radius: 10px;
	background-color: #c3e2c2;
	font-weight: 700;
	font-size: 14px;
`;
const SignForm = {
	username: '',
	phone: '',
	password: '',
	code: '',
};

function SignUp() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm({
		mode: 'onChange',
		defaultValues: SignForm,
	});

	const navigate = useNavigate();

	const navigateToLogIn = () => {
		navigate('/log-in');
	};
	function lastSubmit(data) {
		console.log(data);
		axios
			.post('http://localhost:3001/allow', {
				username: data.username,
				phone: data.phone,
				code: data.code,
				password: data.password,
			}).then(Response => {
				console.log(Response)
				if (Response.status === 201) {
					alert('회원가입이 완료되었습니다! 로그인화면으로 이동합니다.');
					navigateToLogIn();
				} else {
					alert('회원가입이 실패했습니다! 다시시도해주세요.');
				}
			})
	}

	const [res, setRes] = useState(0);
	const [codeOff, setCodeOff] = useState(true);

	const phoneSubmit = () => {
		// phone 정보만 사용하는 API 호출
		const phoneData = { phone: getValues('phone') };
		axios.post('http://localhost:3001/phone', phoneData).then((Response) => {
			console.log(Response.status);
			setRes(Response.status);
		});
	};

	const codeSubmit = () => {
		// code 정보만 사용하는 API 호출
		const codeData = { code: getValues('code') };
		axios.post('http://localhost:3001/code', codeData);
		console.log(getValues('code'));
		setCodeOff(!codeOff);
	};

	return (
	
			<Container>
				<FeelLogo>Feel Screen</FeelLogo>
				<SignUpForm>
					<h2>
						회원 가입을 위해 <br />
						정보를 입력해주세요.
					</h2>
					<form onSubmit={handleSubmit(lastSubmit)}>
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
						<InputInfo className="subcheck">
							<label>전화번호</label>
							<br />
							<div>
								<input
									type="text"
									{...register('phone', {
										validate: {
											check: (val) => {
												if (val.match(/\D+/)) {
													return "전화번호는 '-' 제외한 숫자만 입력해주세요.";
												}
												if (val.length < 11) {
													return '전화번호11자리를다입력해주세요.';
												}
												if (
													!(val[0] === '0' && val[1] === '1' && val[2] === '0')
												) {
													return '전화번호는010으로시작해야합니다.';
												}
											},
										},
									})}
									minLength={11}
									maxLength={11}
									placeholder="전화번호를 입력해 주세요."
									required
									className="inputsub"
								/>
								<Button
									type="button"
									onClick={phoneSubmit}
									className="phcode-btn"
									disabled={getValues('phone').length < 11 || !(getValues('phone')[0] === '0' &&getValues('phone')[1] === '1' && getValues('phone')[2] === '0') }
								>
									전송하기
								</Button>
							</div>
							{errors.phone && <Error>{errors.phone.message}</Error>}
						</InputInfo>
						<InputInfo className="subcheck">
							<label>인증번호 입력</label>
							<br />
							<div>
								<input
									type="text"
									{...register('code', {
										validate: {
											check: (val) => {
												if (val.match(/\D+/)) {
													return '인증번호는 숫자만 입력하십시오';
												}
												if (val.length < 5) {
													return '인증번호 5자리를 다 입력하십시오';
												}
											},
										},
									})}
									minLength={5}
									maxLength={5}
									placeholder="인증번호를 입력해 주세요."
									required
									className="inputsub"
								/>
								<Button
									type="button"
									onClick={codeSubmit}
									className="phcode-btn"
									disabled={
										getValues('code').length < 5 ||
										res !== 201 ||
										codeOff === false
									}
								>
									{codeOff ? '인증하기' : '인증완료'}
								</Button>
							</div>
							{errors.code && <Error>{errors.code.message}</Error>}
						</InputInfo>
						<InputInfo>
							<label>비밀번호</label>
							<br />
							<input
								type="password"
								{...register('password', {
									validate: {
										check: (val) => {
											if (val.match(/[\W_]/)) {
												return '특수문자는 입력이 안됩니다요';
											} else if (
												!val.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,20}$/)
											) {
												return '7~20자의 영문자와 숫자의 조합이어야 합니다.';
											}
										},
									},
								})}
								placeholder="비밀번호를 입력해 주세요."
								required
								autoComplete="new-password"
								maxLength={20}
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
								maxLength={20}
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

	);
}

export default SignUp;