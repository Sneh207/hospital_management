import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, userType }) => {
  const { isAuthenticated, userType: currentUserType } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={`/${userType}/login`} />;
  }

  if (userType && userType !== currentUserType) {
    // Redirect to appropriate dashboard if wrong user type
    return <Navigate to={`/${currentUserType}/dashboard`} />;
  }

  return children;
};

export default ProtectedRoute;