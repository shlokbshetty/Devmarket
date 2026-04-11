import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { apiGet } from "../api/client.js";
import svgPaths from "../imports/svg-1vynxnf5kv.js";

const IMG = {
  featuredHero: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  guardRailAI: "https://images.unsplash.com/photo-1614064641913-6b71a30f10e4?w=128&h=128&fit=crop",
  codeFlow: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=128&h=128&fit=crop",
  voidRunner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=128&h=128&fit=crop",
  prismDesign: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=128&h=128&fit=crop",
  serverPro: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=128&h=128&fit=crop",
  appname: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop",
  profileAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
};

const trendingApps = [
  { id: "guardail-ai", name: "GuardRail AI", category: "Security & Audit", price: "FREE", rating: "4.9", image: IMG.guardRailAI },
  { id: "codeflow", name: "CodeFlow", category: "Productivity", price: "$9.99", rating: "4.7", image: IMG.codeFlow },
  { id: "void-runner", name: "Void Runner", category: "Games", price: "$14.99", rating: "4.6", image: IMG.voidRunner },
  { id: "prism-design", name: "Prism Design", category: "Creative Tools", price: "$49.99", rating: "4.8", image: IMG.prismDesign },
  { id: "serverpro", name: "ServerPro", category: "Developer", price: "$6.99", rating: "4.8", image: IMG.serverPro },
  { id: "appname", name: "Appname", category: "Utility", price: "$3.99", rating: "4.5", image: IMG.appname },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [liveApps, setLiveApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await apiGet("/apps");
        setLiveApps(res?.apps || []);
      } catch (err) {
        console.error("Failed to fetch apps:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-full overflow-y-auto pb-[24px] transition-colors">
      {/* Main Content */}
      <div className="px-[24px] pt-[24px]">
        {/* Featured Header */}
        <div className="flex items-end justify-between mb-[24px]">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[36px] text-gray-900 dark:text-white tracking-[-0.9px] leading-[36px]">Featured</div>
          <button onClick={() => navigate("/search")} className="font-['Inter',sans-serif] text-[#1ed760] dark:text-[#1ed760] text-[12px] tracking-[1.2px] leading-[16px]">VIEW ALL</button>
        </div>

        {/* Featured Large Card */}
        <button onClick={() => navigate("/app/synthcode-pro")} className="bg-white dark:bg-[#20201f] shadow-sm dark:shadow-none h-[214px] overflow-clip relative rounded-[32px] w-full mb-[16px] transition-colors">
          <div className="absolute inset-0 opacity-60">
            <img alt="" className="absolute h-[160%] left-0 max-w-none top-[-30%] w-full object-cover" src={IMG.featuredHero} />
          </div>
          <div className="absolute bg-gradient-to-t from-black inset-0 to-transparent via-[rgba(0,0,0,0.4)]" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[7px] pb-[18px] pt-[32px] px-[32px]">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[36px] text-white leading-[45px]">SynthCode Pro</div>
            <div className="font-['Inter',sans-serif] text-gray-300 dark:text-[#adaaaa] text-[14px] leading-[23px] max-w-[448px]">The ultimate visual IDE for creative developers. Build immersive experiences with zero friction.</div>
            <div className="flex h-[42px] items-center justify-center px-[32px] py-[12px] rounded-full mt-2" style={{ backgroundImage: "linear-gradient(136deg, #1ed760 0%, #1ed760 100%)" }}>
              <div className="font-['Inter',sans-serif] text-[#002a0c] text-[14px] leading-[20px] font-bold">Download Now</div>
            </div>
          </div>
        </button>

        {/* New Arrivals & Pro Bundle */}
        <div className="flex flex-col gap-[16px] mb-[24px]">
          <button onClick={() => navigate("/search")} className="bg-white dark:bg-[#20201f] shadow-sm dark:shadow-none rounded-[32px] w-full p-[32px] hover:bg-gray-100 dark:hover:bg-[#2c2c2c] transition-colors">
            <div className="flex flex-col gap-[8px]">
              <div className="h-[30px] w-[30px]">
                <svg className="block size-full" fill="none" viewBox="0 0 30.07 30.11"><path d={svgPaths.p277ab000} fill="#1ed760" /></svg>
              </div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[20px] text-gray-900 dark:text-white leading-[28px] text-left">New Arrivals</div>
              <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[20px] text-left">Be amongst the first ones to try the new arrivals!</div>
            </div>
            <div className="flex justify-end mt-[16px]">
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d={svgPaths.p1a406200} className="fill-gray-400 dark:fill-white" /></svg>
            </div>
          </button>
          
          <button onClick={() => navigate("/search")} className="bg-[#1ed760] dark:bg-[#1ed760] shadow-sm dark:shadow-none rounded-[32px] w-full p-[32px] hover:bg-[#1ed760] dark:hover:bg-[#5bde79] transition-colors">
            <div className="flex flex-col gap-[8px] text-left">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#000000] text-[20px] leading-[28px]">Pro Bundle</div>
              <div className="font-['Inter',sans-serif] text-[12px] text-[rgba(0,95,38,0.8)] leading-[20px]">Get 12 premium productivity tools in one exclusive dev pack.</div>
            </div>
            <div className="flex items-center justify-between mt-[16px]">
              <div className="font-['Inter',sans-serif] text-[#000000] text-[24px] leading-[32px] font-bold">$49</div>
              <svg width="16" height="20" fill="none" viewBox="0 0 16 20"><path d={svgPaths.p3faf9100} fill="#000000" /></svg>
            </div>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-[12px] overflow-x-auto py-[8px] mb-[24px] scrollbar-hide">
          <button onClick={() => navigate("/search")} className="bg-[#1ed760] dark:bg-[#1ed760] flex items-center justify-center px-[24px] py-[10px] rounded-full shrink-0 shadow-sm dark:shadow-none transition-colors">
            <div className="font-['Inter',sans-serif] text-white dark:text-[#002a0c] text-[14px]">All</div>
          </button>
          {['Games', 'Productivity', 'Design', 'Utilities', 'Security', 'Social'].map((cat) => (
            <button key={cat} onClick={() => navigate(`/search?category=${cat}`)} className="bg-white dark:bg-[#20201f] shadow-sm dark:shadow-none flex items-center justify-center px-[24px] py-[10px] rounded-full shrink-0 transition-colors">
              <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[14px]">{cat}</div>
            </button>
          ))}
        </div>

        {/* Trending Now Section */}
        <div className="flex flex-col gap-[4px] mb-[24px]">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[30px] text-gray-900 dark:text-white leading-[36px]">Trending Now</div>
          <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[14px] leading-[20px]">What developers are using this week</div>
        </div>

        {/* Trending Apps List */}
        <div className="flex flex-col gap-[16px]">
          {loading ? (
            <div className="text-center py-6 text-gray-500 dark:text-[#adaaaa]">Loading apps...</div>
          ) : liveApps.length > 0 ? (
            liveApps.map((app) => (
              <button key={app._id} onClick={() => navigate(`/app/${app._id}`)} className="flex gap-[20px] items-center w-full p-[8px] rounded-[24px] hover:bg-gray-100 dark:hover:bg-[#131313] transition-colors">
                <div className="flex items-center justify-center shrink-0 size-[80px] rounded-[16px] overflow-hidden bg-gray-200 dark:bg-[#262626]">
                  <img alt={app.name} className="size-full object-cover" src={app.screenshots?.[0] || IMG.appname} />
                </div>
                <div className="flex flex-1 flex-col items-start gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-gray-900 dark:text-white leading-[24px]">{app.name}</div>
                  <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{app.category || "Utility"}</div>
                  <div className="flex gap-[8px] items-center pt-[4px]">
                    <div className="bg-gray-200 dark:bg-[#262626] flex items-center px-[8px] py-[2px] rounded-[4px] transition-colors">
                      <div className="font-['Inter',sans-serif] text-gray-600 dark:text-[#adaaaa] text-[10px] leading-[15px]">Free</div>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 9.5"><path d={svgPaths.p197ced20} className="fill-[#1ed760] dark:fill-[#1ed760]" /></svg>
                      <div className="font-['Inter',sans-serif] text-[#1ed760] dark:text-[#1ed760] text-[10px] leading-[15px] font-bold">{app.averageRating || "4.8"}</div>
                    </div>
                  </div>
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d={svgPaths.p1c92c780} className="fill-gray-300 dark:fill-[#ADAAAA]" /></svg>
              </button>
            ))
          ) : (
            trendingApps.map((app) => (
              <button key={app.id} onClick={() => navigate(`/app/${app.id}`)} className="flex gap-[20px] items-center w-full p-[8px] rounded-[24px] hover:bg-gray-100 dark:hover:bg-[#131313] transition-colors">
                <div className="flex items-center justify-center shrink-0 size-[80px] rounded-[16px] overflow-hidden bg-gray-200 dark:bg-[#262626]">
                  <img alt={app.name} className="size-full object-cover" src={app.image} />
                </div>
                <div className="flex flex-1 flex-col items-start gap-[4px]">
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] text-gray-900 dark:text-white leading-[24px]">{app.name}</div>
                  <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{app.category}</div>
                  <div className="flex gap-[8px] items-center pt-[4px]">
                    <div className="bg-gray-200 dark:bg-[#262626] flex items-center px-[8px] py-[2px] rounded-[4px] transition-colors">
                      <div className="font-['Inter',sans-serif] text-gray-600 dark:text-[#adaaaa] text-[10px] leading-[15px]">{app.price}</div>
                    </div>
                    <div className="flex gap-[4px] items-center">
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 9.5"><path d={svgPaths.p197ced20} className="fill-[#1ed760] dark:fill-[#1ed760]" /></svg>
                      <div className="font-['Inter',sans-serif] text-[#1ed760] dark:text-[#1ed760] text-[10px] leading-[15px] font-bold">{app.rating}</div>
                    </div>
                  </div>
                </div>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d={svgPaths.p1c92c780} className="fill-gray-300 dark:fill-[#ADAAAA]" /></svg>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
