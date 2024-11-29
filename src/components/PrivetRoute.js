import React from 'react';
import { Navigate } from 'react-router-dom';

const PriveteRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if the user is authenticated

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PriveteRoute;
