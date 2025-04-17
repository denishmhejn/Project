import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../Services/apiService';
import "../../css/validation/Validation.css";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const email = searchParams.get('email');
    const code = searchParams.get('code');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        try {
            await resetPassword(email, code, newPassword);
            setSuccess(true);
            setTimeout(() => {
                navigate('/Login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Password reset failed. Please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>

            {success ? (
                <div className="success-message">
                    Password reset successfully! Redirecting to login...
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="New password"
                        required
                    />
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default ResetPassword;