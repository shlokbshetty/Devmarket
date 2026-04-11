import { useState } from "react";
import { Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

export function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await login();
      navigate("/");
    } catch (err) {
      setError(err.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

          {import.meta.env.VITE_FIREBASE_API_KEY === 'mock-key' && (
            <div className="mb-6 p-4 bg-[#1ed760]/10 border border-[#1ed760]/20 rounded-2xl text-[#1ed760] text-xs font-semibold text-center">
              <span className="block mb-1 opacity-100">🛠️ DEVELOPER MODE</span>
              <p className="opacity-70 font-medium">Real Google Auth is disabled. Clicking the button will prompt for a mock email to simulate login.</p>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white dark:bg-[#1f1f1f] text-black dark:text-white font-bold border border-gray-300 dark:border-[#333] py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      </div>
    </div>
  );
}
