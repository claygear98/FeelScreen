// 회원가입  // 상태 변수 선언
import React, { useState } from 'react';

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
}

export default SignUp;
