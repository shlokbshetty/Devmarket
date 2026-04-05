import { Moon, Sun, Key, Shield, Bell, ChevronRight, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-screen text-gray-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif] pb-[24px] transition-colors">
      
      {/* Header */}
      <div className="flex h-[64px] items-center px-[24px]">
        <div className="flex gap-[12px] items-center">
          <button onClick={() => navigate(-1)} className="size-[16px]">
            <svg className="block size-full" fill="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8L10 4" stroke={theme === 'dark' ? '#72FE8F' : '#10b981'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="font-bold text-[24px] tracking-[-0.5px]">Settings</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[24px] pt-[16px] flex flex-col gap-[32px]">
        
        {/* Appearance Group (Level 1 Plinth) */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-medium text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Appearance</div>
          
          <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[16px] flex items-center justify-between transition-colors">
            <div className="flex items-center gap-[16px]">
              <div className={`p-[12px] rounded-[12px] ${theme === 'dark' ? 'bg-[#20201f] text-[#adaaaa]' : 'bg-gray-200 text-gray-600'}`}>
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <div className="font-bold text-[16px] leading-[24px]">Theme Mode</div>
                <div className="text-[14px] text-gray-500 dark:text-[#adaaaa] leading-[20px]">{theme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}</div>
              </div>
            </div>
            {/* Toggle */}
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`relative inline-flex h-[32px] w-[56px] items-center rounded-full transition-colors focus:outline-none ${theme === 'dark' ? 'bg-[#72FE8F]' : 'bg-gray-300'}`}>
              <span className={`${theme === 'dark' ? 'translate-x-[26px]' : 'translate-x-[2px]'} inline-block h-[28px] w-[28px] transform rounded-full bg-white transition-transform shadow-sm`} />
            </button>
          </div>
        </div>

        {/* Account Group (Level 1 Plinth) */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-medium text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Account</div>
          
          <div className="flex flex-col gap-[8px]">
            {[
              { icon: <Key size={20} />, label: "Password & Security", route: "/settings/security" },
              { icon: <Bell size={20} />, label: "Notifications", route: "/settings/notifications" },
              { icon: <Shield size={20} />, label: "Privacy Settings", route: "/settings/privacy" },
            ].map((item) => (
              <div key={item.label} 
                onClick={() => navigate(item.route)}
                className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[16px] flex items-center justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-[#20201f] transition-colors group">
                <div className="flex items-center gap-[16px]">
                  <div className="p-[12px] bg-white dark:bg-[#20201f] rounded-[12px] text-gray-600 dark:text-[#adaaaa] group-hover:text-emerald-500 dark:group-hover:text-[#72FE8F] transition-colors">
                    {item.icon}
                  </div>
                  <span className="font-bold text-[16px]">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 dark:text-[#adaaaa] group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
