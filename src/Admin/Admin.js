import React from 'react';
import { Route, Routes } from "react-router-dom";
import './Admin.css';
import AdminMenuList from './AdminMenuList';
import ManageUsers from './ManageUsers';
import ManageCompanies from './ManageCompanies';
import Statistics from './Statistics';
import SendMail from './SendMail';

const Admin = ({ user }) => {
    return (
        <div className="admin-container">
            <div className="admin-menu-list">
                <AdminMenuList />
            </div>
            <div className="admin-content">
                <Routes>
                    <Route path='manage-users' element={<ManageUsers />} />
                    <Route path='manage-companies' element={<ManageCompanies />} />
                    <Route path='statistics' element={<Statistics />} />
                    <Route path='send-mail' element={<SendMail />} />
                </Routes>
            </div>
        </div>
    );
}

export default Admin;