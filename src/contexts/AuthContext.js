import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAPI } from '../data/mockData';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const setUserFromSession = (session) => {
      if (!isMounted) return;
      if (session?.user) {
        const mappedUser = {
          id: session.user.id,
          email: session.user.email,
          name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email,
          role: 'author'
        };
        setUser(mappedUser);
        localStorage.setItem('user', JSON.stringify(mappedUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    };

    const init = async () => {
      // Prefer Supabase session (Google OAuth redirects back with a session)
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setUserFromSession(data.session);
      } else {
        // Fallback to stored user data
        const storedUser = localStorage.getItem('user');
        if (storedUser && isMounted) {
          setUser(JSON.parse(storedUser));
        }
      }
      if (isMounted) setLoading(false);
    };

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserFromSession(session);
      }
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const response = await mockAPI.login(email, password);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      const response = await mockAPI.register(userData);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    supabase.auth.signOut();
  };

  const loginWithGoogle = async () => {
    const redirectTo =
      process.env.REACT_APP_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : undefined);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo
      }
    });
    if (error) throw error;
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

