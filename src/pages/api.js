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
    const response = await axios.post(`${API_URL}/send-verification`, { email }); //send-verification는 아직 구현전 예시임
    return response.data;
  } catch (error) {
    console.error('Error during email verification:', error);
    throw error;
  }
};