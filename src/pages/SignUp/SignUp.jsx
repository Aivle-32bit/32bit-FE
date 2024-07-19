import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUp.css';
import { sendVerification, signUp, verifyCode } from '../../api';

const SignUp = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [certificationNumber, setCertificationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const EMAIL_REGEX = useMemo(() => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, []);
  const PASSWORD_REGEX = useMemo(() => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=\S+$).{8,20}$/, []);
  const NAME_REGEX = useMemo(() => /^[가-힣]{2,10}$/, []);

  const validate = useCallback((field, value) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!NAME_REGEX.test(value)) {
          newErrors.name = '이름은 한글 2-10자여야 합니다.';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        if (!EMAIL_REGEX.test(value)) {
          newErrors.email = '유효한 이메일 주소를 입력하세요.';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!PASSWORD_REGEX.test(value)) {
          newErrors.password = '비밀번호는 8-20자, 숫자, 대문자, 소문자, 특수문자를 포함해야 합니다.';
        } else {
          delete newErrors.password;
        }
        break;
      case 'checkPassword':
        if (value !== password) {
          newErrors.checkPassword = '비밀번호가 일치하지 않습니다.';
        } else {
          delete newErrors.checkPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return newErrors;
  }, [errors, password, EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX]);

  useEffect(() => {
    validate('name', name);
  }, [name, validate]);

  useEffect(() => {
    validate('email', email);
  }, [email, validate]);

  useEffect(() => {
    validate('password', password);
  }, [password, validate]);

  useEffect(() => {
    validate('checkPassword', checkPassword);
  }, [checkPassword, validate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      await handleSignUp();
    }
  };

  const handleSignUp = async () => {
    const userData = {
      name,
      address,
      email,
      password,
    };

    try {
      const response = await signUp(userData);
      console.log('Sign up successful:', response);
      setSuccessMessage('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      console.error('Sign up failed:', error);
      setErrors({ form: '회원가입에 실패했습니다. 다시 시도해 주세요.' });
    }
  };

  const handleSendVerification = async () => {
    try {
      const response = await sendVerification(email);
      console.log('Verification email sent:', response);
      setSuccessMessage('인증 이메일이 전송되었습니다!');
    } catch (error) {
      console.error('Verification email failed:', error);
      setErrors({ verification: '인증 이메일 전송에 실패했습니다.' });
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await verifyCode(email, certificationNumber);
      console.log('Verification code successful:', response);
      setSuccessMessage('인증 코드 검증에 성공했습니다!');
    } catch (error) {
      console.error('Verification code failed:', error);
      setErrors({ certificationNumber: '인증 코드 검증에 실패했습니다.' });
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
              {errors.name && <span className="error-message">{errors.name}</span>}
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
              {errors.email && <span className="error-message">{errors.email}</span>}
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
              {errors.certificationNumber && <span className="error-message">{errors.certificationNumber}</span>}
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
              {errors.password && <span className="error-message">{errors.password}</span>}
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
              {errors.checkPassword && <span className="error-message">{errors.checkPassword}</span>}
            </div>
            {errors.form && <span className="error-message">{errors.form}</span>}
            {successMessage && <span className="success-message">{successMessage}</span>}
            <button type="submit" className="signup-join-button">JOIN</button>
          </form>
        </div>
      </div>
  );
}

export default SignUp;