import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    Geolocation: '',
  });
   const navigate = useNavigate()
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/createuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.Geolocation}),
    });


    const json = await response.json();
    console.log(json);
    setCredentials({
        name: '',
        email: '',
        password: '',
        Geolocation: '',
      })
    if (response.ok) {
      alert('User created successfully!');
      console.log(credentials.name);
      localStorage.setItem("userName", credentials.name);

      navigate('/login');
    } else {
      alert(`Error: ${json.message}`);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="geolocation"
              name="Geolocation"
              value={credentials.Geolocation}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
