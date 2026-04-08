import { useState } from "react";
import { Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { apiPost } from "../api/client.js";

export function Login() {
  const [mockEmail, setMockEmail] = useState("jane@developer.com");
  const [mockName, setMockName] = useState("Jane Doe");
  const [showRoleSelect, setShowRoleSelect] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleMock = () => {
    // Reveal the role selection instead of logging in right away
    setShowRoleSelect(true);
  };

  const submitMockLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiPost("/auth/mock-firebase", { 
        email: mockEmail, 
        name: mockName, 
        role: selectedRole 
      });
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

          {!showRoleSelect ? (
            <div className="flex flex-col gap-4">
              <button
                onClick={handleGoogleMock}
                className="w-full bg-white dark:bg-[#1f1f1f] text-black dark:text-white font-bold border border-gray-300 dark:border-[#333] py-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-sm"
              >
                <img src="https://static.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google (Mock)
              </button>
            </div>
          ) : (
            <form onSubmit={submitMockLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Mock Email</label>
                <input
                  type="email" value={mockEmail} onChange={(e) => setMockEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 dark:focus:border-[#4285F4] transition-colors"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Mock Name</label>
                <input
                  type="text" value={mockName} onChange={(e) => setMockName(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 dark:focus:border-[#4285F4] transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Select Role</label>
                <select 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 dark:focus:border-[#4285F4] transition-colors cursor-pointer"
                >
                  <option value="user">User - Browse & Download</option>
                  <option value="developer">Developer - Upload APKs</option>
                </select>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-blue-500 dark:bg-[#4285F4] text-white font-bold text-sm py-4 rounded-2xl hover:bg-blue-600 dark:hover:bg-[#3367d6] transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.98] shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Complete Sign In"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          <div className="mt-8 mb-6">
            <div className="relative flex justify-center text-xs">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-[#333]"></div>
              </div>
              <span className="bg-white dark:bg-[#0a0a0a] px-4 text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-wider relative z-10 transition-colors">
                Legacy Testing
              </span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111] text-gray-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-[#4285F4] hover:text-blue-600 dark:hover:text-[#4285F4] transition-colors"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin("developer")}
              className="flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111] text-gray-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-[#4285F4] hover:text-blue-600 dark:hover:text-[#4285F4] transition-colors"
            >
              Dev
            </button>
            <button
              onClick={() => handleDemoLogin("user")}
              className="flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111] text-gray-700 dark:text-zinc-300 hover:border-blue-400 dark:hover:border-[#4285F4] hover:text-blue-600 dark:hover:text-[#4285F4] transition-colors"
            >
              User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
