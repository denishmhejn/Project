import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/apiService';

const AuthContext=createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const token = localStorage.getItem('authToken');
          if (token) {
            // You might want to add an endpoint to validate token and get user data
            // const response = await authService.getUserProfile();
            // setUser(response.data);
          }
        } catch (err) {
          console.error('Auth check failed', err);
          localStorage.removeItem('authToken');
        } finally {
          setLoading(false);
        }
      };
  
      checkAuth();
    }, []);
    const login=async(Credentials)=>{
        try{
            const response=await authService.loginUser(Credentials);
            localStorage.setItem('authToken', response.data.token);
            setUser(response.data.user);
            navigate('/');
            return response;
        }catch(error){
            throw error;
        }
    };
    const logout=async()=>{
        try{
            await authService.logoutUser();
        }finally{
            localStorage.removeItem('authToken');
            setUser(null);
            navigate('/Login');
        }
    };
    const value={
        user,
        login,
        logout,
        loading
    };
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
export const useAuth=()=>{
    return useContext(AuthContext);
};