import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { apiPost } from '../api/client.js';
import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';

const AuthContext = createContext(null);
const STORAGE_KEY = 'devmarket_auth';

// Platform detection utilities
const isMobile = () => Capacitor.isNativePlatform();
const isAndroid = () => Capacitor.getPlatform() === 'android';
const isIOS = () => Capacitor.getPlatform() === 'ios';

// Retry configuration for mobile auth
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  backoffMultiplier: 2
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Enhanced retry utility for mobile auth operations
  const retryOperation = async (operation, retries = RETRY_CONFIG.maxRetries) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        console.warn(`Auth operation attempt ${attempt + 1} failed:`, error);
        
        if (attempt === retries) {
          throw error; // Final attempt failed
        }
        
        // Wait before retry with exponential backoff
        const delay = RETRY_CONFIG.retryDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  // Helper to handle backend auth after firebase success
  const handleBackendAuth = async (idToken) => {
    try {
      console.log('🔄 Sending auth request to backend...');
      console.log('🎫 ID Token:', idToken.substring(0, 20) + '...');
      console.log('🌐 API URL:', import.meta.env.VITE_API_BASE_URL + '/auth/firebase');
      
      const data = await retryOperation(async () => {
        return await apiPost('/auth/firebase', { idToken });
      });
      
      console.log('✅ Backend auth response:', data);
      
      const { token: backendToken, user: backendUser } = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: backendToken, user: backendUser }));
      setToken(backendToken);
      setUser(backendUser);
      setAuthError(null); // Clear any previous errors
      
      console.log('✅ Backend auth successful for user:', backendUser?.email);
    } catch (err) {
      console.error('❌ Backend auth failed after retries:', err);
      setAuthError('Authentication failed. Please try again.');
      throw err;
    }
  };

  // Enhanced mobile redirect result handling
  const handleMobileRedirectResult = async () => {
    if (import.meta.env.VITE_FIREBASE_API_KEY === 'mock-key') {
      return null; // Skip in mock mode
    }

    try {
      console.log('Checking for redirect result on mobile platform...');
      
      const result = await retryOperation(async () => {
        const redirectResult = await getRedirectResult(auth);
        
        // On Android WebView, sometimes the result is delayed
        if (isAndroid() && !redirectResult) {
          // Wait a bit longer for Android WebView to process
          await new Promise(resolve => setTimeout(resolve, 500));
          return await getRedirectResult(auth);
        }
        
        return redirectResult;
      });

      if (result?.user) {
        console.log('Mobile redirect result found, processing user:', result.user.email);
        const idToken = await result.user.getIdToken();
        await handleBackendAuth(idToken);
        return result;
      }
      
      return null;
    } catch (err) {
      console.error('Mobile redirect result handling failed:', err);
      
      // Enhanced error handling for mobile-specific issues
      if (err.code === 'auth/network-request-failed') {
        setAuthError('Network error. Please check your connection and try again.');
      } else if (err.code === 'auth/popup-blocked') {
        setAuthError('Authentication popup was blocked. Please allow popups and try again.');
      } else if (err.code === 'auth/cancelled-popup-request') {
        setAuthError('Authentication was cancelled. Please try again.');
      } else {
        setAuthError('Authentication failed. Please try again.');
      }
      
      throw err;
    }
  };

  // Restore session AND handle redirect result with mobile enhancements
  useEffect(() => {
    const initAuth = async () => {
      console.log('Initializing auth, platform:', Capacitor.getPlatform());
      
      // 1. Check local storage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const { token: storedToken, user: storedUser } = JSON.parse(stored);
          if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
            console.log('Restored auth from storage for user:', storedUser?.email);
          }
        } catch (e) { 
          console.warn('Failed to parse stored auth data:', e);
        }
      }

      // 2. Enhanced mobile redirect result handling
      try {
        await handleMobileRedirectResult();
      } catch (err) {
        console.error("Mobile redirect auth error:", err);
        // Don't block initialization on redirect errors
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  // Separate useEffect for mobile app state listener to avoid conditional hooks
  useEffect(() => {
    if (!isMobile()) return;

    const handleAppStateChange = async (state) => {
      if (state.isActive) {
        console.log('App became active, checking for auth completion...');
        try {
          await handleMobileRedirectResult();
        } catch (err) {
          console.error('Auth check on app resume failed:', err);
        }
      }
    };

    App.addListener('appStateChange', handleAppStateChange);
    
    // Cleanup listener
    return () => {
      App.removeAllListeners();
    };
  }, []);

  const login = async (mockEmail = null) => {
    console.log('🔐 Login button clicked!');
    console.log('🔧 Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
    console.log('🌐 API Base URL:', import.meta.env.VITE_API_BASE_URL);
    
    setAuthError(null); // Clear any previous errors
    
    if (import.meta.env.VITE_FIREBASE_API_KEY === 'mock-key') {
      console.log('🛠️ Using mock authentication mode');
      
      let email = mockEmail;
      if (!email) {
        email = window.prompt("Dev Mode: Enter email to login as (e.g. admin@devmarket.lan):", "admin@devmarket.lan");
      }
      
      console.log('📧 User entered email:', email);
      if (!email) return;
      
      try {
        await handleBackendAuth('mock-token-' + email);
        console.log('✅ Mock login successful');
      } catch (err) {
        console.error('❌ Mock login failed:', err);
      }
      return;
    }

    try {
      console.log('Starting real Google auth login process, platform:', Capacitor.getPlatform());
      
      if (isMobile()) {
        // Native Google Sign-In for Capacitor
        console.log('Using native Google Sign-In flow...');
        
        const result = await GoogleSignIn.signIn();
        
        if (result?.authentication?.idToken) {
          console.log('✅ Native Google auth successful');
          const credential = GoogleAuthProvider.credential(result.authentication.idToken);
          const firebaseResult = await signInWithCredential(auth, credential);
          
          if (firebaseResult.user) {
            const idToken = await firebaseResult.user.getIdToken();
            await handleBackendAuth(idToken);
          }
        }
      } else {
        // Web browser - use popup for better UX
        console.log('Using web auth flow with popup...');
        
        const result = await retryOperation(async () => {
          return await signInWithPopup(auth, googleProvider);
        });
        
        if (result?.user) {
          console.log('✅ Google auth successful, user:', result.user.email);
          const idToken = await result.user.getIdToken();
          console.log('🎫 Got ID token, sending to backend...');
          await handleBackendAuth(idToken);
        }
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
      
      // Enhanced error handling with user-friendly messages
      if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/network-request-failed') {
        setAuthError('Network error. Please check your connection and try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setAuthError('Too many failed attempts. Please wait a moment and try again.');
      } else if (err.code === 'auth/user-disabled') {
        setAuthError('This account has been disabled. Please contact support.');
      } else {
        setAuthError('Sign-in failed. Please try again.');
      }
      
      throw err;
    }
  };

  // Credential-based login for admin/developer
  const loginWithCredentials = async (username, password, role) => {
    console.log('🟢 loginWithCredentials called with:', { username, role });
    console.log('🌐 API Base URL:', import.meta.env.VITE_API_BASE_URL);
    
    setAuthError(null);
    
    try {
      console.log('🔄 Making API request to /auth/credentials...');
      const data = await retryOperation(async () => {
        return await apiPost('/auth/credentials', { username, password, role });
      });
      
      console.log('✅ Credential auth response:', data);
      
      const { token: backendToken, user: backendUser } = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: backendToken, user: backendUser }));
      setToken(backendToken);
      setUser(backendUser);
      setAuthError(null);
      
      console.log('✅ Credential auth successful for user:', backendUser?.email);
    } catch (err) {
      console.error('❌ Credential auth failed:', err);
      setAuthError('Invalid credentials. Please try again.');
      throw err;
    }
  };

  const logout = async () => {
    try {
      setAuthError(null); // Clear any errors
      
      if (import.meta.env.VITE_FIREBASE_API_KEY !== 'mock-key') {
        await retryOperation(async () => {
          await signOut(auth);
        });
      }
      
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      setToken(null);
      
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout failed:', err);
      // Even if Firebase signOut fails, clear local state
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      setToken(null);
      setAuthError('Logout completed with warnings.');
    }
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'administrator';
  const isDeveloper = user?.role === 'developer';

  // Additional mobile-specific utilities
  const clearAuthError = () => setAuthError(null);
  const isMobileAuth = isMobile();

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      loginWithCredentials,
      logout, 
      isAuthenticated, 
      isAdmin, 
      isDeveloper, 
      loading,
      authError,
      clearAuthError,
      isMobileAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
