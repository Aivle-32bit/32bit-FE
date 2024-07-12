import axios from 'axios';

const API_URL = 'https://api.aivle.site/api/auth';

// 회원가입

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

// 이메일 인증코드 전송

export const sendVerification = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send-verification`, { email });
    return response.data;
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};


// 이메일 인증코드 인증

export const verifyCode = async (email, code) => {
  try {
    const response = await axios.post(`${API_URL}/verify`, { email, code });
    return response.data;
  } catch (error) {
    console.error('Error during code verification:', error);
    throw error;
  }
};

// 로그인

export const signin = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, { email });
    return response.data;
  } catch (error) {
    console.error('Error during email sign-in:', error);
    throw error;
  }
};

// 기업인증

export const companyregistrations = async (company) => {
  try {
    const response = await axios.post(`${API_URL}/company-registrations`, { company });
    return response.data;
  } catch (error) {
    console.error('An error occurred during corporate authentication:', error);
    throw error;
  }
};

//비밀번호변경

export const password = async (password) => {
  try {
    const response = await axios.post(`${API_URL}/password`, { password });
    return response.data;
  } catch (error) {
    console.error('There was a problem changing your password:', error);
    throw error;
  }
};



// 게시판

export const board = async (board) => {
  try {
    const response = await axios.post(`${API_URL}/board`, { board });
    return response.data;
  } catch (error) {
    console.error('There was a problem changing your board:', error);
    throw error;
  }
};

// admin (확인필요)

export const members = async (members) => {
  try {
    const response = await axios.post(`${API_URL}/members`, { members });
    return response.data;
  } catch (error) {
    console.error('There was a problem changing your members:', error);
    throw error;
  }
};