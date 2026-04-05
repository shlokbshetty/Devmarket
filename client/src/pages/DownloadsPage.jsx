import { useNavigate } from "react-router";
import { useState } from "react";

const IMG = {
  reactIcon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=128&h=128&fit=crop",
  rustIcon: "https://images.unsplash.com/photo-1614064641913-6b71a30f10e4?w=128&h=128&fit=crop",
  profileAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
};

export default function DownloadsPage() {
  const navigate = useNavigate();
  const [activeDownloads, setActiveDownloads] = useState([
    { id: 1, name: "React", version: "v18.3 Core", size: "4.2 MB", total: "12 GB left", progress: 35, speed: "7.4 mb/s", isPaused: false },
  ]);
  const [queuedDownloads] = useState([
    { id: 2, name: "Rust", version: "Queued", desc: "Waiting for previous download...", icon: IMG.rustIcon },
  ]);

  const recentArchives = [
    { id: 1, name: "Hyper-V Virtualization Core", version: "v0.8.2-Patch", size: "1842.8 MB" },
    { id: 2, name: "PostgreSQL Optimized Cluster", version: "Production-Config", size: "2.1 GB" },
    { id: 3, name: "AWS Lambda Runtime Env", version: "Node.js 18.x v2", size: "345.8 MB" },
  ];

  const togglePause = (id) => {
    setActiveDownloads(downloads => downloads.map(d => d.id === id ? { ...d, isPaused: !d.isPaused } : d));
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-full overflow-y-auto pb-[24px] transition-colors">
      {/* Main Content */}
      <div className="px-[24px] pt-[24px] flex flex-col gap-[32px]">
        {/* Storage Hero */}
        <div className="bg-white dark:bg-[#131313] shadow-sm dark:shadow-none rounded-[16px] p-[24px] transition-colors">
          <div className="flex flex-col gap-[16px]">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[48px] text-gray-900 dark:text-white tracking-[-1.2px] leading-[48px]">Downloads</div>
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-gray-500 dark:text-[#adaaaa] text-[16px] leading-[24px]">Disk Space</div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-emerald-600 dark:text-[#72fe8f] text-[16px] leading-[24px]">12.4 GB / 50 GB</div>
              </div>
              <div className="bg-gray-200 dark:bg-[#262626] h-[8px] overflow-clip relative rounded-[12px] w-full transition-colors">
                <div className="absolute inset-y-0 left-0 w-[24.8%] bg-gradient-to-r from-emerald-400 to-emerald-600 dark:from-[#72fe8f] dark:to-[#1cb853]" />
              </div>
            </div>
            <div className="flex gap-[16px] pt-[8px]">
              <button className="flex gap-[8px] items-center px-[24px] py-[12px] rounded-[12px]" style={{ backgroundImage: "linear-gradient(150deg, #72FE8F 0%, #1CB853 100%)" }}>
                <svg width="15" height="22" fill="none" viewBox="0 0 15 22"><path d="M7.5 0V15M7.5 15L13 9.5M7.5 15L2 9.5M0 19H15V22H0V19Z" fill="#005F26" /></svg>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#005f26] text-[16px] leading-[24px]">Update All</div>
              </button>
              <button className="bg-gray-100 dark:bg-[#262626] flex gap-[8px] items-center px-[24px] py-[12px] rounded-[12px] border border-gray-200 dark:border-[rgba(72,72,71,0.15)] hover:bg-gray-200 dark:hover:bg-[#2c2c2c] transition-colors">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="5" y="4" width="4" height="12" rx="1" className="fill-gray-600 dark:fill-white" /><rect x="11" y="4" width="4" height="12" rx="1" className="fill-gray-600 dark:fill-white" /></svg>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-gray-900 dark:text-white text-[16px] leading-[24px]">Pause All</div>
              </button>
            </div>
          </div>
        </div>

        {/* Active Transmissions */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[20px] text-gray-900 dark:text-white leading-[28px]">Active Transmissions</div>
            <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{activeDownloads.length + queuedDownloads.length} Items Remaining</div>
          </div>
          {activeDownloads.map((dl) => (
            <div key={dl.id} className="bg-white dark:bg-[#131313] shadow-sm dark:shadow-none rounded-[16px] p-[20px] flex flex-col gap-[16px] transition-colors">
              <div className="flex gap-[16px] items-start">
                <div className="bg-gray-100 dark:bg-[#262626] rounded-[12px] shrink-0 size-[56px] overflow-hidden"><img alt={dl.name} className="size-full object-cover" src={IMG.reactIcon} /></div>
                <div className="flex flex-1 flex-col gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-gray-900 dark:text-white leading-[24px]">{dl.name}</div>
                  <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{dl.version} • {dl.size} x {dl.total}</div>
                </div>
                <div className="flex gap-[12px] items-center">
                  <button onClick={() => togglePause(dl.id)} className="size-[20px] text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-[#adaaaa]">
                    <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                      {dl.isPaused ? <path d="M6 4L14 10L6 16V4Z" fill="currentColor" /> : <><rect x="5" y="4" width="4" height="12" rx="1" fill="currentColor" /><rect x="11" y="4" width="4" height="12" rx="1" fill="currentColor" /></>}
                    </svg>
                  </button>
                  <button className="size-[20px]"><svg className="block size-full" fill="none" viewBox="0 0 20 20"><path d="M15 5L5 15M5 5L15 15" stroke="#FF7351" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <div className="bg-gray-200 dark:bg-[#262626] h-[6px] overflow-clip relative rounded-full w-full transition-colors">
                  <div className="absolute h-full left-0 rounded-full shadow-[0px_0px_15px_0px_rgba(16,185,129,0.4)] dark:shadow-[0px_0px_15px_0px_rgba(114,254,143,0.4)]" style={{ width: `${dl.progress}%`, backgroundImage: "linear-gradient(135deg, #72FE8F 0%, #1CB853 100%)" }} />
                </div>
                <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">{dl.progress}% • {dl.speed}</div>
              </div>
            </div>
          ))}
          {queuedDownloads.map((dl) => (
            <div key={dl.id} className="bg-white dark:bg-[#131313] shadow-sm dark:shadow-none rounded-[16px] p-[20px] flex items-center justify-between transition-colors">
              <div className="flex gap-[16px] items-start">
                <div className="bg-gray-100 dark:bg-[#262626] rounded-[12px] shrink-0 size-[56px] overflow-hidden"><img alt={dl.name} className="size-full object-cover" src={dl.icon} /></div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-gray-900 dark:text-white leading-[24px]">{dl.name}</div>
                  <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{dl.desc}</div>
                </div>
              </div>
              <div className="flex gap-[12px] items-center">
                <button className="size-[20px]"><svg className="block size-full" fill="none" viewBox="0 0 20 20"><path d="M6 4L14 10L6 16V4Z" className="fill-emerald-500 dark:fill-[#72FE8F]" /></svg></button>
                <button className="size-[20px]"><svg className="block size-full" fill="none" viewBox="0 0 20 20"><path d="M15 5L5 15M5 5L15 15" stroke="#FF7351" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Archives */}
        <div className="flex flex-col gap-[16px] pt-[16px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[20px] text-gray-900 dark:text-white leading-[28px]">Recent Archives</div>
            <button className="font-['Inter',sans-serif] text-emerald-600 dark:text-[#72fe8f] text-[14px] leading-[20px]">Clear History</button>
          </div>
          <div className="flex items-center justify-between py-[12px] border-b border-gray-200 dark:border-[#262626]">
            <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] uppercase tracking-[1.2px]">Asset Name</div>
            <div className="flex gap-[64px]">
              <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] uppercase tracking-[1.2px] w-[48px]">Size</div>
              <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] uppercase tracking-[1.2px] w-[56px] text-center">Action</div>
            </div>
          </div>
          {recentArchives.map((a) => (
            <div key={a.id} className="flex items-center justify-between py-[16px] border-b border-gray-200 dark:border-[#262626]">
              <div className="flex gap-[16px] items-center">
                <div className="bg-gray-100 dark:bg-[#262626] flex items-center justify-center rounded-[8px] shrink-0 size-[40px] transition-colors">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V7L13 2Z" stroke="#0ea5e9" className="dark:stroke-[#88EBFF]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 2V7H16" stroke="#0ea5e9" className="dark:stroke-[#88EBFF]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] text-gray-900 dark:text-white leading-[20px]">{a.name}</div>
                  <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[11px] leading-[16px]">{a.version}</div>
                </div>
              </div>
              <div className="flex gap-[64px] items-center">
                <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px] w-[48px]">{a.size}</div>
                <button className="bg-white dark:bg-[#131313] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors flex h-[32px] items-center justify-center rounded-full w-[56px] shadow-sm dark:shadow-none border border-gray-200 dark:border-[rgba(255,255,255,0.05)]">
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M13.5 6.5L8 12L2.5 6.5" stroke="currentColor" className="text-gray-400 dark:text-[#ADAAAA]" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
