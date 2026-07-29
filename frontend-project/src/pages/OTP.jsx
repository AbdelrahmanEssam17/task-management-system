import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyEmail } from '../api';
import { validate } from '../schemas/otpSchema';

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess('');

    const result = validate({ otp });
    if (!result.valid) {
      setError(result.errors.otp || 'Invalid OTP');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await verifyEmail({ email, otp });
      setSuccess('Email verified! Redirecting...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <h2 className='auth-title'>Verify Email</h2>
        <p className='auth-subtitle'>Enter the 6-digit code sent to {email}</p>
        {success && <div className='alert alert-success'>{success}</div>}
        {serverError && <div className='alert alert-error'>{serverError}</div>}
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              maxLength='6'
              className='form-input otp-input'
              placeholder='000000'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {error && <span className='form-error'>{error}</span>}
          </div>
          <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
}
