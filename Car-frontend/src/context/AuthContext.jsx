import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Checking authentication...');
      const response = await api.get('/auth/me');
      console.log('Auth check response:', response.data);
      setUser(response.data);
      setIsAuthenticated(true);
      setError(null);
    } catch (error) {
      console.error('Auth check error:', error.response?.data || error.message);
      setUser(null);
      setIsAuthenticated(false);
      setError(error.response?.data?.message || 'Authentication check failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      console.log('Attempting login with:', { email });
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      throw { message: errorMessage };
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);
      console.log('Attempting registration with:', { username, email });
      const response = await api.post('/auth/register', { username, email, password });
      console.log('Registration response:', response.data);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      setError(errorMessage);
      throw { message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await api.post('/auth/logout');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Logout failed');
    }
  };

  const isAdmin = () => {
    return user && (user.role === 'admin' || user.is_admin);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      error,
      setError,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 