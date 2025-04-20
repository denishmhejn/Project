import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../Services/apiService';
import { HiMail, HiArrowLeft } from 'react-icons/hi';
import "../../css/ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await forgotPassword(email);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset instructions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-card">
                <button className="back-button" onClick={() => navigate('/Login')}>
                    <HiArrowLeft size={18} /> Back to Login
                </button>

                <div className="forgot-password-header">
                    <h2>Forgot Password?</h2>
                    <p>Enter your email to receive a reset link</p>
                </div>

                {success ? (
                    <div className="success-state">
                        <div className="success-icon">
                            <HiMail size={48} />
                        </div>
                        <h3>Check Your Email</h3>
                        <p>We've sent password reset instructions to <strong>{email}</strong></p>
                        <p className="hint">Didn't receive the email? Check your spam folder.</p>
                        <button 
                            className="action-button"
                            onClick={() => navigate('/Login')}
                        >
                            Return to Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <HiMail className="input-icon" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button 
                            type="submit" 
                            className="action-button primary"
                            disabled={loading || !email}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;