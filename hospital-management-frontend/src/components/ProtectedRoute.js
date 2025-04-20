import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/context/AuthContext';

const ProtectedRoute = ({ children, userType }) => {
  const { currentUser, userType: currentUserType } = useContext(AuthContext);

  if (!currentUser) {
    // Redirect to home if not logged in
    return <Navigate to="/" />;
  }

  if (userType && userType !== currentUserType) {
    // Redirect to appropriate dashboard if wrong user type
    if (currentUserType === 'patient') {
      return <Navigate to="/patient/dashboard" />;
    } else if (currentUserType === 'doctor') {
      return <Navigate to="/doctor/dashboard" />;
    }
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;