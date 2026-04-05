import { useNavigate } from "react-router";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import svgPaths from "../../imports/svg-r7uilmuzp1";
import imgReactIcon from "figma:asset/b757decf946255867455c9b7aec450ac2f837250.png";
import imgRustIcon from "figma:asset/8135e0feba155810cda22888dec703458038834e.png";
import imgProfileAvatar from "figma:asset/11acb89729196bcb46f2fe48ff1a59725b68f9ee.png";

export default function DownloadsPage() {
  const navigate = useNavigate();
  const [activeDownloads, setActiveDownloads] = useState([
    { id: 1, name: "React", version: "v18.3 Core", size: "4.2 MB", total: "12 GB left", progress: 35, speed: "7.4 mb/s", isPaused: false },
  ]);
  const [queuedDownloads] = useState([
    { id: 2, name: "Rust", version: "Queued", desc: "Waiting for previous download...", icon: imgRustIcon },
  ]);

  const recentArchives = [
    { id: 1, name: "Hyper-V Virtualization Core", version: "v0.8.2-Patch", size: "1842.8 MB" },
    { id: 2, name: "PostgreSQL Optimized Cluster", version: "Production-Config", size: "2.1 GB" },
    { id: 3, name: "AWS Lambda Runtime Env", version: "Node.js 18.x v2", size: "345.8 MB" },
  ];

  const togglePause = (id: number) => {
    setActiveDownloads(downloads =>
      downloads.map(d => d.id === id ? { ...d, isPaused: !d.isPaused } : d)
    );
  };

  return (
    <div className="bg-[#0e0e0e] relative w-full min-h-screen overflow-y-auto pb-[100px]">
      {/* Header */}
      <div className="bg-[#0e0e0e] relative w-full z-[3] px-[24px] py-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex gap-[16px] items-center">
            <button onClick={() => navigate(-1)} className="size-[18px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                <path d="M11 14L7 9L11 4" stroke="#72FE8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[24px] text-white tracking-[-1.2px] leading-[32px]">
              DevMarket
            </div>
          </div>
          <button onClick={() => navigate("/library")} className="bg-[#262626] overflow-clip relative rounded-[12px] shrink-0 size-[40px] border-2 border-[#72fe8f]">
            <img alt="Profile" className="absolute left-0 max-w-none size-full top-0" src={imgProfileAvatar} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[24px] pt-[24px] flex flex-col gap-[32px]">
        {/* Storage Status & Hero */}
        <div className="bg-[#131313] relative rounded-[8px] p-[24px]">
          <div className="flex flex-col gap-[16px]">
            <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[48px] text-white tracking-[-1.2px] leading-[48px]">
              Downloads
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <div className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#adaaaa] text-[16px] leading-[24px]">
                  Disk Space
                </div>
                <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#72fe8f] text-[16px] leading-[24px]">
                  12.4 GB / 50 GB
                </div>
              </div>
              <div className="bg-[#262626] h-[8px] overflow-clip relative rounded-[12px] w-full">
                <div className="absolute bg-gradient-to-r from-[#72fe8f] inset-[0_75.2%_0_0] to-[#1cb853]" />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-[16px] pt-[8px]">
              <button className="flex gap-[8px] items-center px-[24px] py-[12px] rounded-[8px]" style={{ backgroundImage: "linear-gradient(150.242deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}>
                <div className="h-[22px] w-[15px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 22">
                    <path d={svgPaths.p3cbfd880} fill="#005F26" />
                  </svg>
                </div>
                <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#005f26] text-[16px] leading-[24px]">
                  Update All
                </div>
              </button>
              <button className="bg-[#262626] flex gap-[8px] items-center px-[24px] py-[12px] rounded-[8px] border border-[rgba(72,72,71,0.15)]">
                <div className="size-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p21276080} fill="white" />
                  </svg>
                </div>
                <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-white text-[16px] leading-[24px]">
                  Pause All
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Active Transmissions */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white leading-[28px]">
              Active Transmissions
            </div>
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
              {activeDownloads.length + queuedDownloads.length} Items Remaining
            </div>
          </div>

          {/* Active Downloads */}
          {activeDownloads.map((download) => (
            <div key={download.id} className="bg-[#131313] relative rounded-[16px] p-[20px] flex flex-col gap-[16px]">
              <div className="flex gap-[16px] items-start">
                <div className="bg-[#262626] flex items-center justify-center relative rounded-[12px] shrink-0 size-[56px]">
                  <img alt={download.name} className="size-full rounded-[12px]" src={imgReactIcon} />
                </div>
                <div className="flex flex-[1_0_0] flex-col gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[16px] text-white leading-[24px]">
                    {download.name}
                  </div>
                  <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
                    {download.version} • {download.size} x {download.total}
                  </div>
                </div>
                <div className="flex gap-[12px] items-center">
                  <button onClick={() => togglePause(download.id)} className="size-[20px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      {download.isPaused ? (
                        <path d="M6 4L14 10L6 16V4Z" fill="white" />
                      ) : (
                        <path d={svgPaths.p21276080} fill="white" />
                      )}
                    </svg>
                  </button>
                  <button className="size-[20px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <path d="M15 5L5 15M5 5L15 15" stroke="#FF7351" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="flex flex-col gap-[8px]">
                <div className="bg-[#262626] h-[6px] overflow-clip relative rounded-[9999px] w-full">
                  <div className="absolute h-full left-0 rounded-[9999px] shadow-[0px_0px_15px_0px_rgba(114,254,143,0.4)]" style={{ width: `${download.progress}%`, backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }} />
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">
                    {download.progress}% • {download.speed}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Queued Downloads */}
          {queuedDownloads.map((download) => (
            <div key={download.id} className="bg-[#131313] relative rounded-[16px] p-[20px] flex items-center justify-between">
              <div className="flex gap-[16px] items-start">
                <div className="bg-[#262626] flex items-center justify-center relative rounded-[12px] shrink-0 size-[56px]">
                  <img alt={download.name} className="size-full rounded-[12px]" src={download.icon} />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[16px] text-white leading-[24px]">
                    {download.name}
                  </div>
                  <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
                    {download.desc}
                  </div>
                </div>
              </div>
              <div className="flex gap-[12px] items-center">
                <button className="size-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d="M6 4L14 10L6 16V4Z" fill="#72FE8F" />
                  </svg>
                </button>
                <button className="size-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d="M15 5L5 15M5 5L15 15" stroke="#FF7351" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Archives */}
        <div className="flex flex-col gap-[16px] pt-[16px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white leading-[28px]">
              Recent Archives
            </div>
            <button className="font-['Inter:Regular',sans-serif] font-normal text-[#72fe8f] text-[14px] leading-[20px]">
              Clear History
            </button>
          </div>

          {/* Table Header */}
          <div className="flex items-center justify-between py-[12px] border-b border-[#262626]">
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] uppercase tracking-[1.2px] leading-[16px]">
              Asset Name
            </div>
            <div className="flex gap-[64px]">
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] uppercase tracking-[1.2px] leading-[16px] w-[48px]">
                Size
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] uppercase tracking-[1.2px] leading-[16px] w-[56px]">
                Action
              </div>
            </div>
          </div>

          {/* Archive Items */}
          {recentArchives.map((archive) => (
            <div key={archive.id} className="flex items-center justify-between py-[16px] border-b border-[#262626]">
              <div className="flex gap-[16px] items-center">
                <div className="bg-[#262626] flex items-center justify-center relative rounded-[8px] shrink-0 size-[40px]">
                  <div className="h-[20px] w-[20px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V7L13 2Z" stroke="#88EBFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13 2V7H16" stroke="#88EBFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-white leading-[20px]">
                    {archive.name}
                  </div>
                  <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[11px] leading-[16px]">
                    {archive.version}
                  </div>
                </div>
              </div>
              <div className="flex gap-[64px] items-center">
                <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px] w-[48px]">
                  {archive.size}
                </div>
                <button className="bg-[#131313] flex h-[32px] items-center justify-center rounded-[9999px] w-[56px] border border-[rgba(255,255,255,0.05)]">
                  <div className="h-[16px] w-[16px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                      <path d="M13.5 6.5L8 12L2.5 6.5" stroke="#ADAAAA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
