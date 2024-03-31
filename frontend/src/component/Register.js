import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token); // Store the token in local storage
        onRegister(token); // Invoke the callback with the token
      } else {
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('Error submitting form!', error);
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <form className="register-form border p-5 bg-light" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Register</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </div>
        <div className="text-center mt-3">
          Already have an account? <Link to="/login" className="link-primary">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
