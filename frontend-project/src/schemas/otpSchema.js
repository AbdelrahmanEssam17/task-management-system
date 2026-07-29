export function validate(data = {}) {
  const errors = {};

  const otp = data.otp !== undefined && data.otp !== null ? String(data.otp).trim() : '';
  if (!otp) {
    errors.otp = 'OTP is required';
  } else if (otp.length !== 6) {
    errors.otp = 'OTP must be exactly 6 characters';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export default validate;
