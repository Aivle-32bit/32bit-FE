import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUp.css';
import { signUp, sendVerification, verifyCode } from '../../api'; // verifyCode 함수도 import 합니다.

const SignUp = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSignUp();
    };

    const handleSignUp = async () => {
        if (password !== checkPassword) {
          alert('Passwords do not match!');
          return;
        }

        const userData = {
          name,
          address,
          email,
          password,
        };

        try {
          const response = await signUp(userData);
          console.log('Sign up successful:', response);
          alert('회원가입이 완료되었습니다!');
          navigate('/login')
        } catch (error) {
          console.error('Sign up failed:', error);
          // 에러 처리 로직을 여기에 작성하세요.
        }
    };

    const handleSendVerification = async () => {
        try {
          const response = await sendVerification(email);
          console.log('Verification email sent:', response);
          alert('인증 이메일이 전송되었습니다!');
        } catch (error) {
          console.error('Verification email failed:', error);
          alert('인증 이메일 전송에 실패했습니다.');
        }
    };

    const handleVerifyCode = async () => {
        try {
          const response = await verifyCode(email, certificationNumber);
          console.log('Verification code successful:', response);
          alert('인증 코드 검증에 성공했습니다!');
        } catch (error) {
          console.error('Verification code failed:', error);
          alert('인증 코드 검증에 실패했습니다.');
        }
    };

    return (
        <div className="sign-up-container">
            <div className='sign-up-content'>
                <form onSubmit={handleSubmit} className="sign-up-form">
                    <span className='sign-up-title'>회원가입</span>
                    <span className="sign-up-intro">회원이 되어 AI 재무 어드바이저의 재무 분석을 경험해보세요.</span>
                    <div className="new-form-group">
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="이름"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="new-form-group">
                        <label htmlFor="address">주소</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            placeholder="주소"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="new-form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="이메일"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="verify-number-button" type="button" onClick={handleSendVerification}>인증번호 전송</button>
                    </div>
                    <div className="new-form-group">
                        <label htmlFor="certificationNumber">인증번호 확인</label>
                        <input
                            type="text"
                            id="certificationNumber"
                            value={certificationNumber}
                            placeholder="인증번호"
                            onChange={(e) => setCertificationNumber(e.target.value)}
                        />
                        <button className="verify-number-button" type="button" onClick={handleVerifyCode}>인증번호 확인</button>
                    </div>
                    <div className="new-form-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="비밀번호"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="new-form-group">
                        <label htmlFor="checkPassword">비밀번호 확인</label>
                        <input
                            type="password"
                            id="checkPassword"
                            value={checkPassword}
                            placeholder="비밀번호 재입력"
                            onChange={(e) => setCheckPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="signup-join-button">JOIN</button>
                </form>
            </div>    
        </div>
    );
}

export default SignUp;
