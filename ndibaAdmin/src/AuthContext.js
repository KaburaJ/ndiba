import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithGoogle } from './firebase'

const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Assume this function checks if a user is authenticated (e.g., check localStorage, etc.)
        const savedUser = localStorage.getItem('user'); // Example of simple check
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const loginWithGoogle = async () => {
    const response = await signInWithGoogle();
    if (response) {
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user)); // Persist user data
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove persisted user data
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
