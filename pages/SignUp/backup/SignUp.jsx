import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUp.css';
import { signUp, sendVerification, verifyCode } from './api'; // verifyCode 함수도 import 합니다.

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
        <div className="sign-up">
            <div className="line"></div>
            <div className="login-container">
                <div className='login-container-sub'>
                    <h1>SIGN UP</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="new-form-group">
                            <label htmlFor="name">NAME</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="new-form-group">
                            <label htmlFor="address">ADDRESS</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="new-form-group">
                            <label htmlFor="email">EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="button" onClick={handleSendVerification}>Send Verification</button>
                        </div>
                        <div className="new-form-group">
                            <label htmlFor="certificationNumber">CERTIFICATION NUMBER</label>
                            <input
                                type="text"
                                id="certificationNumber"
                                value={certificationNumber}
                                onChange={(e) => setCertificationNumber(e.target.value)}
                            />
                            <button type="button" onClick={handleVerifyCode}>Verify Code</button>
                        </div>
                        <div className="new-form-group">
                            <label htmlFor="password">PWV</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="new-form-group">
                            <label htmlFor="checkPassword">CHECK PWV</label>
                            <input
                                type="password"
                                id="checkPassword"
                                value={checkPassword}
                                onChange={(e) => setCheckPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn-join">JOIN</button>
                    </form>
                </div>    
            </div>
        </div>
    );
}

export default SignUp;
