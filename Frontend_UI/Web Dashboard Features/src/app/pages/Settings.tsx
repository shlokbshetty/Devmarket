import { Moon, Sun, Key, Shield, Bell, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm">App preferences & account.</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl p-5 shadow-lg mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-4 ml-1">Appearance</h3>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#222]">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-amber-500/10 text-amber-500'}`}>
              {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <div>
              <div className="font-bold text-sm">Theme Mode</div>
              <div className="text-xs text-gray-500 dark:text-zinc-400">{theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}</div>
            </div>
          </div>
          
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-[#34d399]' : 'bg-gray-300'}`}
          >
            <span
              className={`${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl overflow-hidden shadow-lg mb-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-2 mt-5 ml-6">Account</h3>
        
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors cursor-pointer border-b border-gray-100 dark:border-[#222]">
            <div className="flex items-center gap-3">
              <Key size={18} className="text-gray-400 dark:text-zinc-500" />
              <span className="text-sm font-medium">Password & Security</span>
            </div>
            <ChevronRight size={16} className="text-gray-300 dark:text-gray-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors cursor-pointer border-b border-gray-100 dark:border-[#222]">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-gray-400 dark:text-zinc-500" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <ChevronRight size={16} className="text-gray-300 dark:text-gray-500" />
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-[#222] transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-gray-400 dark:text-zinc-500" />
              <span className="text-sm font-medium">Privacy Settings</span>
            </div>
            <ChevronRight size={16} className="text-gray-300 dark:text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
