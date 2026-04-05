import { useNavigate } from "react-router";

const IMG = {
  userProfile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
  nexusIDE: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
  synthDeploy: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
};

const recentlyUsed = [
  { id: "nexus-ide", name: "Nexus IDE Pro", version: "v8.2.4 patch", size: "4.2 GB", image: IMG.nexusIDE },
  { id: "synthdeploy", name: "SynthDeploy", version: "Serverless Core", size: "1.8 GB", image: IMG.synthDeploy },
];

const allApps = [
  { name: "Tornadio", tool: "Real-time SDK", updated: "Updated 3d ago", size: "1.8 GB" },
  { name: "Vechlion", tool: "Dev Toolkit", updated: "Updated 5d ago", size: "3.4 GB" },
  { name: "APIHorn", tool: "API Manager", updated: "Updated 1w ago", size: "826 MB" },
  { name: "NexusQL", tool: "DB Manager", updated: "Updated 2w ago", size: "512 MB" },
];

export default function LibraryPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-full overflow-y-auto pb-[24px] transition-colors">
      {/* Main Content */}
      <div className="px-[24px] pt-[24px] flex flex-col gap-[48px]">
        <div className="flex flex-col gap-[16px]">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[48px] text-gray-900 dark:text-white tracking-[-1.2px] leading-[48px]">Your Library</div>
          <div className="font-['Plus_Jakarta_Sans',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[18px] leading-[28px]">Curated tools, integrated environments, and the building blocks of your next breakthrough.</div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-[16px]">
          <div className="bg-white dark:bg-[#131313] shadow-sm dark:shadow-none rounded-[16px] p-[32px] flex flex-col gap-[16px] transition-colors">
            <div className="flex gap-[8px] items-center">
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><rect width="18" height="18" rx="4" fill="#0ea5e9" className="dark:fill-[#88EBFF]" opacity="0.2" /><circle cx="9" cy="9" r="4" fill="#0ea5e9" className="dark:fill-[#88EBFF]" /></svg>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sky-500 dark:text-[#88ebff] text-[12px] tracking-[1.2px] uppercase leading-[16px]">Library Insights</div>
            </div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[36px] text-gray-900 dark:text-white leading-[40px]">24.8 GB<br/><span className="text-[20px] text-gray-400 dark:text-[#adaaaa]">Optimized</span></div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[14px] leading-[20px]">Local compression enabled via intelligent asset caching and module tree-shaking analysis</div>
            <button onClick={() => navigate("/downloads")} className="flex h-[48px] items-center justify-center rounded-[12px] mt-[8px] hover:opacity-90 transition-opacity" style={{ backgroundImage: "linear-gradient(135deg, #72FE8F 0%, #1CB853 100%)" }}>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#002a0c] text-[16px] px-[32px] leading-[20px]">Manage Storage</div>
            </button>
          </div>
          <div className="bg-white dark:bg-[#131313] shadow-sm dark:shadow-none rounded-[16px] p-[32px] flex flex-col gap-[16px] transition-colors">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-medium text-gray-500 dark:text-[#adaaaa] text-[16px] leading-[24px]">Uptime Status</div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-emerald-500 dark:text-[#72fe8f] text-[48px] opacity-90 leading-[48px]">99.9<span className="text-[20px]">%</span></div>
            <div className="flex gap-[4px] h-[8px]">
              {[1,2,3,4].map(i=><div key={i} className="bg-emerald-400 dark:bg-[#72fe8f] flex-1 h-full rounded-[12px]" />)}
              <div className="bg-emerald-100 dark:bg-[rgba(28,184,83,0.3)] flex-1 h-full rounded-[12px]" />
            </div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] tracking-[1.2px] uppercase leading-[16px]">Active Services Health</div>
          </div>
        </div>

        {/* Recently Used */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[20px] text-gray-900 dark:text-white leading-[28px]">Recently Used</div>
            <button onClick={() => navigate("/downloads")} className="font-['Inter',sans-serif] text-emerald-600 dark:text-[#72fe8f] text-[14px] leading-[20px]">See All History</button>
          </div>
          <div className="flex flex-col gap-[24px]">
            {recentlyUsed.map((app) => (
              <button key={app.id} onClick={() => navigate(`/app/${app.id}`)} className="flex flex-col gap-[16px] w-full group">
                <div className="h-[180px] relative rounded-[24px] w-full overflow-hidden shadow-sm dark:shadow-none group-hover:shadow-md transition-shadow">
                  <img alt={app.name} className="size-full object-cover transition-transform group-hover:scale-105" src={app.image} />
                  <div className="absolute bg-gradient-to-t from-black/80 inset-0 to-transparent" />
                </div>
                <div className="flex items-start justify-between px-[8px]">
                  <div className="flex flex-col gap-[4px] items-start">
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] text-gray-900 dark:text-white leading-[24px]">{app.name}</div>
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{app.version}</div>
                  </div>
                  <button className="bg-emerald-500 dark:bg-[#1cb853] hover:bg-emerald-600 dark:hover:bg-[#169a45] transition-colors flex h-[32px] items-center justify-center px-[16px] rounded-full" onClick={(e)=>{e.stopPropagation()}}>
                    <div className="font-['Inter',sans-serif] text-white dark:text-[#002a0c] font-medium text-[12px] leading-[16px]">Open</div>
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Apps */}
        <div className="flex flex-col gap-[24px] pt-[24px]">
          <div className="flex items-center justify-between">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[20px] text-gray-900 dark:text-white leading-[28px]">All Apps</div>
            <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[14px] leading-[20px]">Tools • Plugins • Assets</div>
          </div>
          <div className="flex items-center justify-between py-[12px] border-b border-gray-200 dark:border-[#262626]">
            <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] uppercase tracking-[1.2px]">App Name</div>
            <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] uppercase tracking-[1.2px]">Size</div>
          </div>
          {allApps.map((app, idx) => (
            <button key={idx} onClick={() => navigate(`/app/${app.name.toLowerCase()}`)} className="flex items-center justify-between py-[16px] border-b border-gray-200 dark:border-[#262626] hover:bg-white dark:hover:bg-[#131313] transition-colors -mx-[12px] px-[12px] rounded-[16px]">
              <div className="flex gap-[16px] items-center">
                <div className="bg-gray-100 dark:bg-[#262626] flex items-center justify-center rounded-[12px] shrink-0 size-[48px] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#10b981" className="dark:fill-[#72FE8F]" opacity="0.2" /><circle cx="12" cy="12" r="4" fill="#10b981" className="dark:fill-[#72FE8F]" /></svg>
                </div>
                <div className="flex flex-col gap-[4px] items-start">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-gray-900 dark:text-white leading-[20px]">{app.name}</div>
                  <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{app.tool} • {app.updated}</div>
                </div>
              </div>
              <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{app.size}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
