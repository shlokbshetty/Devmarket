import { useState, useCallback } from "react";
import { Briefcase, ArrowRight, User, Shield, Code, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [loginType, setLoginType] = useState("user"); // "user", "admin", "developer"
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const { login, loginWithCredentials } = useAuth();

  const handleGoogleLogin = async () => {
    console.log('🔵 Google login button clicked!');
    setError("");
    setLoading(true);
    try {
      console.log('🔵 Calling login function...');
      await login();
      console.log('🔵 Login successful, navigating...');
      navigate("/");
    } catch (err) {
      console.error('🔵 Login error:', err);
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialLogin = async (e) => {
    e.preventDefault();
    console.log('🟢 Credential login button clicked!');
    setError("");
    setLoading(true);
    try {
      console.log('🟢 Calling loginWithCredentials function...');
      await loginWithCredentials(credentials.username, credentials.password, loginType);
      console.log('🟢 Credential login successful, navigating...');
      navigate("/");
    } catch (err) {
      console.error('🟢 Credential login error:', err);
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Enhanced button event handling for mobile
  const handleButtonInteraction = useCallback((e, action) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Provide haptic feedback on mobile if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    action();
  }, []);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    setIsPressed(true);
  }, []);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    setIsPressed(false);
  }, []);

  const handleTouchCancel = useCallback((e) => {
    e.preventDefault();
    setIsPressed(false);
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen flex justify-center w-full transition-colors">
      <div className="w-full max-w-[430px] bg-white dark:bg-[#0a0a0a] min-h-screen relative overflow-hidden flex flex-col justify-center p-6 text-gray-900 dark:text-white border-x border-gray-200 dark:border-[#222] transition-colors">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-400 dark:bg-[#4285F4] opacity-[0.1] dark:opacity-[0.1] blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500 dark:bg-[#EA4335] opacity-[0.1] dark:opacity-[0.1] blur-[80px] rounded-full" />

        <div className="relative z-10 w-full max-w-sm mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-3xl flex items-center justify-center mb-5 text-blue-500 dark:text-[#4285F4] shadow-xl">
              <Briefcase size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-center">DevMarket</h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm text-center font-medium px-4">
              Sign in to manage your apps.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium text-center">
              {error}
            </div>
          )}

          {/* Login Type Selection */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setLoginType("user")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-colors ${
                  loginType === "user" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                <User size={16} className="inline mr-1" />
                User
              </button>
              <button
                onClick={() => setLoginType("developer")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-colors ${
                  loginType === "developer" 
                    ? "bg-green-500 text-white" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                <Code size={16} className="inline mr-1" />
                Developer
              </button>
              <button
                onClick={() => setLoginType("admin")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-colors ${
                  loginType === "admin" 
                    ? "bg-purple-500 text-white" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                <Shield size={16} className="inline mr-1" />
                Admin
              </button>
            </div>
          </div>

          {/* Google Auth for Users */}
          {loginType === "user" && (
            <div className="flex flex-col gap-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className={`w-full bg-white dark:bg-[#1f1f1f] text-black dark:text-white font-bold border border-gray-300 dark:border-[#333] py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ 
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <img src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" className="w-5 h-5" />
                    Sign in with Google
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Credential Login for Admin/Developer */}
          {(loginType === "admin" || loginType === "developer") && (
            <form onSubmit={handleCredentialLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  <Lock size={16} className="inline mr-1" />
                  {loginType === "admin" ? "Admin" : "Developer"} Login
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  loginType === "admin" 
                    ? "bg-purple-500 hover:bg-purple-600 text-white" 
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    {loginType === "admin" ? <Shield size={18} /> : <Code size={18} />}
                    Sign in as {loginType === "admin" ? "Admin" : "Developer"}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
              
              {/* Demo Credentials */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs text-gray-600 dark:text-gray-400">
                <div className="font-bold mb-1">Demo Credentials:</div>
                <div>Username: {loginType === "admin" ? "admin" : "developer"}</div>
                <div>Password: {loginType === "admin" ? "admin123" : "dev123"}</div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
