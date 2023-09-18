import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { UserContext } from './userContext'; // Import your user context

const ProtectedRoute = ({ path, ...props }) => {
  const { user } = useContext(UserContext); // Get the user from your user context

  return user ? <Route path={path} {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
