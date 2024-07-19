import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice';
// CSS
import './Navbar.css';

const Navbar = ({ onCompanySearchClick }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [isReportDropdownVisible, setIsReportDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isActive = (path) => path !== '/' && location.pathname.startsWith(path);

  const getNavbarClass = () => {
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/mypage')) {
      return 'navbar navbar-setting';
    } else if (location.pathname.startsWith('/report')) {
      return 'navbar navbar-report';
    } else {
      return 'navbar navbar-default';
    }
  };

  useEffect(() => {
    if (user?.state === 'UNVERIFIED' && (location.pathname.startsWith('/analysis') || location.pathname.startsWith('/report'))) {
      navigate('/certification');
    }
  }, [user, location, navigate]);

  return (
      <nav className={getNavbarClass()}>
        <div className="navbar-left">
          <Link to="/" className={location.pathname === '/' ? 'active-home' : ''}>HOME</Link>
          <Link to="/about-us" className={isActive('/about-us') ? 'active' : ''}>ABOUT US</Link>
          <Link to="/notice" className={isActive('/notice') ? 'active' : ''}>NOTICE</Link>
          {isLoggedIn && (
              <>
                <Link to="/analysis" className={isActive('/analysis') ? 'active' : ''}>ANALYSIS</Link>
                <div
                    className="dropdown"
                    onMouseEnter={() => setIsReportDropdownVisible(true)}
                    onMouseLeave={() => setIsReportDropdownVisible(false)}
                >
                  <span className={`report-link ${isActive('/report') ? 'active' : ''}`}>REPORT</span>
                  {isReportDropdownVisible && (
                      <div className="dropdown-content">
                        <Link to="/report/my-report" className={isActive('/report/my-report') ? 'active' : ''}>나의 레포트</Link>
                        <span
                            className={isActive('/report/company-search') ? 'active' : ''}
                            onClick={onCompanySearchClick}
                        >
                    기업 검색
                  </span>
                      </div>
                  )}
                </div>
              </>
          )}
        </div>
        <div className="navbar-right">
          {!isLoggedIn ? (
              <>
                <Link to="/login" className={isActive('/login') ? 'active' : ''}>LOGIN</Link>
                <Link to="/terms-and-conditions" className={isActive('/terms-and-conditions') ? 'active' : ''}>SIGN UP</Link>
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