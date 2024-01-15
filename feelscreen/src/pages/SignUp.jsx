import SignUp from '../components/Features/Sign/Sign-Up/SignUp';

function LogIn() {


  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <label>
          아이디(닉네임):
          <input type="text" value={SignUp.username} onChange={SignUp.handleUsername} />
        </label>
        <br />
        <label>
          전화번호:
          <input type="text" value={SignUp.phone} onChange={SignUp.handlePhone} />
        </label>
        <br />
        <label>
          인증번호 입력:
          <input type="text" value={SignUp.code} onChange={SignUp.codeCheck} />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" value={SignUp.password} onChange={SignUp.handlePassword} />
        </label>
        <br />
        <label>
          비밀번호 확인:
          <input type="password" value={SignUp.passwordcheck} onChange={SignUp.handlePasswordCheck} />
        </label>
        <br />
       
        <button type="button" onClick={SignUp.handleSignup}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default LogIn;
