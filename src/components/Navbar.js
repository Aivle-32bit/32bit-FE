import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';
// CSS
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isActive = (path) => path !== '/' && location.pathname.startsWith(path);

  const getNavbarClass = () => {
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/mypage')) {
      return 'navbar navbar-setting';
    } else {
      return 'navbar navbar-default';
    }
  };

  return (
    <nav className={getNavbarClass()}>
      <div className="navbar-left">
        <Link to="/" className={location.pathname === '/' ? 'active-home' : ''}>HOME</Link>
        <Link to="/about-us" className={isActive('/about-us') ? 'active' : ''}>ABOUT US</Link>
        <Link to="/notice" className={isActive('/notice') ? 'active' : ''}>NOTICE</Link>
        {isLoggedIn && (
          <>
            <Link to="/analysis" className={isActive('/analysis') ? 'active' : ''}>ANALYSIS</Link>
            <Link to="/report" className={isActive('/report') ? 'active' : ''}>REPORT</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={isActive('/login') ? 'active' : ''}>LOGIN</Link>
            <Link to="/signup" className={isActive('/signup') ? 'active' : ''}>SIGN UP</Link>
          </>
        ) : (
          <>
            <span className="welcome-message">안녕하세요 {user.name}님.</span>
            <Link to="/mypage/profile" className={isActive('/mypage') ? 'active' : ''}>MY PAGE</Link>
            {user.isAdmin && <Link to="/admin/manage-user" className={isActive('/admin') ? 'active' : ''}>ADMIN</Link>}
            <Link to="/" onClick={handleLogout} className="logout-link">LOGOUT</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
