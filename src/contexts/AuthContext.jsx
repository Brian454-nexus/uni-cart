import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const token = localStorage.getItem('unicart_token');
    if (token) {
      // TODO: Validate token with backend
      // For now, mock user data
      setUser({
        id: '1',
        name: 'Alex Muturi',
        email: 'alex@student.university.edu',
        phone: '+254712345678',
        university: 'University of Nairobi'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      
      // Mock successful login
      const mockUser = {
        id: '1',
        name: 'Alex Muturi',
        email,
        phone: '+254712345678',
        university: 'University of Nairobi'
      };
      
      localStorage.setItem('unicart_token', 'mock_jwt_token');
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/register', userData);
      
      // Mock successful registration
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        university: userData.university
      };
      
      localStorage.setItem('unicart_token', 'mock_jwt_token');
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('unicart_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
