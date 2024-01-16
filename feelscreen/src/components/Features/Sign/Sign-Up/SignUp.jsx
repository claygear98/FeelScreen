import React from "react";
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
								{...register('username')}
								placeholder="아이디는 2~10자 여야 합니다."
								required
							/>
							{errors.username && <span>{errors.username.message}</span>}
						</div>
						<div>
							<label>전화번호:</label>
							<input
								type="text"
								{...register('phone')}
								placeholder="전화번호를 입력해 주세요."
								required
							/>
							{errors.phone && <span>{errors.phone.message}</span>}
						</div>
						<div>
							<label>인증번호 입력:</label>
							<input
								type="text"
								{...register('code')}
								placeholder="인증번호를 입력해 주세요."
								required
							/>
							{errors.code && <span>{errors.code.message}</span>}
						</div>
						<div>
							<label>비밀번호:</label>
							<input
								type="password"
								{...register('password')}
								placeholder="비밀번호를 입력해 주세요."
								required
								autoComplete="new-password"
							/>
							{errors.password && <span>{errors.password.message}</span>}
						</div>
						<div>
							<label>비밀번호 확인:</label>
							<input
								type="password"
								{...register('passwordCheck',{
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
						</div>
						{errors.passwordCheck && (
							<span>{errors.passwordCheck.message}</span>
						)}
						<button type="submit">
							회원가입
						</button>
					</form>
				</SignUpForm>
			</Container>
		</Wrapper>
	);
}

export default SignUp;
