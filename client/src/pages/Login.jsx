import { useState } from "react";
import { Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { apiPost } from "../api/client.js";

export function Login() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      let data;
      if (isRegister) {
        data = await apiPost("/auth/register", { name, contact, password });
      } else {
        data = await apiPost("/auth/login", { contact, password });
      }
      login(data.data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    login({
      token: "demo-token-123",
      _id: "demo-user-id",
      name: role === "admin" ? "Admin User" : "Dev User",
      contact: role === "admin" ? "admin@devmarket.com" : "dev@devmarket.com",
      role: role,
    });
    navigate("/");
  };

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen flex justify-center w-full transition-colors">
      <div className="w-full max-w-[430px] bg-white dark:bg-[#0a0a0a] min-h-screen relative overflow-hidden flex flex-col justify-center p-6 text-gray-900 dark:text-white border-x border-gray-200 dark:border-[#222] transition-colors">

        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1ed760] dark:bg-[#1ed760] opacity-[0.1] dark:opacity-[0.05] blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1ed760] dark:bg-[#1ed760] opacity-[0.1] dark:opacity-[0.05] blur-[80px] rounded-full" />

        <div className="relative z-10 w-full max-w-sm mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-3xl flex items-center justify-center mb-5 text-[#1ed760] dark:text-[#1ed760] shadow-xl">
              <Briefcase size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-center">DevMarket</h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm text-center font-medium px-4">
              {isRegister ? "Create your developer account." : "Manage your developer account & apps."}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Full Name</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors shadow-inner"
                  required
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Email / Phone</label>
              <input
                type="text" value={contact} onChange={(e) => setContact(e.target.value)}
                placeholder="developer@example.com"
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors shadow-inner"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Password</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors shadow-inner"
                required
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-[#1ed760] dark:bg-[#1ed760] text-black font-black text-sm uppercase tracking-wider py-4 rounded-2xl hover:bg-[#1ed760] dark:hover:bg-[#1ed760] transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.98] shadow-lg shadow-[#1ed760]/20 dark:shadow-[#1ed760]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : (isRegister ? "Create Account" : "Sign In")}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 mb-6">
            <div className="relative flex justify-center text-xs">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-[#333]"></div>
              </div>
              <span className="bg-white dark:bg-[#0a0a0a] px-4 text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-wider relative z-10 transition-colors">
                Demo Access
              </span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111] text-gray-700 dark:text-zinc-300 hover:border-[#1ed760] dark:hover:border-[#1ed760] hover:text-[#1ed760] dark:hover:text-[#1ed760] transition-colors"
            >
              Admin Demo
            </button>
            <button
              onClick={() => handleDemoLogin("user")}
              className="flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111] text-gray-700 dark:text-zinc-300 hover:border-[#1ed760] dark:hover:border-[#1ed760] hover:text-[#1ed760] dark:hover:text-[#1ed760] transition-colors"
            >
              Dev Demo
            </button>
          </div>

          <p className="text-center text-xs font-medium text-gray-500 dark:text-zinc-500 mt-6">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => { setIsRegister(!isRegister); setError(""); }}
              className="text-[#1ed760] dark:text-[#1ed760] hover:underline font-bold"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
