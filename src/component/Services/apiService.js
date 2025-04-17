import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Replace with your actual API base URL

// User Authentication
export const signUpUser = (user) => axios.post(`${API_URL}/users/signup`, user);
export const loginUser = (user) => axios.post(`${API_URL}/users/login`, user);
export const logoutUser = () => axios.post(`${API_URL}/users/logout`);

// Email Verification
export const verifyEmail = (email, code) =>
  axios.post(`${API_URL}/users/verify`, null, {
    params: { email, code },
  });

export const verifyEmailUpdate = (email, code) => {
  return axios.post(`${API_URL}/users/verify-email-update`, null, {
    params: {
      email,
      code,
    },
  });
};

// Password Reset
export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/users/forgot-password`, null, {
    params: {
      email,
    },
  });
};

export const resetPassword = (email, code, newPassword) => {
  return axios.post(`${API_URL}/users/reset-password`, null, {
    params: {
      email,
      code,
      newPassword,
    },
  });
};

// OAuth2 Login
const OAUTH2_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const CLIENT_ID = '1063528411117-5stba13evvll4kup3i9cg4r9vroputan.apps.googleusercontent.com'
const REDIRECT_URI = 'http://localhost:3000/oauth-callback';
const SCOPE = 'openid email profile';

export const initiateOAuth2Login = () => {
  const url = `${OAUTH2_AUTHORIZATION_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;
  window.location.href = url;
};