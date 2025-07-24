import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/userlogin', {
        email: inputs.email,
        password: inputs.password
      });

      if (res.data.success) {
        alert('Login successful!');
        localStorage.setItem('token', res.data.token);

        navigate('/');           // Navigate to home
        window.location.reload(); // Then reload to refresh Navbar state
      } else {
        alert(res.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Server error.');
    }
  };

  return (
    <div className="login">
      <form className="login-container" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="login-fields">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="login-register">
          Don't have an account? <Link to="/login"><span>Register here</span></Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
