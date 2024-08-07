import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {checkUserState, refreshUserToken} from './features/auth/authSlice';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// CSS
import './App.css';
// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
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
import TermsAndConditions from './pages/SignUp/TermsAndConditions';
import TermsModal from "./pages/SignUp/TermsModal";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import Call from "./pages/Call/Call";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 가시성 관리

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem('autoLogin') === 'true') {
      dispatch(refreshUserToken());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    let interval;
    if (isLoggedIn) {
      interval = setInterval(() => {
        dispatch(checkUserState());
      }, 60000); // 60000 ms = 1분
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [dispatch, isLoggedIn]);

  const handleCompanySelect = (company) => {
    console.log('Selected company:', company);
    setIsModalVisible(false);
    navigate(`/report/company/${company.id}`); // 선택된 회사 ID로 보고서 페이지로 이동
  };

  const handleCompanySearchClick = () => {
    if (isLoggedIn) {
      setIsModalVisible(true);
    } else {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  };

  // 푸터를 숨길 경로 목록
  const hiddenFooterPaths = ['/report', '/mypage', '/admin'];

  // 현재 경로가 푸터를 숨길 경로 목록에 포함되는지 확인
  const shouldHideFooter = hiddenFooterPaths.some(
      path => window.location.pathname.includes(path)
  );

  return (
      <div className="app">
        <Navbar onCompanySearchClick={handleCompanySearchClick}/>
        <ToastContainer/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/privacy/*" element={<Privacy/>}/>
            <Route path="/call/*" element={<Call/>}/>
            <Route path="/notice" element={<Notice/>}/>
            <Route path="/terms/*" element={<Terms/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path='/certification' element={<Certification/>}/>
            <Route path="/terms-and-conditions"
                   element={<TermsAndConditions/>}/>
            <Route path="/terms-full" element={<TermsModal/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path="/report/my-report" element={<Report/>}/>
              <Route path="/admin/*" element={<Admin/>}/>
              <Route path="/mypage/*" element={<MyPage/>}/>
              <Route path="/analysis/*" element={<Analysis/>}/>
              <Route path="/report/company/:companyId" element={<Report/>}/>
            </Route>
            <Route path="/report/company-search"
                   element={<CompanySearch onSelect={handleCompanySelect}/>}/>
          </Routes>
          <SearchModal
              isVisible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onSelect={handleCompanySelect}
          />
        </main>
        {!shouldHideFooter && <Footer/>}
      </div>
  );
}

export default App;