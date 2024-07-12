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

function App() {

  // 페이지 전환 시 배경이미지, 내비게이션바 색상 전환
  const location = useLocation();
  const [backgroundClass, setBackgroundClass] = useState('main-background');
  const [navbarColor, setNavbarColor] = useState('main-navbar');
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

  // 서버에서 user 정보 받아오기 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const myUser = users.length > 0 ? users[2] : null; // 임시로 첫번째 유저를 myUser로 설정
  
  return (
    <div className={ `App ${backgroundClass}` }>
      <Navbar user={ myUser } navbarColor={navbarColor} />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/analyze-system' element={<MyCompanyAnalyze />} />
          <Route path='/report' element={<Report />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-page/*' element={<MyPage user={ myUser } />} />
          <Route path='/admin/*' element={<Admin user={ myUser } />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

