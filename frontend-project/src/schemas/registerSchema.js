export function validate(data = {}) {
  const errors = {};

  const userName = data.userName ? String(data.userName).trim() : '';
  if (!userName) {
    errors.userName = 'User name is required';
  } else if (userName.length < 3 || userName.length > 40) {
    errors.userName = 'User name must be between 3 and 40 characters';
  }

  const email = data.email ? String(data.email).trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Invalid email format';
  }

  const password = data.password ? String(data.password) : '';
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 8 || password.length > 16) {
    errors.password = 'Password must be between 8 and 16 characters';
  }

  if (data.phone) {
    const phoneStr = String(data.phone).trim();
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(phoneStr)) {
      errors.phone = 'Phone must be a valid Egyptian mobile number (e.g. 01012345678)';
    }
  }

  if (data.gender) {
    const genderStr = String(data.gender).trim();
    if (genderStr !== 'male' && genderStr !== 'female') {
      errors.gender = 'Gender must be either male or female';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export default validate;
