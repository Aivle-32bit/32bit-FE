import React, { useState } from 'react';
import './FindPassword.css';
import { findPassword } from '../../api';

function FindPassword({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    findPassword(email)
    .then((response) => {
      setToastMessage('비밀번호 재설정 링크가 이메일로 전송되었습니다.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    })
    .catch((error) => {
      setToastMessage('이메일 전송에 실패했습니다. 다시 시도해주세요.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
      <div className="find-password-container">
        <div className="find-password-content">
          <form className="find-password-form" onSubmit={handleSubmit}>
            <span className="find-password-msg">비밀번호 찾기</span>
            <span className="find-password-intro">비밀번호를 찾기 위해 회원가입 시 이메일을 입력해주세요.</span>
            <input
                type="email"
                className="email-input"
                placeholder="가입 시 사용한 이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="find-password-button">비밀번호 찾기</button>
            <button className="back-to-login-button" onClick={onBackToLogin}>로그인 화면으로 돌아가기</button>
          </form>
        </div>
        {showToast && <div className="toast">{toastMessage}</div>}
      </div>
  );
}

export default FindPassword;
