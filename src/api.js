// ../../api/index.js

import axios from 'axios';

const API_URL = 'https://api.aivle.site/api';

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 쿠키를 전송하도록 설정
});

axiosInstance.interceptors.request.use(config => {
  config.withCredentials = true; // 모든 요청에 쿠키 전송 설정
  return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response.status === 400 && error.response.data.errorName
          === 'EXPIRED_TOKEN') {
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const {data} = await axios.post(`${API_URL}/auth/refresh`,
              {refreshToken}, {
                withCredentials: true // 쿠키 전송을 위한 설정
              });

          // 새로운 토큰 저장
          localStorage.setItem('refreshToken', data.refreshToken);

          // 원래의 요청 다시 시도
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
);

// 로그인
export const signin = async (email, password) => {
  try {
    const response = await axiosInstance.post(
        '/auth/sign-in',
        {email, password}
    );
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Error during email sign-in:', error);
    throw error;
  }
};

// 마이페이지 프로필 정보 가져오기
export const member_profile = async () => {
  try {
    const response = await axiosInstance.get('/member/my');
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching my page info:', error);
    throw error;
  }
};

// 전체 사용자 조회
export const get_all_user = async () => {
  try {
    const response = await axiosInstance.get('/admin/members');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting members:', error);
    throw error;
  }
};

// 미인증 사용자 조회
export const get_unverified_user = async () => {
  try {
    const response = await axiosInstance.get('/admin/members?state=UNVERIFIED');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting unverified members:', error);
    throw error;
  }
};

// 회사 조회
export const get_all_company = async () => {
  try {
    const response = await axiosInstance.get('/admin/company');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting companies:', error);
    throw error;
  }
};

// 통계 조회 : 사용자 상태
export const stats_state = async () => {
  try {
    const response = await axiosInstance.get('/admin/statistics/member-states');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting statistics:', error);
    throw error;
  }
};

// 통계 조회 : 회원가입
export const stats_signup = async () => {
  try {
    const response = await axiosInstance.get(
        '/admin/statistics/registration-statistics');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting statistics:', error);
    throw error;
  }
};

// 통계 조회 : 로그인
export const stats_login = async () => {
  try {
    const response = await axiosInstance.get(
        '/admin/statistics/login-statistics');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting statistics:', error);
    throw error;
  }
};

// 통계 조회 : 방문자
export const stats_visit = async () => {
  try {
    const response = await axiosInstance.get(
        '/admin/statistics/visitor-statistics');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting statistics:', error);
    throw error;
  }
};

// 이메일 인증 코드 전송
export const sendVerification = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/send-verification',
        {email});
    return response.data;
  } catch (error) {
    console.error('There was a problem sending the verification code:', error);
    throw error;
  }
};

// 인증 코드 확인
export const verifyCode = async (email, code) => {
  try {
    const response = await axiosInstance.post('/auth/verify', {email, code});
    return response.data;
  } catch (error) {
    console.error('There was a problem verifying the code:', error);
    throw error;
  }
};

// 회원 가입
export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/sign-up', userData);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};
