import React, { useState } from "react";
import { HiMail, HiLockClosed, HiAcademicCap } from "react-icons/hi";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { loginUser, initiateOAuth2Login } from "./Services/apiService";
import "../css/validation/Validation.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await loginUser(formData);
            console.log('Login response:', response); // Debug log
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                const storedToken = localStorage.getItem('authToken');
                console.log('Token stored in localStorage:', storedToken); // Debug log
                navigate('/');
            } else {
                throw new Error('No token found in API response');
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthLogin = () => {
        initiateOAuth2Login();
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
                <p>Welcome back!</p>

                {/* Email Input */}
                <div className="floating-label">
                    <input
                        placeholder="Email"
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <div className="icon">
                        <HiMail size={20} />
                    </div>
                </div>

                {/* Password Input */}
                <div className="floating-label">
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <div className="icon">
                        <HiLockClosed size={20} />
                    </div>
                </div>

                <button className="login-btn" type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log in'}
                </button>

                <div className="auth-options">
                    <button className="oauth-btn" type="button" onClick={handleOAuthLogin}>
                        Sign in with Google
                    </button>
                <a href="/forgot-password">Forgot password</a>
                <a href="/Signup">Don't have an account? Sign Up</a>
                </div>
            </form>
        </div>
    );
};

export default Login;