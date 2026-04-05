import { useState } from "react";
import { useNavigate } from "react-router";
import { Key, Smartphone, Laptop, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

export function Security() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [tfa, setTfa] = useState(false);

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
          <div className="font-bold text-[24px] tracking-[-0.5px]">Password & Security</div>
        </div>
      </div>

      <div className="px-[24px] pt-[16px] flex flex-col gap-[32px]">
        {/* Change Password */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-bold text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Change Password</div>
          
          <div className="flex flex-col gap-[12px]">
            <input type="password" placeholder="Current Password" 
              className="bg-gray-100 dark:bg-[#1a1a1a] h-[52px] w-full rounded-[12px] px-[16px] text-[14px] outline-none focus:border-b-2 border-emerald-500 dark:border-[#72FE8F] transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#767575]" />
            <input type="password" placeholder="New Password" 
              className="bg-gray-100 dark:bg-[#1a1a1a] h-[52px] w-full rounded-[12px] px-[16px] text-[14px] outline-none focus:border-b-2 border-emerald-500 dark:border-[#72FE8F] transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#767575]" />
            <input type="password" placeholder="Confirm New Password" 
              className="bg-gray-100 dark:bg-[#1a1a1a] h-[52px] w-full rounded-[12px] px-[16px] text-[14px] outline-none focus:border-b-2 border-emerald-500 dark:border-[#72FE8F] transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#767575]" />
          </div>
          
          <button className="h-[48px] w-full rounded-[12px] shadow-[0px_8px_30px_0px_rgba(16,185,129,0.2)] dark:shadow-[0px_8px_30px_0px_rgba(114,254,143,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98] mt-[8px]"
                  style={{ backgroundImage: theme === 'dark' ? "linear-gradient(135deg, #72FE8F 0%, #1CB853 100%)" : "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
            <div className="font-bold text-white dark:text-[#005f26] text-[16px]">Update Password</div>
          </button>
        </div>

        {/* Two-Factor Auth */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-bold text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Additional Security</div>
          
          <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[16px] flex items-center justify-between transition-colors">
            <div className="flex flex-col">
              <span className="font-bold text-[16px] leading-[24px]">Two-Factor Authentication</span>
              <span className="text-[14px] text-gray-500 dark:text-[#adaaaa]">Add an extra layer of security</span>
            </div>
            <button onClick={() => setTfa(!tfa)}
              className={`relative inline-flex h-[32px] w-[56px] items-center rounded-full transition-colors focus:outline-none ${tfa ? (theme === 'dark' ? 'bg-[#72FE8F]' : 'bg-emerald-500') : 'bg-gray-300 dark:bg-[#2c2c2c]'}`}>
              <span className={`${tfa ? 'translate-x-[26px]' : 'translate-x-[2px]'} inline-block h-[28px] w-[28px] transform rounded-full bg-white transition-transform shadow-sm`} />
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-white dark:bg-[#131313] rounded-[24px] p-[24px] flex flex-col gap-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-colors">
          <div className="text-[12px] font-bold text-gray-500 dark:text-[#adaaaa] tracking-[1px] uppercase">Active Sessions</div>
          
          <div className="flex flex-col gap-[8px]">
            <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[16px] flex items-center justify-between border border-emerald-500/20 dark:border-[#72FE8F]/20 transition-colors">
              <div className="flex items-center gap-[16px]">
                <div className="p-[10px] bg-emerald-100 dark:bg-[#20201f] rounded-[12px] text-emerald-600 dark:text-[#72FE8F]">
                  <Laptop size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px]">Windows PC - Chrome</span>
                  <span className="text-[12px] text-emerald-600 dark:text-[#72FE8F] font-medium">Active now</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-[16px] p-[16px] flex items-center justify-between transition-colors">
              <div className="flex items-center gap-[16px]">
                <div className="p-[10px] bg-white dark:bg-[#20201f] rounded-[12px] text-gray-500 dark:text-[#adaaaa]">
                  <Smartphone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[14px]">iPhone 13 - Safari</span>
                  <span className="text-[12px] text-gray-500 dark:text-[#adaaaa]">Last active: 2 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center justify-center gap-[8px] h-[48px] w-full rounded-[12px] bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold text-[16px] transition-colors mt-[8px]">
            <LogOut size={18} />
            Logout from all devices
          </button>
        </div>

      </div>
    </div>
  );
}
