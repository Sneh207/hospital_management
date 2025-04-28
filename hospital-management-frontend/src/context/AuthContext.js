import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved auth state on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedUserType = localStorage.getItem('userType');
    
    if (savedUser && savedUserType) {
      setCurrentUser(JSON.parse(savedUser));
      setUserType(savedUserType);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (user, type) => {
    setCurrentUser(user);
    setUserType(type);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', type);
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
  };

  // Helper functions to check user type
  const isPatient = () => userType === 'patient';
  const isDoctor = () => userType === 'doctor';

  const value = {
    currentUser,
    userType,
    isAuthenticated,
    isPatient: isPatient(),
    isDoctor: isDoctor(),
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};