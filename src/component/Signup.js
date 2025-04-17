import React, { useState } from "react";
import { HiMail,HiUser, HiUserAdd, HiLockClosed, HiAcademicCap } from "react-icons/hi";
import "../css/signup.css"; // Include necessary CSS styles
import { useNavigate } from "react-router-dom";
import { authService, initiateOAuth2Login, signUpUser } from "./Services/apiService";
import "../css/validation/Validation.css";

const Signup = () => {
  const [formData, sertFormData]=useState({
    name:"",
    email:"",
    gender:"",
    contact:"",
    password:"",
    address: "",
    dob: "",
    interested: "",
    latestQualification: ""
  });
  const [error, setError]=useState("");
  const[loading, setLoading]=useState(false);
  const[verificationSent, setVerificationSent]=useState(false);
  const[formErrors, setFormError]=useState({});
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const{name,value}=e.target;
    sertFormData(prev=>({
      ...prev,
      [name]:value
    }));
  };

  const validateForm=()=>{
    const errors={};
    if (!formData.name)errors.name="Full name is required";
    if (!formData.email)errors.email="email is required";
    if(!formData.password)errors.password="Password is required";
    if(!formData.gender)errors.gender="Gender is required";
    if(!formData.contact)errors.contact="Contact number must be 10 digit";
    else if(!/^\d{10}$/.test(formData.contact)) errors.contact = "Contact number must be 10 digits"; 

    setFormError(errors);
    return Object.keys(errors).length===0; //no errors
;
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError("");

    //Validatuon form
    if(!validateForm()){
      setLoading(false);
      return; //stops form submission if validation fails
    }

    try{
      await signUpUser (formData);
      alert('Signed up! check your email for verification code');
      navigate('/verify-email');

    }catch(err){
      if(err.response){
        if(err.response.status===400){
          setError('Invalid input data. Please check form and try again');
        }
        else if(err.response.status===409){
        setError('Email already exists. Please use different email');
      }
      else{
        setError('Something went wrong. Please try again later');
      }

    }else{
      setError('Network error. Please check your connection and try again');
    }
    }finally{
      setLoading(false);
    }
   
  };
  const handleOAuth2Login=()=>{
    initiateOAuth2Login(); //initiates google login
  }
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
            name="name"
            id="name"
            value={formData.name}
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
            name="email"
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
            name="password"
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

        {/* Address */}
        <div className="floating-label">
          <input type="text"
           name="address"
           id="address"
           placeholder="enter your address"
           value={formData.address}
           onChange={handleChange} />

           <label htmlFor="address"> Address</label>
        </div>

        {/* Date of Birth */}
        <div className="floating-label">
          <input type="date"
           name="dob"
            id="dob"
            value={formData.dob}
            onChange={handleChange} />
            <label htmlFor="dob"> Date of Birth</label>
        </div>

        {/* Interested */}
        <div className="floating-label">
          <input type="text"
           name="interested"
            id="interested"
            placeholder="What are you interested in?"
            value={formData.interested}
            onChange={handleChange} />
            <label htmlFor="interested">Interested in (optional)</label>
        </div>
        
        
        <div className="floating-label">
          <input type="text"
           name="latestQualification"
            id="latestQualification"
            placeholder="Enter your latest qualification"
            value={formData.latestQualification}
            onChange={handleChange} />

            <label htmlFor="latestQualification">Latest Qualification(Optional)</label>
        </div>

        <button className="signup-btn" type="submit" disabled={loading}>
          {loading?'Signing Up..':'Sign Up'}
          {/* Signup */}
          
        </button>

        {/* Google Login */}
        <div className="auth-options">
        <button className="oauth-btn" onClick={handleOAuth2Login}> Sign up with Google</button>
        </div>

        

        <div className="auth-options">
            <a href="/Login">Already have an account? Login</a>
          </div>
      </form>
    </div>
  );
};

export default Signup;
