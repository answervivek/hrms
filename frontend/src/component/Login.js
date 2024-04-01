import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // State for storing error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error messages on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error messages
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token); // Store the token in local storage
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        onLogin(token); // Invoke the callback with the token
      } else {
        setErrorMessage('Login failed.'); // Set a generic error message
      }
    } catch (error) {
      console.error('Error submitting form!', error);
      setErrorMessage('Login failed. Please try again later.'); // Set error message for network errors
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <form className="login-form border p-5 bg-light" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>} {/* Display error messages */}
        <div className="mb-3">
          <input
            type="text"
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
            Login
          </button>
        </div>
        <div className="text-center mt-3">
          Don't have an account? <Link to="/register" className="link-primary">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
