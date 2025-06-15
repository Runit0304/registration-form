import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    country: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!formData.gender) newErrors.gender = 'Please select a gender.';
    if (!formData.country) newErrors.country = 'Please select a country.';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
    } else {
      console.log('Form Submitted:', formData);
      setSubmittedName(formData.fullName);
      setSubmittedEmail(formData.email);
      setSubmitted(true);
      setErrors({});
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        country: '',
        terms: false,
      });
    }
  };

  return (
    <div className="wrapper">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <div className="input-group gender-group">
          <label>Gender</label>
          <div className="radio-group">
            <label><input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male</label>
            <label><input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female</label>
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="input-group">
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">--Select Country--</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div className="input-group terms">
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>
          {errors.terms && <p className="error">{errors.terms}</p>}
        </div>

        <div className="input-group">
          <button type="submit">Register</button>
        </div>
      </form>

      {submitted && (
        <div className="final-success">
          <p>✔ <strong>Hello, {submittedName}!</strong></p>
          <p>You have successfully registered with email: <strong>{submittedEmail}</strong></p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;