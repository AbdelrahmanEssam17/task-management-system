import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { validate } from '../schemas/loginSchema';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const result = validate(formData);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const response = await loginUser(formData);
      login(response.data.data);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || '';
      if (message.toLowerCase().includes('not verified') || message.toLowerCase().includes('verify')) {
        navigate('/otp', { state: { email: formData.email } });
      } else {
        setServerError(message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <h2 className='auth-title'>Login</h2>
        {serverError && <div className='alert alert-error'>{serverError}</div>}
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              className='form-input'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email'
            />
            {errors.email && <span className='form-error'>{errors.email}</span>}
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              className='form-input'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter password'
            />
            {errors.password && <span className='form-error'>{errors.password}</span>}
          </div>

          <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='auth-footer'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
}
