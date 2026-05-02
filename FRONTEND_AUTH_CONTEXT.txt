import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isSignout: true,
    isLoading: true,
    isSignedIn: false,
    user: null,
    token: null,
  });

  // Check if user is already logged in
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const userStr = await AsyncStorage.getItem('user');

        if (token && userStr) {
          setAuthState({
            isSignout: false,
            isLoading: false,
            isSignedIn: true,
            user: JSON.parse(userStr),
            token,
          });
        } else {
          setAuthState({
            isSignout: false,
            isLoading: false,
            isSignedIn: false,
            user: null,
            token: null,
          });
        }
      } catch (error) {
        console.error('Failed to restore session:', error);
        setAuthState({
          isSignout: false,
          isLoading: false,
          isSignedIn: false,
          user: null,
          token: null,
        });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (email, password) => {
      try {
        const response = await authAPI.login(email, password);
        const { token, user } = response.data;

        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        setAuthState({
          isSignout: false,
          isLoading: false,
          isSignedIn: true,
          user,
          token,
        });
      } catch (error) {
        throw error.response?.data?.error || 'Login failed';
      }
    },
    signUp: async (username, email, password, firstName, lastName) => {
      try {
        const response = await authAPI.register(username, email, password, firstName, lastName);
        const { token, user } = response.data;

        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        setAuthState({
          isSignout: false,
          isLoading: false,
          isSignedIn: true,
          user,
          token,
        });
      } catch (error) {
        throw error.response?.data?.error || 'Registration failed';
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('user');

        setAuthState({
          isSignout: false,
          isLoading: false,
          isSignedIn: false,
          user: null,
          token: null,
        });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  };

  return <AuthContext.Provider value={{ ...authState, ...authContext }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
