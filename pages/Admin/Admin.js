import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
// CSS
import './Admin.css';
import AdminMenuList from './AdminMenuList';
// Pages
import ManageUser from './ManageUser';
import ManageCompany from './ManageCompany';
import AdminStats from './AdminStats';


function Admin() {
    return (
        <div className="admin-container">
            <div className="admin-menu-list">
                <AdminMenuList />
            </div>
            <div className="admin-content">
                <Routes>
                    <Route path='manage-user' element={<ManageUser />} />
                    <Route path='manage-company' element={<ManageCompany />} />
                    <Route path='admin-stats' element={<AdminStats />} />
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
