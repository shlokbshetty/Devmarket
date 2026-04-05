import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "next-themes";

export function Privacy() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [prefs, setPrefs] = useState({
    sharing: false,
    ads: false,
    history: true
  });
  
  const [profileVis, setProfileVis] = useState('Public');

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
          <div className="font-bold text-[24px] tracking-[-0.5px]">Privacy Settings</div>
        </div>
      </div>

      <div className="px-[24px] pt-[16px] flex flex-col gap-[32px]">
        {/* Profile Visibility */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-bold text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Visibility</div>
          
          <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[6px] flex items-center transition-colors">
            <button onClick={() => setProfileVis('Public')}
              className={`flex-1 h-[44px] rounded-[12px] font-bold text-[14px] transition-colors ${profileVis === 'Public' ? 'bg-white text-emerald-600 shadow-sm dark:bg-[#20201f] dark:text-[#72FE8F]' : 'text-gray-500 dark:text-[#adaaaa]'}`}>
              Public
            </button>
            <button onClick={() => setProfileVis('Private')}
              className={`flex-1 h-[44px] rounded-[12px] font-bold text-[14px] transition-colors ${profileVis === 'Private' ? 'bg-white text-emerald-600 shadow-sm dark:bg-[#20201f] dark:text-[#72FE8F]' : 'text-gray-500 dark:text-[#adaaaa]'}`}>
              Private
            </button>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-[#adaaaa] px-[4px]">
            {profileVis === 'Public' ? "Your profile and activity are visible to the community." : "Your profile is hidden. Developers can only see aggregated metrics."}
          </p>
        </div>

        {/* Data & History controls */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-bold text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Data Controls</div>
          
          {[
            { id: 'sharing', title: 'Data Sharing', desc: 'Share usage analytics to improve DevMarket' },
            { id: 'ads', title: 'Personalized Ads', desc: 'Allow targeted promotional content' },
            { id: 'history', title: 'Download History', desc: 'Keep track of apps you previously installed' }
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

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] border border-red-100 dark:border-transparent transition-colors">
           <div className="text-[12px] font-bold text-red-500 dark:text-red-400 tracking-[1px] uppercase">Danger Zone</div>
           <p className="text-[14px] text-red-700 dark:text-[#adaaaa]">Once you delete your account, there is no going back. Please be certain.</p>
           <button className="h-[48px] w-full rounded-[12px] bg-red-100 dark:bg-[#2a1313] hover:bg-red-200 dark:hover:bg-[#341818] text-red-600 dark:text-red-500 font-bold text-[16px] transition-colors outline outline-1 outline-red-200 dark:outline-[#481818]">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
