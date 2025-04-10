import React, { useState } from "react";
import { HiMail,HiUser, HiUserAdd, HiLockClosed, HiAcademicCap } from "react-icons/hi";
import "../css/signup.css"; // Include necessary CSS styles
import { useNavigate } from "react-router-dom";
import { authService } from "./Services/apiService";
import "../css/validation/Validation.css";

const Signup = () => {
  const [formData, sertFormData]=useState({
    username:"",
    email:"",
    gender:"",
    contact:"",
    password:"",
    confirmPassword:""
  });
  const [error, setError]=useState("");
  const[loading, setLoading]=useState(false);
  const[verificationSent, setVerificationSent]=useState(false);
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const{name,value}=e.target;
    sertFormData(prev=>({
      ...prev,
      [name]:value
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError("");

    //Validatuon password
    if(formData.password!==formData.confirmPassword){
      setError("passwords do not match");
      setLoading(false);
      return;
    }
    try{
      const userData={
        name:formData.username,
        email:formData.email,
        gender:formData.gender,
        contactNumber:formData.contact,
        password:formData.password
      };
      const response=await authService.signUpuser(userData);
      setVerificationSent(true);
      //you might want to redirect to verification page or show am message
      navigate('/verify-email',{state:{email:formData.email}});
    }catch(err){
      setError(err.response?.data?.message ||"signup failes. please try again");
    }finally{
      setLoading(false);
    }
  };
  return (
    <div className="session">
      <div className="left">
        <HiAcademicCap size={100} color="#fff" />
      </div>
      <form className="log-in" autoComplete="off" onSubmit={handleSubmit}>
        <h4>
          We are <span>ENTRANCE GATEWAY</span>
        </h4>
        <p>Welcome! Let's get you signed up.</p>

        {error && <div className="error-message">{error}
          </div>}
        {verificationSent &&(
          <div className="success-message">
            verification email sent! please check your inbox.
          </div>
        )}

        {/* User Name */}
        <div className="floating-label">
          <input
            placeholder="Full Name"
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="fullname">Full Name:</label>
          <div className="icon">
            <HiUser size={20} />
          </div>
        </div>

        {/* Email */}
        <div className="floating-label">
          <input
            placeholder="Email"
            type="text"
            name="Email"
            id="Email"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Enter a valid email address"
            autoComplete="off"
            required
          />
          <label htmlFor="Email">Email:</label>
          <div className="icon">
            <HiMail size={20} />
          </div>
        </div>

              {/* Gender */}
              <div className="custom-floating-label">
        <select name="gender" id="gender" 
          value={formData.gender}
          onChange={handleChange}
          required>
          <option value="" disabled selected>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="gender">Gender:</label>
      </div>


        {/* Contact Number */}
        <div className="floating-label">
          <input
            placeholder="Contact Number"
            type="text"
            name="contact"
            id="contact"
            value={formData.contact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a 10-digit contact number"
            autoComplete="off"
            required
          />
          <label htmlFor="contact">Contact Number:</label>
          <div className="icon">
            <HiUserAdd size={20} />
          </div>
        </div>

        {/* New Password */}
        <div className="floating-label">
          <input
            placeholder="New password"
            type="password"
            name="New password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="New password">New Password:</label>
          <div className="icon">
            <HiLockClosed size={20} />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="floating-label">
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <div className="icon">
            <HiLockClosed size={20} />
          </div>
        </div>

        <button className="signup-btn" type="submit" disabled={loading}>
          {loading?'Signing Up..':'Sign Up'}
          {/* Signup */}
          <div className="auth-options">
            <a href="/Login">Already have an account? Login</a>
          </div>
        </button>
      </form>
    </div>
  );
};

export default Signup;
