import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('authToken');

    console.log('Checking token:', token); // Debug log

    if (!token) {
        console.log('No token found, redirecting to login'); // Debug log
        return <Navigate to="/Login" replace />;
    }

    console.log('Token found, allowing access'); // Debug log
    return <Outlet />;
};

export default ProtectedRoute;