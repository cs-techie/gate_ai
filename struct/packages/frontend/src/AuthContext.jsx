import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, onAuthEvent } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip login - set default admin user directly
    const defaultUser = {
      id: 1,
      email: 'admin@example.com',
      name: 'Admin',
      role: 'admin'
    };
    
    localStorage.setItem('token', 'default-token');
    localStorage.setItem('user', JSON.stringify(defaultUser));
    setUser(defaultUser);
    setLoading(false);
  }, []);

  // Listen for 401 logout events from API interceptor
  useEffect(() => {
    const unsubscribe = onAuthEvent((event) => {
      if (event.type === 'LOGOUT_REQUIRED') {
        setUser(null);
        // Redirect will happen via routing
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      console.log('Login response:', res.data);
      
      if (!res.data.access_token) {
        throw new Error('No access token received from server');
      }
      
      localStorage.setItem('token', res.data.access_token);
      
      const userRes = await authAPI.getMe();
      console.log('User data:', userRes.data);
      
      localStorage.setItem('user', JSON.stringify(userRes.data));
      setUser(userRes.data);
      
      return userRes.data;
    } catch (error) {
      console.error('Login error:', error);
      // Re-throw with better error message
      if (error.response?.status === 401) {
        error.message = 'Invalid email or password';
      } else if (error.response?.status === 400) {
        error.message = error.response.data?.detail || 'Invalid input';
      } else if (error.response) {
        error.message = error.response.data?.detail || 'Server error during login';
      }
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    await authAPI.signup({ name, email, password });
    return login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
