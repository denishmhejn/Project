import axios from 'axios';

const API_URL='http://your-api-base-url'; // Replace with your actual API base URL
export const authService={
    signUpuser:(user)=>axios.post(`${API_URL}/users/signup`,user),
    verifyEmail:(email,code)=>
        axios.post(`${API_URL}/users/verify`,null,{params:{email,code}}),
    loginUser:(user)=>axios.post('${API_URL}/users/login',user),
    logoutUser:()=>axios.post(`${API_URL}/users/logout`),
    forgotPassword:(email)=>
        axios.post(`${API_URL}/users/forgot-password`,null,{params:{email}}),
    resetPassword:(email,code, newPassword)=>
        axios.post(`${API_URL}/users/reset-password`,null,{
            params:{email,code, newPassword}
        }),

    initiateOAuth2Login:()=>{
        const OAUTH2_AUTHORIZATION_URL='https://oauth2-provider.com/auth';
        const CLIENT_ID='your-client-id';  //replace//
        const REDIRECT_URI='https;//localhost:3000/callback';
        const SCOPE='openid email profile';
        const url = `${OAUTH2_AUTHORIZATION_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;
        window.location.href=url;
    }
};