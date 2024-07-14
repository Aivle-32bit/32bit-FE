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

    if (error.response.status === 400 && error.response.data.errorName === 'EXPIRED_TOKEN') {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken }, {
          withCredentials: true // 쿠키 전송을 위한 설정
        });

        // 새로운 토큰 저장
        localStorage.setItem('refreshToken', data.refreshToken);

        // 원래의 요청 다시 시도
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Error during token refresh:', refreshError);
        if (originalRequest.navigate) {
          originalRequest.navigate('/login');
        }
        return Promise.reject(refreshError);
      }
    } else if (error.response.status === 401) {
      if (originalRequest.navigate) {
        logout(originalRequest.navigate);
      }
    }

    return Promise.reject(error);
  }
);

// 로그아웃
export const logout = async (navigate) => {
  try {
    await axiosInstance.post('/auth/logout');
    localStorage.removeItem('refreshToken');
    navigate('/'); // 홈 페이지로 리디렉션
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

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
    const { refreshToken } = response.data;
    localStorage.setItem('refreshToken', refreshToken);
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

// 마이페이지 정보 가져오기
export const fetchMyPageInfo = async () => {
  try {
    const response = await axiosInstance.get('/member/my');
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching my page info:', error);
    throw error;
  }
};
