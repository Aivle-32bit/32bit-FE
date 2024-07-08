// src/api.js

import axios from 'axios';

const API_URL = 'https://api.aivle.site/api/auth';

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, userData);
    return response.data;
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

export const sendVerification = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/send-verification`, { email });
    return response.data;
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};

// 추가된 API 예시
export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/verify    `, { email });
    return response.data;
  } catch (error) {
    console.error('Error during password reset:', error);
    throw error;
  }
};