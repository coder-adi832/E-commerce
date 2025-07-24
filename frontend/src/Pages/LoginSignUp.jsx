import React, { useState } from 'react';
import axios from 'axios';
import './CSS/LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    agree: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputs.agree) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/signup', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      });

      if (res.data.success) {
        alert('Sign-up successful!');
        localStorage.setItem('token', res.data.token);
        navigate('/');           // Navigate to home
        window.location.reload(); // Reload to update Navbar
      } else {
        alert(res.data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Server error.');
    }
  };

  return (
    <div className="loginsignup">
      <form className="loginsignup-content" onSubmit={handleSubmit}>
        <h1>Sign-up</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
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
        <button type="submit">Continue</button>
        <p className="loginsignup-login">
          Already have an account? <Link to='/userlogin'><span>Login here</span></Link>
        </p>
        <div className="loginsignup-agree">
          <input
            type="checkbox"
            name="agree"
            checked={inputs.agree}
            onChange={handleChange}
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </form>
    </div>
  );
};

export default LoginSignUp;
