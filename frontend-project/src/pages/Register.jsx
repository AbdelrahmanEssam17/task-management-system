import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api';
import { validate } from '../schemas/registerSchema';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phone: '',
    gender: 'male',
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
      await registerUser(formData);
      navigate('/otp', { state: { email: formData.email } });
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        <h2 className='auth-title'>Create Account</h2>
        {serverError && <div className='alert alert-error'>{serverError}</div>}
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Username</label>
            <input
              type='text'
              name='userName'
              className='form-input'
              value={formData.userName}
              onChange={handleChange}
              placeholder='Enter username'
            />
            {errors.userName && <span className='form-error'>{errors.userName}</span>}
          </div>

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

          <div className='form-group'>
            <label>Phone</label>
            <input
              type='text'
              name='phone'
              className='form-input'
              value={formData.phone}
              onChange={handleChange}
              placeholder='01xxxxxxxxx'
            />
            {errors.phone && <span className='form-error'>{errors.phone}</span>}
          </div>

          <div className='form-group'>
            <label>Gender</label>
            <select
              name='gender'
              className='form-input'
              value={formData.gender}
              onChange={handleChange}
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            {errors.gender && <span className='form-error'>{errors.gender}</span>}
          </div>

          <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p className='auth-footer'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
}
