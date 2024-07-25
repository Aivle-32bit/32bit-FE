import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {logoutUser} from '../features/auth/authSlice';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CSS
import './Navbar.css';

const Navbar = ({onCompanySearchClick}) => {
  const dispatch = useDispatch();
  const {isLoggedIn, user} = useSelector((state) => state.auth || {});
  const location = useLocation();
  const navigate = useNavigate();
  const [isReportDropdownVisible, setIsReportDropdownVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleLogout = () => {
    if (user) {
      dispatch(logoutUser());
    }
  };

  const isActive = (path) => path !== '/' && location.pathname.startsWith(path);

  const getNavbarClass = () => {
    if (location.pathname.startsWith('/admin') || location.pathname.startsWith(
        '/mypage')) {
      return 'navbar navbar-setting';
    } else if (location.pathname.startsWith('/report')) {
      return 'navbar navbar-report';
    } else {
      return 'navbar navbar-default';
    }
  };

  const handleProtectedNavigation = useCallback((path, isSearch = false) => {
    if (isSearch) {
      onCompanySearchClick();
    } else {
      navigate(path);
    }
  }, [isLoggedIn, navigate, onCompanySearchClick]);

  useEffect(() => {
    if (
        (user?.state === 'UNVERIFIED' || user?.state === 'USER_DORMANT') &&
        (location.pathname.startsWith('/analysis')
            || location.pathname.startsWith('/report'))
    ) {
      navigate('/certification');
    }
  }, [user, location, navigate]);

  return (
      <nav className={`${getNavbarClass()} ${isMenuVisible ? 'active' : ''}`}>
        <div className="hamburger"
             onClick={() => setIsMenuVisible(!isMenuVisible)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="navbar-left">
          <Link to="/" className={location.pathname === '/' ? 'active-home'
              : ''}>HOME</Link>
          <Link to="/about-us"
                className={isActive('/about-us') ? 'active' : ''}>ABOUT
            US</Link>
          <Link to="/notice"
                className={isActive('/notice') ? 'active' : ''}>NOTICE</Link>
          <>
            <span onClick={() => handleProtectedNavigation('/analysis')}
                  className={isActive('/analysis') ? 'active'
                      : ''}>ANALYSIS</span>
            <div
                className="dropdown"
                onMouseEnter={() => setIsReportDropdownVisible(true)}
                onMouseLeave={() => setIsReportDropdownVisible(false)}
            >
              <span className={`report-link ${isActive('/report') ? 'active'
                  : ''}`}>REPORT</span>
              {isReportDropdownVisible && (
                  <div className="dropdown-content">
                    <span onClick={() => handleProtectedNavigation(
                        '/report/my-report')}
                          className={isActive('/report/my-report') ? 'active'
                              : ''}>나의 레포트</span>
                    <span
                        className={isActive('/report/company-search') ? 'active'
                            : ''} onClick={() => handleProtectedNavigation(
                        '/report/company-search', true)}>
                  기업 검색
                </span>
                  </div>
              )}
            </div>
          </>
        </div>
        <div className="navbar-right">
          {!isLoggedIn ? (
              <>
                <Link to="/login" className={isActive('/login') ? 'active'
                    : ''}>LOGIN</Link>
                <Link to="/terms-and-conditions"
                      className={isActive('/terms-and-conditions') ? 'active'
                          : ''}>SIGN UP</Link>
              </>
          ) : (
              <>
                <span className="welcome-message">안녕하세요 {user?.name}님.</span>
                <Link to="/mypage/profile"
                      className={isActive('/mypage') ? 'active' : ''}>MY
                  PAGE</Link>
                {user?.isAdmin && <Link to="/admin/manage-user"
                                        className={isActive('/admin') ? 'active'
                                            : ''}>ADMIN</Link>}
                <Link to="/" onClick={handleLogout}
                      className="logout-link">LOGOUT</Link>
              </>
          )}
          <ToastContainer className="toast-container"/>
        </div>
      </nav>
  );
};

export default Navbar;