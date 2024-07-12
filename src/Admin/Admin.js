import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import './Admin.css';
import AdminMenuList from './AdminMenuList';
import ManageUsers from './ManageUsers';
import ManageCompanies from './ManageCompanies';
import Statistics from './Statistics';
import SendMail from './SendMail';

const Admin = ({ user }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setInputPassword(e.target.value);
    };

    const handlePasswordSubmit = () => {
        if (inputPassword === user.password) {
            setIsAuthenticated(true);
            navigate('manage-users');
        } else {
            alert('틀린 비밀번호입니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="admin-container">
            {isAuthenticated ? (
                <>
                    <div className="admin-menu-list">
                        <AdminMenuList user={user} />
                    </div>
                    <div className="admin-content">
                        <Routes>
                            <Route path='manage-users' element={<ManageUsers user={user} />} />
                            <Route path='manage-companies' element={<ManageCompanies user={user} />} />
                            <Route path='statistics' element={<Statistics user={user} />} />
                            <Route path='send-mail' element={<SendMail user={user} />} />
                        </Routes>
                    </div>
                </>
            ) : (
                <div className="password-container">
                    <span className='text'>ADMIN PAGE를 이용하려면 비밀번호를 입력하세요.</span>
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

export default Admin;