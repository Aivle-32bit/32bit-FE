import React, { useState } from 'react';
import { sendVerification, verifyCode } from '../../api'; // 경로는 상황에 맞게 조정
import './SignUp_.css'; // CSS 파일을 import 합니다.

const SignUp_ = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSendVerification = async () => {
    try {
      await sendVerification(email);
      setMessage('인증 코드가 발송되었습니다.');
    } catch (error) {
      setMessage('인증 코드 발송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode(email, code);
      if (response.success) {
        setMessage('인증에 성공했습니다.');
      } else {
        setMessage('인증 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      setMessage('인증에 실패했습니다.');
    }
  };

  return (
    <div>
      {/* Number Component */}
      <div className="group14"></div>
      <div className="group10"></div>
      <div className="group15"></div>
      <div className="rectangle2"></div>
      <div className="certificationNumber">Certification Number</div>
      <div className="certificationHint">인증번호를 입력하세요.</div>

      <h2>이메일 인증</h2>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendVerification}>인증 코드 발송</button>

      <input
        type="text"
        placeholder="인증 코드 입력"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerifyCode}>인증 코드 확인</button>

      <p>{message}</p>

      {/* Password Component */}
      <div className="group6">
        <div className="rectangle2Password"></div>
        <div className="lockIcon"></div>
        <div className="vector"></div>
        <div className="pw">P/W</div>
        <div className="passwordHint">8~20자 영문, 숫자, 특수문자로 구성된 비밀번호를 입력하세요</div>
      </div>
    </div>
  );
};

export default SignUp_;
