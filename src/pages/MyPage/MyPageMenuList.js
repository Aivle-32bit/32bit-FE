import React from "react";
import { Link, useLocation } from "react-router-dom";
import './MyPageMenuList.css';

const MyPageMenuList = () => {
    const location = useLocation();

    return (
        <nav className="menu-list">
            <ul>
                <li className={location.pathname.includes("profile") ? "active" : ""}>
                    <Link to="profile">PROFILE</Link>
                </li>
                <li className={location.pathname.includes("suggestion") ? "active" : ""}>
                    <Link to="suggestion">건의사항</Link>
                </li>
            </ul>
        </nav>
    );
}

export default MyPageMenuList;