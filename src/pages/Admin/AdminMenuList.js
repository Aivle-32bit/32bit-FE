import React from "react";
import { Link, useLocation } from "react-router-dom";
import './AdminMenuList.css';

const AdminMenuList = () => {
    const location = useLocation();

    return (
        <nav className="menu-list">
            <ul>
                <li className={location.pathname.includes("manage-user") ? "active" : ""}>
                    <Link to="manage-user">사용자 관리</Link>
                </li>
                <li className={location.pathname.includes("manage-company") ? "active" : ""}>
                    <Link to="manage-company">회사 관리</Link>
                </li>
                <li className={location.pathname.includes("admin-stats") ? "active" : ""}>
                    <Link to="admin-stats">통계</Link>
                </li>
            </ul>
        </nav>
    );
}

export default AdminMenuList;