import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ user, navbarColor }) => {
    const [showSubmenu, setShowSubmenu] = useState(false);
    const submenuRef = useRef(null);

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

    const location = useLocation();
    const isActive = (path) => {
        if (path === '/') return '';  // HOME 경로는 제외
        return location.pathname.includes(path) ? 'active' : '';
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
                <li>
                    <Link to="/report" className={`menu-a ${isActive('/report')}`}><span>REPORT</span></Link>
                </li>
            </ul>
            <ul className="right-nav">
                {user.state === 1 || user.state === 2 ? (
                    <>
                        <li>
                            <Link to="/my-page" className={`menu-a ${isActive('my-page')}`}><span>MY PAGE</span></Link>
                        </li>
                        {user.state === 2 && (
                            <li>
                                <Link to="/admin" className={`menu-a ${isActive('admin')}`}><span>ADMIN</span></Link>
                            </li>
                        )}
                        <li className="divider"></li>
                        <span className="text">HI, {user.name}님.</span>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login" className={`menu-a ${isActive('login')}`}><span>LOGIN</span></Link>
                        </li>
                        <li>
                            <Link to="/sign-up" className={`menu-a ${isActive('sign-up')}`}><span>SIGN UP</span></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;