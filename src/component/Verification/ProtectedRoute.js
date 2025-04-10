import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate , Outlet} from 'react-router-dom';

const ProtectedRoute=()=>{
    const {user, loading}=useAuth;
    if(loading){
        return <div>Loading..</div>;
    }
    return user ? <Outlet/>: <Navigate to="/Login" replace/>;
};
export default ProtectedRoute;