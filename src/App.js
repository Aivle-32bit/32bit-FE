import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { refreshUserToken } from './features/auth/authSlice';
// CSS
import './App.css';
// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SearchModal from './components/SearchModal';
// Pages
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Notice from './pages/Notice/Notice';
import Report from './pages/Report/Report';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Certification from './pages/Certification/Certification';
import MyPage from './pages/MyPage/MyPage';
import Admin from './pages/Admin/Admin';
import Analysis from './pages/compete/compete';
import CompanySearch from './components/CompanySearch';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem('autoLogin') === 'true') {
      dispatch(refreshUserToken());
    }
  }, [dispatch, isLoggedIn]);

  const handleCompanySelect = (company) => {
    console.log('Selected company:', company);
    setIsModalVisible(false);
    // Add your logic to handle the selected company
  };

  return (
      <>
        <Navbar onCompanySearchClick={() => setIsModalVisible(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/report/my-report" element={<Report />} />
          <Route path="/report/company-search" element={<CompanySearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/certificaion' element={<Certification />} />
          <Route element={<PrivateRoute />}>
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/Analysis/*" element={<Analysis />} />
          </Route>
        </Routes>
        <SearchModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSelect={handleCompanySelect}
        />
      </>
  );
}

export default App;