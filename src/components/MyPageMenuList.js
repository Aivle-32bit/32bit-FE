import React from "react";
import { Link, useLocation } from "react-router-dom";
import './MyPageMenuList.css';

const MyPageMenuList = ({ user }) => {
    const location = useLocation();
    
    return (
        <nav className="menu-list">
            <ul>
                <li className={location.pathname.includes("profile") ? "active" : ""}>
                    <Link to="profile">PROFILE</Link>
                </li>
                <li className={location.pathname.includes("history") ? "active" : ""}>
                    <Link to="history">나의 조회 이력</Link>
                </li>
            </ul>
        </nav>
    );
}

export default MyPageMenuList;