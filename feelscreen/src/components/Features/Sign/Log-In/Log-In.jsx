import React from 'react';
// import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SiKakaotalk } from 'react-icons/si';
import { Cookies } from 'react-cookie';

const LogInContainer = styled.div`
	width: 100%;
	margin: 0 auto;
	margin-top: 100px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const LogInPut = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	align-content: space-around;
	input {
		margin-top: 10px;
		width: 300px;
		height: 30px;
		border-radius: 7px;
		border: 2px solid black;
	}
`;

const ToLogIn = styled.div`
	margin-top: 20px;
	> button {
		width: 150px;
		height: 50px;
		border-radius: 7px;
		border: 2px solid black;
		font-size: 20px;
		font-weight: 700;
		background-color: #c3e2c2;
	}
`;
const ToSignUp = styled.div`
	display: flex;
	width: 150px;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	button {
		width: 90px;
		height: 50px;
		border-radius: 7px;
		border: 2px solid black;
		font-weight: 700;
		font-size: 15px;
		background-color: #c3e2c2;
	}
`;
const Error = styled.span`
	font-size: 11px;
	font-weight: 600;
	color: red;
`;

function LogIn() {
	// let Auth =
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuyEnOybkOykgCIsInBob25lIjoiMDEwODgzMTM5NTYiLCJwYXNzd29yZCI6IjEyMzQxMjM0ciIsImV4cCI6MzB9.3Mc4a-ECbIYPt-zyRZbxCwUuFfbbEhCoRm8IGYlX-zg';

	// Auth = JSON.parse(base64.decode(Auth.split('.')[1])).exp;
	// // let now = 100;
	// if (Auth - 20 > Date.now()) {
	// 	console.log('다음행동');
	// } else {
	// 	if (120 > 100) {
	// 		console.log('리프레쉬토큰 보내서 Access 토큰 재발행');
	// 	} else {
	// 		console.log('재로그인 실시!');
	// 	}
	// }
	// console.log(Auth);
	// console.log(Date.now());

	const cookies = new Cookies();
	const {
		register,
		formState: { errors },
		handleSubmit,
		// getValues,
	} = useForm({ mode: 'onChange' });

	const navigate = useNavigate();

	const navigateToSignUp = () => {
		navigate('/sign-up');
	};

	const navigateToMain = () => {
		navigate('/');
	};

	function onSubmit(data) {
		console.log(data);
		axios
			.post('http://localhost:3001/log-in', {
				phone: data.phone,
				password: data.password,
			})
			.then((response) => {
				console.log(response);
				if (response.data.success === true) {
					cookies.set('Authorization', response.data.Authorization);
					cookies.set('Refresh', response.data.Refresh);
					navigateToMain();
				} else {
					alert('로그인에 실패했습니다. 전화번호/비밀번호를 확인해주세요');
				}
			});
		// }).then(navigateToMain);
	}

	return (
		<LogInContainer>
			<h1>Feel Screen</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<LogInPut>
					<input
						type="text"
						placeholder="전화번호 전체를 입력해주세요. ('-' 제외)"
						{...register('phone', {
							validate: {
								check: (val) => {
									if (val.match(/\D+/)) {
										return "전화번호는 '-' 제외한 숫자만 입력해주세요.";
									}
									if (val.length < 11) {
										return '전화번호11자리를다입력해주세요.';
									}
									if (!(val.slice(0, 3) === '010')) {
										return '전화번호는010으로시작해야합니다.';
									}
								},
							},
						})}
						minLength={11}
						maxLength={11}
						required
					/>
					{errors.phone && <Error>{errors.phone.message}</Error>}
				</LogInPut>
				<LogInPut>
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
						maxLength={20}
					/>
					{errors.password && <Error>{errors.password.message}</Error>}
				</LogInPut>
				<ToLogIn>
					<button>로그인</button>
				</ToLogIn>
			</form>
			<ToSignUp>
				<SiKakaotalk
					style={{
						fontSize: '50px',
						backgroundColor: '#fffb00',
						color: '#3d3a44',
						borderRadius: '7px',
					}}
					onClick={() => {}}
				/>
				<button onClick={navigateToSignUp}>회원가입</button>
			</ToSignUp>
		</LogInContainer>
	);
}

export default LogIn;
