import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './MyPage.css';
import MyPageMenuList from '../components/MyPageMenuList';
import Profile from './Profile';
import History from './History';

const MyPage = () => {
    const user = useSelector(state => state.auth); // Redux 스토어에서 유저 정보 가져오기

    return (
        <div className="mypage-container">
            <div className="mypage-menu-list">
                <MyPageMenuList user={user} />
            </div>
            <div className="mypage-content">
                <Routes>
                    <Route path='profile' element={<Profile user={user} />} />
                    <Route path='history' element={<History user={user} />} />
                    <Route path='*' element={<Navigate to='profile' />} /> {/* 기본 경로를 profile로 리디렉션 */}
                </Routes>
            </div>
        </div>
    );
}

export default MyPage;
