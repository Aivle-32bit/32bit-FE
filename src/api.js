import axios from 'axios';

const API_URL = 'https://api.aivle.site/api';

// Axios 인스턴스 생성 및 인터셉터 설정
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 400 && error.response.data.errorName === 'EXPIRED_TOKEN') {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });

        // 새로운 토큰 저장
        localStorage.setItem('refreshToken', data.refreshToken);

        // 원래 요청에 새 토큰 설정
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error during token refresh:', refreshError);
        // 필요시 로그아웃 로직 추가
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 회원가입
export const signUp = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/sign-up', userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

// 이메일 인증코드 전송
export const sendVerification = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/send-verification', { email });
    return response.data;
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};

// 이메일 인증코드 인증
export const verifyCode = async (email, code) => {
  try {
    const response = await axiosInstance.post('/auth/verify', { email, code });
    return response.data;
  } catch (error) {
    console.error('Error during code verification:', error);
    throw error;
  }
};

// 로그인
export const signIn = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/sign-in', { email, password });
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('refreshToken', refreshToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return response.data;
  } catch (error) {
    console.error('Error during email sign-in:', error);
    throw error;
  }
};

// 기업인증
export const companyRegistrations = async (company) => {
  try {
    const response = await axiosInstance.post('/company-registrations', { company });
    return response.data;
  } catch (error) {
    console.error('An error occurred during corporate authentication:', error);
    throw error;
  }
};

// 비밀번호 변경
export const changePassword = async (password) => {
  try {
    const response = await axiosInstance.post('/member/my/password', { password });
    return response.data;
  } catch (error) {
    console.error('There was a problem changing your password:', error);
    throw error;
  }
};

// 게시판
export const createBoard = async (board) => {
  try {
    const response = await axiosInstance.post('/board', { board });
    return response.data;
  } catch (error) {
    console.error('There was a problem changing your board:', error);
    throw error;
  }
};

// admin
export const getMembers = async () => {
  try {
    const response = await axiosInstance.get('/admin/members');
    return response.data;
  } catch (error) {
    console.error('There was a problem getting members:', error);
    throw error;
  }
};

export const deleteMember = async (memberId) => {
  try {
    const response = await axiosInstance.delete(`/admin/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem deleting the member:', error);
    throw error;
  }
};

export const createMember = async (memberData) => {
  try {
    const response = await axiosInstance.post('/admin/members', memberData);
    return response.data;
  } catch (error) {
    console.error('An error occurred during member creation:', error);
    throw error;
  }
};
