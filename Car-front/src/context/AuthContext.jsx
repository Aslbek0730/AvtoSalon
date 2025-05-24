import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = async (email, password, rememberMe = false) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login with a mock user
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials check
    if (email === 'admin@example.com' && password === 'password') {
      const userData = {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        phone: '+998123456789',
        isAdmin: true,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } else if (email === 'user@example.com' && password === 'password') {
      const userData = {
        id: '2',
        name: 'Regular User',
        email: 'user@example.com',
        phone: '+998123456789',
        isAdmin: false,
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } else {
      throw new Error('Invalid email or password');
    }
  };
  
  const register = async (name, email, password, phone) => {
    // In a real app, this would make an API call to register the user
    // For demo purposes, we'll simulate a successful registration
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email is already in use
    if (email === 'admin@example.com' || email === 'user@example.com') {
      throw new Error('Email is already in use');
    }
    
    // Registration successful, but not logging in automatically
    console.log('Registered user:', { name, email, phone });
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 