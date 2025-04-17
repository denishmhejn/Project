import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyEmail, forgotPassword } from '../Services/apiService';
import "../../css/validation/Validation.css";

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Get email from location state or query params
    const email = location.state?.email || "";

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await verifyEmail(email, code);
            setSuccess(true);
            setTimeout(() => {
                navigate('/Login');
            }, 4000);
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Try again');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            await forgotPassword(email);
            alert('New verification code sent to your email');
        } catch (err) {
            setError('Failed to resend code. Try again');
        }
    };

    return (
        <div className="verification-container">
            <h2>Verify Your Email</h2>
            <p>We've sent a verification code to {email}</p>
            {success ? (
                <div className="success-message">
                    Email verified successfully! Redirecting to login...
                </div>
            ) : (
                <form onSubmit={handleVerify}>
                    <input 
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter verification code"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            )}
            <button onClick={handleResendCode} className="resend-button">
                Resend Verification Code
            </button>
        </div>
    );
};

export default VerifyEmail;