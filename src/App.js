import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Provider, useDispatch, useSelector } from 'react-redux'; // Redux Provider 및 hooks 추가
import store from './store'; // Redux store 추가
import { fetchUserInfo } from './actions/authActions'; // fetchUserInfo 액션 추가
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
import NoticeBoard from './NoticeBoard/NoticeBoard';

function AppContent() {
  // 페이지 전환 시 배경이미지, 내비게이션바 색상 전환
  const location = useLocation();
  const [backgroundClass, setBackgroundClass] = useState('main-background');
  const [navbarColor, setNavbarColor] = useState('main-navbar');
  const dispatch = useDispatch();
  const { isAdmin, state } = useSelector(state => state.auth);

  useEffect(() => {
    if (location.pathname.startsWith('/my-page') || location.pathname.startsWith('/admin')) {
      setBackgroundClass('mypage-background');
      setNavbarColor('mypage-navbar');
    } else if (location.pathname.startsWith('/login') || location.pathname.startsWith('/sign-up')) {
      setBackgroundClass('login-background ');  
    } else {
      setBackgroundClass('main-background');
      setNavbarColor('main-navbar');
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <div className={`App ${backgroundClass}`}>
      <Navbar user={{ isAdmin, state }} navbarColor={navbarColor} />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/notice' element={<NoticeBoard />} />
          <Route path='/analyze-system' element={<MyCompanyAnalyze />} />
          <Route path='/report' element={<Report />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-page/*' element={<MyPage user={{ isAdmin, state }} />} />
          <Route path='/admin/*' element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}> {/* Redux Provider 추가 */}
      <AppContent />
    </Provider>
  );
}

export default App;
