import React from "react";
import { Link, useLocation } from "react-router-dom";
import './AdminMenuList.css';

const AdminMenuList = ({ user }) => {
    const location = useLocation();
    
    return (
        <nav className="menu-list">
            <ul>
                <li className={location.pathname.includes("manage-users") ? "active" : ""}>
                    <Link to="manage-users">사용자 관리</Link>
                </li>
                <li className={location.pathname.includes("manage-companies") ? "active" : ""}>
                    <Link to="manage-companies">회사 관리</Link>
                </li>
                <li className={location.pathname.includes("statistics") ? "active" : ""}>
                    <Link to="statistics">통계</Link>
                </li>
                <li className={location.pathname.includes("send-mail") ? "active" : ""}>
                    <Link to="send-mail">메일 전송</Link>
                </li>
            </ul>
        </nav>
    );
}

export default AdminMenuList;