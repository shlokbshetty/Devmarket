import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { apiPost } from '../api/client.js';

const AuthContext = createContext(null);
const STORAGE_KEY = 'devmarket_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to handle backend auth after firebase success
  const handleBackendAuth = async (idToken) => {
    try {
      const data = await apiPost('/auth/firebase', { idToken });
      const { token: backendToken, user: backendUser } = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: backendToken, user: backendUser }));
      setToken(backendToken);
      setUser(backendUser);
    } catch (err) {
      console.error('Backend auth failed:', err);
    }
  };

  // Restore session AND handle redirect result
  useEffect(() => {
    const initAuth = async () => {
      // 1. Check local storage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const { token: storedToken, user: storedUser } = JSON.parse(stored);
          if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
          }
        } catch (e) { /* ignore */ }
      }

      // 2. Check for redirect result (important for Mobile APKs)
      if (import.meta.env.VITE_FIREBASE_API_KEY !== 'mock-key') {
        try {
          const result = await getRedirectResult(auth);
          if (result?.user) {
            const idToken = await result.user.getIdToken();
            await handleBackendAuth(idToken);
          }
        } catch (err) {
          console.error("Redirect auth error:", err);
        }
      }
      
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async () => {
    if (import.meta.env.VITE_FIREBASE_API_KEY === 'mock-key') {
      const email = window.prompt("Dev Mode: Enter email to login as (e.g. admin@devmarket.lan):", "admin@devmarket.lan");
      if (!email) return;
      await handleBackendAuth('mock-token-' + email);
    } else {
      // For Mobile APKs, Redirect is often more reliable than Popup
      await signInWithRedirect(auth, googleProvider);
    }
  };

  const logout = async () => {
    if (import.meta.env.VITE_FIREBASE_API_KEY !== 'mock-key') {
      await signOut(auth);
    }
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'administrator';
  const isDeveloper = user?.role === 'developer';

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, isAdmin, isDeveloper, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
