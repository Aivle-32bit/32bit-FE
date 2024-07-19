import React, {useState} from 'react';
import './FindID.css';
import {findID} from '../../api';

function FindID({onBackToLogin}) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    findID(name, address)
    .then((response) => {
      setToastMessage(`찾은 이메일: ${response}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    })
    .catch((error) => {
      setToastMessage('이메일 찾기에 실패했습니다. 다시 시도해주세요.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
      <div className="find-id-container">
        <div className="find-id-content">
          <form className="find-id-form" onSubmit={handleSubmit}>
            <span className="find-id-msg">아이디 찾기</span>
            <span className="find-id-intro">아이디를 찾기 위해 회원가입 시 사용한 이름과 주소를 입력해주세요.</span>
            <input
                type="text"
                className="name-input"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                className="address-input"
                placeholder="주소"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit" className="find-id-button">아이디 찾기</button>
            <button className="back-to-login-button" type="button" onClick={onBackToLogin}>로그인으로 돌아가기</button>
          </form>
        </div>
        {showToast && <div className="toast">{toastMessage}</div>}
      </div>
  );
}

export default FindID;
