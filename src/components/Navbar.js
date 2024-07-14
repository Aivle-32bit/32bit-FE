import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; // Redux useSelector 및 useDispatch 훅 추가
import { logout } from '../actions/authActions'; // 로그아웃 액션 추가
import './Navbar.css';

const Navbar = ({ navbarColor }) => {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const submenuRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const user = useSelector(state => state.auth); // Redux 스토어에서 유저 정보 가져오기

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        if (user.state === 'USER_DORMANT' && location.pathname !== '/login' && location.pathname !== '/sign-up') {
            navigate('/login');
        }
    }, [user.state, location.pathname, navigate]);

    const handleClickOutside = (event) => {
        if (submenuRef.current && !submenuRef.current.contains(event.target)) {
            setShowSubmenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSubmenu = () => {
        setShowSubmenu((prevState) => !prevState);
    };

    const isActive = (path) => {
        if (path === '/') return '';  // HOME 경로는 제외
        return location.pathname.includes(path) ? 'active' : '';
    };

    const renderUserLinks = () => {
        if (!user.state) {
            // 상태가 없는 경우 (로그인되지 않은 상태)
            return (
                <>
                    <li>
                        <Link to="/login" className={`menu-a ${isActive('login')}`}><span>LOGIN</span></Link>
                    </li>
                    <li>
                        <Link to="/sign-up" className={`menu-a ${isActive('sign-up')}`}><span>SIGN UP</span></Link>
                    </li>
                </>
            );
        } else {
            // 상태가 있는 경우 (로그인된 상태)
            return (
                <>
                    <li>
                        <Link to="/my-page" className={`menu-a ${isActive('my-page')}`}><span>MY PAGE</span></Link>
                    </li>
                    {user.isAdmin && (
                        <li>
                            <Link to="/admin" className={`menu-a ${isActive('admin')}`}><span>ADMIN</span></Link>
                        </li>
                    )}
                    <li className="divider"></li>
                    <span className="text">
                        HI, {user.memberName}님.
                        <button onClick={handleLogout} className="logout-button">⭑</button>
                    </span>
                </>
            );
        }
    };

    return (
        <nav className={`navbar ${navbarColor}`}>
            <ul className="left-nav">
                <li>
                    <Link to="/" className={`menu-a ${isActive('/')}`}><span>HOME</span></Link>
                </li>
                <li>
                    <Link to="/about-us" className={`menu-a ${isActive('/about-us')}`}><span>ABOUT US</span></Link>
                </li>
                {user.state && (
                    <li className={`analyze-system ${isActive('/analyze-system')}`} onClick={toggleSubmenu}>
                        <span className="text">ANALYZE SYSTEM</span>
                        {showSubmenu && (
                            <ul className="submenu" ref={submenuRef}>
                                <li>
                                    <Link to="/analyze-system/my-company" className="submenu-a">나의 기업 분석</Link>
                                </li>
                                <li>
                                    <Link to="/analyze-system/other-company" className="submenu-a">타 기업 분석</Link>
                                </li>
                                <li>
                                    <Link to="/analyze-system/comparison" className="submenu-a">기업 비교 분석</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                )}
                {user.state && (
                    <li>
                        <Link to="/report" className={`menu-a ${isActive('/report')}`}><span>REPORT</span></Link>
                    </li>
                )}
            </ul>
            <ul className="right-nav">
                {renderUserLinks()}
            </ul>
        </nav>
    );
};

export default Navbar;
