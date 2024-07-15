import React, { useState } from 'react';
import { sendVerification, verifyCode } from './api'; // 경로는 상황에 맞게 조정

const Number = () => {
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
      <div style={styles.group14}></div>
      <div style={styles.group10}></div>
      <div style={styles.group15}></div>
      <div style={styles.rectangle2}></div>
      <div style={styles.certificationNumber}>Certification Number</div>
      <div style={styles.certificationHint}>인증번호를 입력하세요.</div>

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
    </div>
  );
};

const styles = {
  group14: {
    position: 'absolute',
    width: '497px',
    height: '56px',
    left: '257px',
    top: '443px',
  },
  group10: {
    position: 'absolute',
    width: '497px',
    height: '56px',
    left: '257px',
    top: '443px',
  },
  group15: {
    position: 'absolute',
    width: '497px',
    height: '56px',
    left: '257px',
    top: '443px',
  },
  rectangle2: {
    boxSizing: 'border-box',
    position: 'absolute',
    width: '299px',
    height: '56px',
    left: '455px',
    top: '553px',
    background: 'rgba(255, 255, 255, 0.3)',
    boxShadow: 'inset 0px 4px 4px rgba(0, 0, 0, 0.15)',
    borderRadius: '50px 10px 10px 50px',
  },
  certificationNumber: {
    position: 'absolute',
    width: '185px',
    height: '17px',
    left: '257px',
    top: '570px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '17px',
    textAlign: 'center',
    color: '#000000',
  },
  certificationHint: {
    position: 'absolute',
    width: '197px',
    height: '13px',
    left: '473px',
    top: '578px',
    fontFamily: "'Julius Sans One', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '13px',
    textAlign: 'center',
    color: '#909090',
  },
};

export default Number;
