import React, { useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import './LoginPage.css'
import Login from '../components/Login';
import Welcome from '../components/Welcome';
import EnterID from '../components/EnterID';
import EnterPW from '../components/EnterPW';
import LoginButton from '../components/LoginButton';
import AutoLogin from '../components/AutoLogin';
import SaveId from '../components/SaveId';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });
      // 로그인 성공 처리 (예: 토큰 저장, 페이지 이동 등)
      console.log('로그인 성공:', response.data);
    } catch (error) {
      // 로그인 실패 처리
      setError('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
      <div>
          <div className="line"></div>
          <div className="login">
          <Routes>
            <Route path="/" element={
              <Login>
                <div className="input-wrapper">
                  <Welcome />
                  <EnterID value={username} onChange={(e) => setUsername(e.target.value)} />
                  <EnterPW value={password} onChange={(e) => setPassword(e.target.value)} />
                  <LoginButton onClick={handleLogin} />
                  {error && <div style={{ color: 'red', position: 'absolute', top: '600px', left: '480px' }}>{error}</div>}
                </div>
                <div className="options-wrapper">
                  <AutoLogin />
                  <div className= "divider"></div>
                  <SaveId />
                </div>
              </Login>
            } />
          </Routes>
          </div>
      </div>
  );

}

export default LoginPage;