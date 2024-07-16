import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {loginUser} from '../../features/auth/authSlice';
// CSS
import './Login.css';

function Login() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('email'));
  const [autoLogin, setAutoLogin] = useState(
      localStorage.getItem('autoLogin') === 'true');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {status, error, isLoggedIn} = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password, rememberMe, autoLogin})).then(
        (action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            navigate('/');
          }
        });
  };

  useEffect(() => {
    if (status === 'failed' && error) {
      alert(error);
    }
  }, [status, error]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
      <div className="login-container">
        <div className="login-content">
          <form className="login-form" onSubmit={handleSubmit}>
            <span className="greeting-msg">WELCOME</span>
            <input
                id="email"
                type="email"
                className="email-input"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                id="password"
                type="password"
                className="password-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="form-checkbox-group">
              <div className="form-checkbox">
                <input
                    type="checkbox"
                    id="remember-id"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-id">아이디 저장</label>
              </div>
              <div className="form-checkbox">
                <input
                    type="checkbox"
                    id="auto-login"
                    checked={autoLogin}
                    onChange={(e) => setAutoLogin(e.target.checked)}
                />
                <label htmlFor="auto-login">자동 로그인</label>
              </div>
            </div>
            <button type="submit" className="login-button">LOGIN</button>
          </form>
        </div>
      </div>
  );
}

export default Login;