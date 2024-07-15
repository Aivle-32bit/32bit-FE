import React from 'react';
import { Route, Routes } from 'react-router-dom';
// CSS
import './App.css';
// Components
import Navbar from './components/Navbar';
// Pages
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Notice from './pages/Notice/Notice';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import MyPage from './pages/MyPage/MyPage';
import Admin from './pages/Admin/Admin';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
