import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { refreshUserToken } from './features/auth/authSlice';
// CSS
import './App.css';
// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
// Pages
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Notice from './pages/Notice/Notice';
import Report from './pages/Report/Report';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import MyPage from './pages/MyPage/MyPage';
import Admin from './pages/Admin/Admin';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem('autoLogin') === 'true') {
      dispatch(refreshUserToken());
    }
  }, [dispatch, isLoggedIn]);

  return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/admin/*" element={<Admin />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;
