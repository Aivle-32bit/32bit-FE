import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
// css
import './App.css';
// Components
import Navbar from './components/Navbar';
// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import MyCompanyAnalyze from './pages/MyCompanyAnalyze';
import Report from './pages/Report';
import SignUp from './pages/SignUp';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import Admin from './Admin/Admin';

const AppContent = () => {
  const location = useLocation();
  const [backgroundClass, setBackgroundClass] = useState('main-background');
  const [navbarColor, setNavbarColor] = useState('main-navbar');

  useEffect(() => {
    if (location.pathname.startsWith('/my-page') || location.pathname.startsWith('/admin')) {
      setBackgroundClass('mypage-background');
      setNavbarColor('mypage-navbar');
    } else if (location.pathname.startsWith('/login') || location.pathname.startsWith('/sign-up')) {
      setBackgroundClass('login-background');
    } else {
      setBackgroundClass('main-background');
      setNavbarColor('main-navbar');
    }
  }, [location.pathname]);

  return (
    <div className={`App ${backgroundClass}`}>
      <Navbar navbarColor={navbarColor} />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/analyze-system' element={<MyCompanyAnalyze />} />
          <Route path='/report' element={<Report />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-page/*' element={<MyPage />} />
          <Route path='/admin/*' element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default AppContent;
