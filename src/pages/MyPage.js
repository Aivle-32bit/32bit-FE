import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './MyPage.css';
import MyPageMenuList from '../components/MyPageMenuList';
import Profile from './Profile';
import SuggestionBoard from '../SuggestionBoard/SuggestionBoard'
import History from './History';

const MyPage = ({ user }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setInputPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        if (inputPassword === user.password) {
            setIsAuthenticated(true);
            navigate('profile');
        } else {
            alert('틀린 비밀번호입니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="mypage-container">
            {isAuthenticated ? (
                <>
                    <div className="mypage-menu-list">
                        <MyPageMenuList user={user} />
                    </div>
                    <div className="mypage-content">
                        <Routes>
                            <Route path='profile' element={<Profile user={user} />} />
                            <Route path='suggestion-board' element={<SuggestionBoard user={user} />} />
                            <Route path='history' element={<History user={user} />} />
                        </Routes>
                    </div>
                </>
            ) : (
                <div className="password-container">
                    <span className='text'>MY PAGE를 이용하려면 비밀번호를 입력하세요.</span>
                    <input
                        type="password"
                        value={inputPassword}
                        onChange={handlePasswordChange}
                        className="password-input"
                    />
                    <button onClick={handlePasswordSubmit} className="password-button">확인</button>
                </div>
            )}
        </div>
    );
}

export default MyPage;