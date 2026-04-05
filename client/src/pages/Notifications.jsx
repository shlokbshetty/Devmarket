import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "next-themes";

export function Notifications() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [prefs, setPrefs] = useState({
    push: true,
    email: false,
    updates: true,
    downloads: true,
    marketing: false
  });

  const togglePref = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-screen text-gray-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif] pb-[60px] transition-colors">
      {/* Header */}
      <div className="flex h-[64px] items-center px-[24px]">
        <div className="flex gap-[12px] items-center">
          <button onClick={() => navigate(-1)} className="size-[16px]">
            <svg className="block size-full" fill="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8L10 4" stroke={theme === 'dark' ? '#72FE8F' : '#10b981'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="font-bold text-[24px] tracking-[-0.5px]">Notifications</div>
        </div>
      </div>

      <div className="px-[24px] pt-[16px] flex flex-col gap-[32px]">
        {/* Core Notifications */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-bold text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Delivery Methods</div>
          
          {[
            { id: 'push', title: 'Push Notifications', desc: 'Receive instant alerts on your device' },
            { id: 'email', title: 'Email Notifications', desc: 'Receive daily summary via email' }
          ].map(item => (
            <div key={item.id} className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[16px] flex items-center justify-between transition-colors">
              <div className="flex flex-col">
                <span className="font-bold text-[16px] leading-[24px]">{item.title}</span>
                <span className="text-[14px] text-gray-500 dark:text-[#adaaaa] leading-[20px]">{item.desc}</span>
              </div>
              <button onClick={() => togglePref(item.id)}
                className={`relative inline-flex h-[32px] w-[56px] shrink-0 items-center rounded-full transition-colors focus:outline-none ${prefs[item.id] ? (theme === 'dark' ? 'bg-[#72FE8F]' : 'bg-emerald-500') : 'bg-gray-300 dark:bg-[#2c2c2c]'}`}>
                <span className={`${prefs[item.id] ? 'translate-x-[26px]' : 'translate-x-[2px]'} inline-block h-[28px] w-[28px] transform rounded-full bg-white transition-transform shadow-sm`} />
              </button>
            </div>
          ))}
        </div>

        {/* Alerts & Events */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-bold text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Alert Types</div>
          
          {[
            { id: 'updates', title: 'App Updates', desc: 'Alerts when your installed apps have updates' },
            { id: 'downloads', title: 'Download Status', desc: 'Alerts for completed or failed downloads' },
            { id: 'marketing', title: 'Marketing', desc: 'Promotions, news and special offers' }
          ].map(item => (
            <div key={item.id} className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[16px] flex items-center justify-between transition-colors">
              <div className="flex flex-col">
                <span className="font-bold text-[16px] leading-[24px]">{item.title}</span>
                <span className="text-[14px] text-gray-500 dark:text-[#adaaaa] leading-[20px] pr-4">{item.desc}</span>
              </div>
              <button onClick={() => togglePref(item.id)}
                className={`relative inline-flex h-[32px] w-[56px] shrink-0 items-center rounded-full transition-colors focus:outline-none ${prefs[item.id] ? (theme === 'dark' ? 'bg-[#72FE8F]' : 'bg-emerald-500') : 'bg-gray-300 dark:bg-[#2c2c2c]'}`}>
                <span className={`${prefs[item.id] ? 'translate-x-[26px]' : 'translate-x-[2px]'} inline-block h-[28px] w-[28px] transform rounded-full bg-white transition-transform shadow-sm`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
