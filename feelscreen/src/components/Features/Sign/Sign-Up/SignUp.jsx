import SignUp from './SignUp.js';

function LogIn() {
  return (
		<div className="max-w-md mx-auto my-10">
			<h2 className="text-2xl font-bold mb-6">회원가입</h2>
			<form className="space-y-4">
				<div className="flex flex-col">
					<label className="mb-2">아이디(닉네임):</label>
					<input
						type="text"
						className="border border-gray-300 p-2 rounded-md"
						value={SignUp.username}
						onChange={SignUp.handleUsername}
					/>
				</div>
				<div className="flex flex-col">
					<label className="mb-2">전화번호:</label>
					<input
						type="text"
						className="border border-gray-300 p-2 rounded-md"
						value={SignUp.phone}
						onChange={SignUp.handlePhone}
					/>
				</div>
				<div className="flex flex-col">
					<label className="mb-2">인증번호 입력:</label>
					<input
						type="text"
						className="border border-gray-300 p-2 rounded-md"
						value={SignUp.code}
						onChange={SignUp.codeCheck}
					/>
				</div>
				<div className="flex flex-col">
					<label className="mb-2">비밀번호:</label>
					<input
						type="password"
						className="border border-gray-300 p-2 rounded-md"
						value={SignUp.password}
						onChange={SignUp.handlePassword}
					/>
				</div>
				<div className="flex flex-col">
					<label className="mb-2">비밀번호 확인:</label>
					<input
						type="password"
						className="border border-gray-300 p-2 rounded-md"
						value={SignUp.passwordcheck}
						onChange={SignUp.handlePasswordCheck}
					/>
				</div>
				<button
					type="button"
					className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
					onClick={SignUp.handleSignup}
				>
					회원가입
				</button>
			</form>
		</div>
	);
}

export default LogIn;
