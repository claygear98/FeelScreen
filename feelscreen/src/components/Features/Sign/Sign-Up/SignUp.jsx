import React from "react";
// import { useState } from "react";
import { useForm } from 'react-hook-form';
import styled from "styled-components";

const Wrapper = styled.div`
		width:100%;
		box-sizing:border-box;
	`
	const Container = styled.div`
		width: 90%;
		margin: 0 auto;
	`
	const FeelLogo = styled.div`
		width: 100%;
		height: 50px;
		font-weight: 700;
		text-align: left;
		margin-top: 15px;
	`
	const SignUpForm = styled.div`
		width: 100%;
		border: 2px solid black;
		border-radius: 10px;
		padding: 40px 30px 30px;
		text-align: left;
		>h2{
			font-weight: 800;
			font-size: 20px;
		}
	`
function SignUp() {
	// const [username, setUsername] = useState('');
	// const [phone, setPhone] = useState('');
	// const [password, setPassword] = useState('');
	// const [passwordcheck, setPasswordCheck] = useState('');
	// const [code, setCode] = useState('');

	// // 입력 값 변경 핸들러
	// const handleUsername = (e) => {
	// 	  setUsername(e.target.value);
	// 	};

	// const handlePhone = (e) => {
	//   setPhone(e.target.value);
	// };

	// const handlePassword = (e) => {
	//   setPassword(e.target.value);
	// };

	// const handlePasswordCheck = (e) => {
	//   setPasswordCheck(e.target.value);
	// };

	// const codeCheck = (e) => {
	//   setCode(e.target.value);
	// };
	// // 회원가입 버튼 클릭 핸들러
	// const handleSignup = () => {
	//   // 여기에서 실제 회원가입 로직을 처리할 수 있습니다.
	//   // 예를 들면, 서버에 회원가입 요청을 보내는 등의 작업이 들어갈 수 있습니다.
	//   console.log('회원가입 정보:', { username, phone, password, code });
	// };

	// const FeelForm = styled.form`

	// `
	// const InputInfo = styled.div`

	// `
	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
	} = useForm();

	const onSubmit = (data) => {
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
						<div>
							<label>아이디(닉네임):</label>
							<input
								type="text"
								{...register('username', {
									required: '아이디를 입력해주세요.',
								})}
							/>
							{errors.username && <span>{errors.username.message}</span>}
						</div>
						<div>
							<label>전화번호:</label>
							<input
								type="text"
								{...register('phone', {
									required: '전화번호를 입력해주세요.',
								})}
							/>
							{errors.phone && <span>{errors.phone.message}</span>}
						</div>
						<div>
							<label>인증번호 입력:</label>
							<input
								type="text"
								{...register('code', {
									required: '인증번호를 입력해주세요.',
								})}
							/>
							{errors.code && <span>{errors.code.message}</span>}
						</div>
						<div>
							<label>비밀번호:</label>
							<input
								type="password"
								{...register('password', {
									required: '비밀번호를 입력해주세요.',
								})}
							/>
							{errors.password && <span>{errors.password.message}</span>}
						</div>
						<div>
							<label>비밀번호 확인:</label>
							<input
								type="password"
								{...register('passwordCheck', {
									required: '비밀번호를 한번더 입력해주세요.',
									validate: {
										check: (val) => {
											if (getValues('password') !== val) {
												return '비밀번호가 일치하지 않습니다.';
											}
										},
									},
								})}
							/>
						</div>
						{errors.passwordCheck && (
							<span>{errors.passwordCheck.message}</span>
						)}
						<button type="submit" onClick={SignUp.handleSignup}>
							회원가입
						</button>
					</form>
				</SignUpForm>
			</Container>
		</Wrapper>
	);
}

export default SignUp;
