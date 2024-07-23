import axios from 'axios';
import store from './app/store';
import {logoutUser} from './features/auth/authSlice.js';

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
          await refreshAccessToken(refreshToken); // 새로운 액세스 토큰을 쿠키로 받음

          // 원래의 요청 다시 시도
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          if (refreshError.response && refreshError.response.status === 400) {
            store.dispatch(logoutUser());
            alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
          }
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
);

// 로그인
export const signin = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/sign-in',
        {email, password});
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Error during email sign-in:', error);
    throw error;
  }
};

// 로그아웃
export const signout = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error;
  }
};

// 유저 정보 가져오기
export const get_member = async () => {
  try {
    const response = await axiosInstance.get('/member');
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching my page info:', error);
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

// 마이페이지 프로필 이미지 수정
export const member_profile_image = async (data) => {
  try {
    const response = await axiosInstance.put('/member/my/profile-picture',
        data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while updating the profile image:', error);
    throw error;
  }
}

// 마이페이지 프로필 이미지 삭제
export const member_profile_image_delete = async () => {
  try {
    const response = await axiosInstance.delete('/member/my/profile-picture');
    return response.data;
  } catch (error) {
    console.error('An error occurred while deleting the profile image:', error);
    throw error;
  }
}

// 마이페이지 회원 정보 수정
export const member_profile_update = async (data) => {
  try {
    const response = await axiosInstance.put('/member/my', data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while updating the member info:', error);
    throw error;
  }
}

// 마이페이지 비밀번호 변경
export const member_password_update = async (data) => {
  try {
    const response = await axiosInstance.post('/member/my/change-password',
        data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while updating the password:', error);
    throw error;
  }
}

// 마이페이지 회원 탈퇴
export const member_withdraw = async () => {
  try {
    const response = await axiosInstance.delete('/member/my');
    return response.data;
  } catch (error) {
    console.error('An error occurred while withdrawing the member:', error);
    throw error;
  }
}

// 기업 인증
export const companyregistrations = async (data) => {
  try {
    const response = await axiosInstance.post('/company-registrations',
        data);
    return response.data;
  } catch (error) {
    console.error('An error occurred while updating the company-registrations:',
        error);
    throw error;
  }
}

// 마이페이지 내 기업 인증 정보 조회
export const my_company_verification = async () => {
  try {
    const response = await axiosInstance.get('/company-registrations');
    return response.data;
  } catch (error) {
    console.error(
        'An error occurred while fetching the company verification info:',
        error);
    throw error;
  }
}

// 전체 사용자 조회
export const get_all_user = async (queryParams = '') => {
  try {
    const response = await axiosInstance.get(`/admin/members${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem getting members:', error);
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

// 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청하는 함수
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`,
        {refreshToken});
    return response.data;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// 사용자 휴면 처리
export const makeUserDormant = async (userId) => {
  try {
    const response = await axiosInstance.post(
        `/admin/members/${userId}/dormant`);
    return response.data;
  } catch (error) {
    console.error('Error making user dormant:', error);
    throw error;
  }
};

// 사용자 탈퇴 처리
export const withdrawUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/admin/members/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error withdrawing user:', error);
    throw error;
  }
};

// 사용자 승인 처리
export const approveUser = async (userId) => {
  try {
    const response = await axiosInstance.post(
        `/admin/members/${userId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving user:', error);
    throw error;
  }
};

// 사용자 거절 처리
export const rejectUser = async (userId, reason) => {
  try {
    const response = await axiosInstance.post(`/admin/members/${userId}/reject`,
        {reason});
    return response.data;
  } catch (error) {
    console.error('Error rejecting user:', error);
    throw error;
  }
};

// 유저의 신청 목록 최근 조회
export const getUserLatestRegistration = async (userId) => {
  try {
    const response = await axiosInstance.get(
        `/admin/members/${userId}/latest-registration`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user\'s latest registration:', error);
    throw error;
  }
};

// 사용자 미인증 상태로 설정
export const unverifyUser = async (userId) => {
  try {
    const response = await axiosInstance.post(
        `/admin/members/${userId}/unverified`);
    return response.data;
  } catch (error) {
    console.error('Error unverifying user:', error);
    throw error;
  }
};

// 회사 보고서 정보 조회
export const getCompanyReport = async (companyId) => {
  try {
    const response = await axiosInstance.get(`/company-report/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem getting the company report:', error);
    throw error;
  }
};

// 회사 특정 지표 조회
export const getCompanyMetric = async (companyId, metric) => {
  try {
    const response = await axiosInstance.get(
        `/company-report/${companyId}/${metric}`);
    return response.data;
  } catch (error) {
    console.error(`There was a problem getting the company metric ${metric}:`,
        error);
    throw error;
  }
};

// 회사 SWOT 분석 조회
export const getCompanySWOT = async (companyId) => {
  try {
    const response = await axiosInstance.get(
        `/company-report/${companyId}/swot`);
    return response.data;
  } catch (error) {
    console.error('There was a problem getting the company SWOT analysis:',
        error);
    throw error;
  }
};

// 회사 상세 정보 조회
export const getCompanyInfo = async (companyId) => {
  try {
    const response = await axiosInstance.get(
        `/company-report/${companyId}/info`);
    return response.data;
  } catch (error) {
    console.error('There was a problem getting the company info:', error);
    throw error;
  }
};

// 비밀번호 찾기
export const findPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/find-password', {email});
    return response.data;
  } catch (error) {
    console.error('Error during password finding:', error);
    throw error;
  }
};

// 아이디 찾기
export const findID = async (name, address) => {
  try {
    const response = await axiosInstance.get(`/auth/find-email`, {
      params: {name, address}
    });
    return response.data;
  } catch (error) {
    console.error('Error during ID finding:', error);
    throw error;
  }
};

// 공지사항 가져오기
export const fetchNotices = async () => {
  try {
    const response = await axiosInstance.get('/notice');
    return response.data;
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw error;
  }
};

// 공지사항 추가
export const addNotice = async (title, content) => {
  try {
    const response = await axiosInstance.post('/admin/notice',
        {title, content});
    return response.data;
  } catch (error) {
    console.error('Error adding notice:', error);
    throw error;
  }
};

// 공지사항 수정
export const updateNotice = async (noticeId, title, content) => {
  try {
    const response = await axiosInstance.put(`/admin/notice/${noticeId}`,
        {title, content});
    return response.data;
  } catch (error) {
    console.error('Error updating notice:', error);
    throw error;
  }
};

// 공지사항 삭제
export const deleteNotice = async (noticeId) => {
  try {
    const response = await axiosInstance.delete(`/admin/notice/${noticeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting notice:', error);
    throw error;
  }
};

//
export const fetchSuggestions = async (page, size) => {
  const response = await axiosInstance.get(`/board`, {
    params: {
      page: page - 1,
      size: size,
    },
  });
  return response.data;
};

// 건의사항 추가
export const createSuggestion = async (suggestion) => {
  const response = await axiosInstance.post('/board', suggestion);
  return response.data;
};

// 건의사항 답변 추가
export const createReply = async (boardId, reply) => {
  const response = await axiosInstance.post(`/board/${boardId}/reply`, reply);
  return response.data;
};

// 건의사항 수정
export const updateSuggestion = async (boardId, suggestion) => {
  const response = await axiosInstance.put(`/board/${boardId}`, suggestion);
  return response.data;
};

// 건의사항 삭제
export const deleteSuggestion = async (boardId) => {
  const response = await axiosInstance.delete(`/board/${boardId}`);
  return response.data;
};

// 건의사항 검색
export const searchSuggestions = async (title, page, size) => {
  const response = await axiosInstance.get('/board/search', {
    params: {
      title: title,
      page: page - 1,
      size: size,
    },
  });
  return response.data;
};

// 건의사항 상세 조회
export const fetchSuggestionById = async (boardId) => {
  const response = await axiosInstance.get(`/board/${boardId}`);
  return response.data;
};

// 나의 건의사항 조회
export const fetchMySuggestions = async (page, size) => {
  const response = await axiosInstance.get('/board/my_boards', {
    params: {
      page: page - 1,
      size: size,
    },
  });
  return response.data;
};

// 회사 검색 (자동완성)
export const searchCompanies = async (companyName) => {
  const response = await axiosInstance.get('/company-search/autocomplete', {
    params: {
      keyword: companyName,
    },
  });
  return response.data;
};

// 회사 생성
export const createCompany = async (company) => {
  const response = await axiosInstance.post('/admin/company', company,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
  );
  return response.data;
};

// 회사 삭제
export const deleteCompany = async (companyId) => {
  const response = await axiosInstance.delete(`/admin/company/${companyId}`);
  return response.data;
};

// 회사 보고서 생성
export const createCompanyReport = async (companyId, formData) => {
  const response = await axiosInstance.post(
      `/admin/company/${companyId}/create-reports`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
  );
  return response.data;
};
