import { useNavigate } from "react-router";
import BottomNav from "../components/BottomNav";
import svgPaths from "../../imports/svg-jwm54fo20u";
import imgUserProfile from "figma:asset/71a0ace83d9cc5c7f12edc02af08c0b4d12dbd63.png";
import imgNexusIDE from "figma:asset/f0e4ab6dfc10a7457c9e188954dc763933a01c87.png";
import imgSynthDeploy from "figma:asset/d3cacca709f600d55c1a9394a436ac5d764bec39.png";

export default function LibraryPage() {
  const navigate = useNavigate();

  const recentlyUsed = [
    { id: "nexus-ide", name: "Nexus IDE Pro", version: "v8.2.4 patch", size: "4.2 GB", image: imgNexusIDE },
    { id: "synthdeploy", name: "SynthDeploy", version: "Serverless Core", size: "1.8 GB", image: imgSynthDeploy },
  ];

  const allApps = [
    { name: "Tornadio", tool: "Real-time SDK", updated: "Updated 3d ago", size: "1.8 GB" },
    { name: "Vechlion", tool: "Dev Toolkit", updated: "Updated 5d ago", size: "3.4 GB" },
    { name: "APIHorn", tool: "API Manager", updated: "Updated 1w ago", size: "826 MB" },
    { name: "NexusQL", tool: "DB Manager", updated: "Updated 2w ago", size: "512 MB" },
  ];

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
          <button onClick={() => navigate("/library")} className="bg-[#1a1a1a] overflow-clip relative rounded-[12px] shrink-0 size-[40px]">
            <img alt="Profile" className="absolute left-0 max-w-none size-full top-0" src={imgUserProfile} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[24px] pt-[24px] flex flex-col gap-[48px]">
        {/* Header Section */}
        <div className="flex flex-col gap-[16px]">
          <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[48px] text-white tracking-[-1.2px] leading-[48px]">
            Your Library
          </div>
          <div className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#adaaaa] text-[18px] leading-[28px] max-w-[672px]">
            Curated tools, integrated environments, and the building blocks of your next breakthrough.
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-[16px]">
          {/* Storage Card */}
          <div className="bg-[#1a1a1a] relative rounded-[8px] p-[32px] flex flex-col gap-[16px]">
            <div className="flex gap-[8px] items-center">
              <div className="size-[18px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d={svgPaths.p4c2b800} fill="#88EBFF" />
                </svg>
              </div>
              <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#88ebff] text-[12px] tracking-[1.2px] uppercase leading-[16px]">
                Library Insights
              </div>
            </div>
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[36px] text-white leading-[40px]">
              24.8 GB<br />
              <span className="text-[20px] text-[#adaaaa]">Optimized</span>
            </div>
            <div className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] leading-[20px]">
              Local compression enabled via intelligent asset caching and module tree-shaking analysis
            </div>
            <button
              onClick={() => navigate("/downloads")}
              className="flex h-[48px] items-center justify-center rounded-[9999px] mt-[8px]"
              style={{ backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}
            >
              <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#002a0c] text-[16px] px-[32px] leading-[20px]">
                Manage Storage
              </div>
            </button>
          </div>

          {/* Uptime Card */}
          <div className="bg-[#1a1a1a] relative rounded-[8px] p-[32px] flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8.5px]">
              <div className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#adaaaa] text-[16px] leading-[24px]">
                Uptime Status
              </div>
              <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#72fe8f] text-[48px] opacity-90 leading-[48px]">
                99.9<span className="text-[20px]">%</span>
              </div>
            </div>
            <div className="flex flex-col gap-[7.5px] pt-[16px]">
              <div className="flex gap-[4px] h-[8px]">
                <div className="bg-[#72fe8f] flex-[1_0_0] h-full rounded-[12px]" />
                <div className="bg-[#72fe8f] flex-[1_0_0] h-full rounded-[12px]" />
                <div className="bg-[#72fe8f] flex-[1_0_0] h-full rounded-[12px]" />
                <div className="bg-[#72fe8f] flex-[1_0_0] h-full rounded-[12px]" />
                <div className="bg-[rgba(28,184,83,0.3)] flex-[1_0_0] h-full rounded-[12px]" />
              </div>
              <div className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] tracking-[1.2px] uppercase leading-[16px]">
                Active Services Health
              </div>
            </div>
          </div>
        </div>

        {/* Recently Used */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white leading-[28px]">
              Recently Used
            </div>
            <button onClick={() => navigate("/downloads")} className="font-['Inter:Regular',sans-serif] font-normal text-[#72fe8f] text-[14px] leading-[20px]">
              See All History
            </button>
          </div>

          {/* Recent App Cards */}
          <div className="flex flex-col gap-[24px]">
            {recentlyUsed.map((app) => (
              <button
                key={app.id}
                onClick={() => navigate(`/app/${app.id}`)}
                className="flex flex-col gap-[16px] w-full"
              >
                <div className="h-[180px] relative rounded-[16px] w-full overflow-hidden">
                  <img alt={app.name} className="size-full object-cover" src={app.image} />
                  <div className="absolute bg-gradient-to-t from-black/80 inset-0 to-transparent" />
                </div>
                <div className="flex items-start justify-between px-[8px]">
                  <div className="flex flex-col gap-[4px] items-start">
                    <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[18px] text-white leading-[24px]">
                      {app.name}
                    </div>
                    <div className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
                      {app.version}
                    </div>
                  </div>
                  <div className="flex gap-[16px] items-start">
                    <button className="bg-[#1cb853] flex h-[32px] items-center justify-center px-[16px] rounded-[9999px]">
                      <div className="font-['Inter:Regular',sans-serif] font-normal text-[#002a0c] text-[12px] leading-[16px]">
                        Open
                      </div>
                    </button>
                    <button className="flex items-center justify-center">
                      <div className="h-[16px] w-[16px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="1.5" fill="#ADAAAA" />
                          <circle cx="8" cy="3" r="1.5" fill="#ADAAAA" />
                          <circle cx="8" cy="13" r="1.5" fill="#ADAAAA" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Apps Section */}
        <div className="flex flex-col gap-[24px] pt-[24px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white leading-[28px]">
              All Apps
            </div>
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] leading-[20px]">
              Tools • Plugins • Assets
            </div>
          </div>

          {/* Table Header */}
          <div className="flex items-center justify-between py-[12px] border-b border-[#262626]">
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] uppercase tracking-[1.2px] leading-[16px]">
              App Name
            </div>
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] uppercase tracking-[1.2px] leading-[16px]">
              Size
            </div>
          </div>

          {/* App List */}
          <div className="flex flex-col gap-[4px]">
            {allApps.map((app, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/app/${app.name.toLowerCase()}`)}
                className="flex items-center justify-between py-[16px] border-b border-[#262626]"
              >
                <div className="flex gap-[16px] items-center">
                  <div className="bg-[#262626] flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]">
                    <div className="h-[24px] w-[24px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <rect width="24" height="24" rx="4" fill="#72FE8F" opacity="0.2" />
                        <circle cx="12" cy="12" r="4" fill="#72FE8F" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px] items-start">
                    <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[16px] text-white leading-[20px]">
                      {app.name}
                    </div>
                    <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
                      {app.tool} • {app.updated}
                    </div>
                  </div>
                </div>
                <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
                  {app.size}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
