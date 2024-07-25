import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !alertShown) {
      alert('로그인이 필요한 서비스입니다.');
      setAlertShown(true);
    }
  }, [isLoggedIn, alertShown]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
