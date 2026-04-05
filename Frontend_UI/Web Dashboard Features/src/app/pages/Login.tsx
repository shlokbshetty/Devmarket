import { useState } from "react";
import { Briefcase, ArrowRight, Github } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen flex justify-center w-full transition-colors">
      <div className="w-full max-w-[430px] bg-white dark:bg-[#0a0a0a] min-h-screen relative overflow-hidden flex flex-col justify-center p-6 text-gray-900 dark:text-white border-x border-gray-200 dark:border-[#222] transition-colors">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 dark:bg-[#34d399] opacity-[0.1] dark:opacity-[0.05] blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 dark:bg-emerald-500 opacity-[0.1] dark:opacity-[0.05] blur-[80px] rounded-full" />
        
        <div className="relative z-10 w-full max-w-sm mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-3xl flex items-center justify-center mb-5 text-emerald-500 dark:text-[#34d399] shadow-xl">
              <Briefcase size={32} />
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2 text-center">DevMarket</h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm text-center font-medium px-4">Manage your developer account & apps.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors shadow-inner"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-[#34d399] hover:text-emerald-500 dark:hover:text-[#2ebc87] transition-colors">Forgot?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors shadow-inner"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-emerald-400 dark:bg-[#34d399] text-black font-black text-sm uppercase tracking-wider py-4 rounded-2xl hover:bg-emerald-500 dark:hover:bg-[#2ebc87] transition-all flex items-center justify-center gap-2 mt-2 active:scale-[0.98] shadow-lg shadow-emerald-400/20 dark:shadow-[#34d399]/20"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 mb-6">
            <div className="relative flex justify-center text-xs">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-[#333]"></div>
              </div>
              <span className="bg-white dark:bg-[#0a0a0a] px-4 text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-wider relative z-10 transition-colors">Or connect</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] hover:bg-gray-100 dark:hover:bg-[#222] py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm dark:shadow-none text-gray-700 dark:text-white">
              <Github size={16} /> GitHub
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] hover:bg-gray-100 dark:hover:bg-[#222] py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm dark:shadow-none text-gray-700 dark:text-white">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
              Google
            </button>
          </div>
          
          <p className="text-center text-xs font-medium text-gray-500 dark:text-zinc-500 mt-10">
            Don't have an account? <a href="#" className="text-emerald-600 dark:text-[#34d399] hover:underline font-bold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
