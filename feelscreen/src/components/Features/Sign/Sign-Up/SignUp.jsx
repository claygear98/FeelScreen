import React from "react";
import { useState } from "react";
import styled from "styled-components";

function SignUp() {
		const [username, setUsername] = useState('');
		const [phone, setPhone] = useState('');
		const [password, setPassword] = useState('');
		const [passwordcheck, setPasswordCheck] = useState('');
		const [code, setCode] = useState('');
	  
		// 입력 값 변경 핸들러
		const handleUsername = (e) => {
		  setUsername(e.target.value);
		};
	  
		const handlePhone = (e) => {
		  setPhone(e.target.value);
		};
	   
		const handlePassword = (e) => {
		  setPassword(e.target.value);
		};
	  
		const handlePasswordCheck = (e) => {
		  setPasswordCheck(e.target.value);
		};
	  
		const codeCheck = (e) => {
		  setCode(e.target.value);
		};
		// 회원가입 버튼 클릭 핸들러
		const handleSignup = () => {
		  // 여기에서 실제 회원가입 로직을 처리할 수 있습니다.
		  // 예를 들면, 서버에 회원가입 요청을 보내는 등의 작업이 들어갈 수 있습니다.
		  console.log('회원가입 정보:', { username, phone, password, code });
		};

		const Wrapper = styled.div`
			width:100%;
			box-sizing:border-box;
		`
		const Container = styled.div`
			width: 90%;
			display:flex;
			margin: 0 auto;
		`
		
		const SignUpForm = styled.div`
			width: 100%;
			border: 2px solid black;
			border-radius: 10px;
		`
  return (
		<Wrapper>
			<Container>
				<SignUpForm>
					<h2>회원 가입을 위해 정보를 입력해주세요.</h2>
					<form>
						<div>
							<label>아이디(닉네임):</label>
							<input
								type="text"
								value={SignUp.username}
								onChange={SignUp.handleUsername}
							/>
						</div>
						<div>
							<labe>전화번호:</labe>
							<input
								type="text"
								value={SignUp.phone}
								onChange={SignUp.handlePhone}
							/>
						</div>
						<div>
							<label>인증번호 입력:</label>
							<input
								type="text"
								value={SignUp.code}
								onChange={SignUp.codeCheck}
							/>
						</div>
						<div>
							<label>비밀번호:</label>
							<input
								type="password"
								value={SignUp.password}
								onChange={SignUp.handlePassword}
							/>
						</div>
						<div>
							<label>비밀번호 확인:</label>
							<input
								type="password"
								value={SignUp.passwordcheck}
								onChange={SignUp.handlePasswordCheck}
							/>
						</div>
						<button type="button" onClick={SignUp.handleSignup}>
							회원가입
						</button>
					</form>
				</SignUpForm>
			</Container>
		</Wrapper>
	);
  }

export default SignUp;
