import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (response.ok) {
      alert('Login successful!');
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userName", json.name); // Store userName from server response
      console.log(localStorage.getItem("userName"));
      console.log(localStorage.getItem("authToken"));
      // Navigate to a protected route or dashboard
      navigate('/');
    } else {
      alert(`Error: ${json.message}`);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
