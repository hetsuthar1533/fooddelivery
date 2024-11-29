import React from "react";
import { Link } from "react-router-dom";

const Pagenot = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    color: '#333'
  },
  heading: {
    fontSize: '6rem',
    marginBottom: '1rem'
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '2rem'
  },
  link: {
    fontSize: '1.2rem',
    color: '#007BFF',
    textDecoration: 'none'
  }
};

export default Pagenot;
