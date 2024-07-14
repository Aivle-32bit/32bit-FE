import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Login from '../components/Login';
import Welcome from '../components/Welcome';
import EnterID from '../components/EnterID';
import EnterPW from '../components/EnterPW';
import AutoLogin from '../components/AutoLogin';
import SaveId from '../components/SaveId';
import { login } from '../actions/authActions'; // Redux action import

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await dispatch(login(username, password));
      if (result.type === 'LOGIN_SUCCESS') {
        navigate('/'); // 로그인 성공 시 리다이렉트
      } else {
        setError('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      setError('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  };
  
  return (
    <div>
      <div className="line"></div>
      <div className="login">
        <Login>
          <div className="input-wrapper">
            <Welcome />
            <EnterID value={username} onChange={(e) => setUsername(e.target.value)} />
            <EnterPW value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="login-button-wrapper">
              <button onClick={handleLogin}>로그인</button>
            </div>
            {error && <div style={{ color: 'red', position: 'absolute', top: '600px', left: '480px' }}>{error}</div>}
          </div>
          <div className="options-wrapper">
            <AutoLogin />
            <div className="divider"></div>
            <SaveId />
          </div>
        </Login>
      </div>
    </div>
  );
}

export default LoginPage;
