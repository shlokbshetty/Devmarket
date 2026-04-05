import { useNavigate } from "react-router";
import BottomNav from "../components/BottomNav";
import svgPaths from "../../imports/svg-1vynxnf5kv";
import imgFeaturedHero from "figma:asset/89f80b8ef9ceebcefdd37fb5a8118f68dad281a1.png";
import imgGuardRailAI from "figma:asset/aaba12d49f03b63a4db1415e754c606c1a21ef00.png";
import imgCodeFlow from "figma:asset/8160b3be89916775d61596a406488eeb3e21baa1.png";
import imgVoidRunner from "figma:asset/cce662aede19bd5ea1d20619223eb02bdd5497bb.png";
import imgPrismDesign from "figma:asset/51a5ca764ef06e4eb47cdf8410b699e7a1c1fe30.png";
import imgServerPro from "figma:asset/dbccb7d826029370d8c320df7cd08cbc260c3723.png";
import imgAppname from "figma:asset/142561473410a07b0f6ff4fc43b957bbc4835d12.png";
import imgProfileAvatar from "figma:asset/11acb89729196bcb46f2fe48ff1a59725b68f9ee.png";

const trendingApps = [
  { id: "guardail-ai", name: "GuardRail AI", category: "Security & Audit", price: "FREE", rating: "4.9", image: imgGuardRailAI },
  { id: "codeflow", name: "CodeFlow", category: "Productivity", price: "$9.99", rating: "4.7", image: imgCodeFlow },
  { id: "void-runner", name: "Void Runner", category: "Games", price: "$14.99", rating: "4.6", image: imgVoidRunner },
  { id: "prism-design", name: "Prism Design", category: "Creative Tools", price: "$49.99", rating: "4.8", image: imgPrismDesign },
  { id: "serverpro", name: "ServerPro", category: "Developer", price: "$6.99", rating: "4.8", image: imgServerPro },
  { id: "appname", name: "Appname", category: "Utility", price: "$3.99", rating: "4.5", image: imgAppname },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0e0e0e] relative w-full min-h-screen overflow-y-auto pb-[100px]">
      {/* Header */}
      <div className="backdrop-blur-[10px] bg-[rgba(14,14,14,0.8)] content-stretch flex h-[64px] items-center justify-between sticky top-0 w-full z-10 px-[24px] shadow-[0px_0px_40px_0px_rgba(114,254,143,0.08)]">
        <div className="content-stretch flex gap-[12px] items-center">
          <div className="relative shrink-0 size-[16px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p300a1100} fill="#72FE8F" />
            </svg>
          </div>
          <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white tracking-[-0.5px]">
            DevMarket
          </div>
        </div>
        <button onClick={() => navigate("/library")} className="bg-[#262626] overflow-clip relative rounded-full shrink-0 size-[32px]">
          <img alt="Profile" className="absolute left-0 max-w-none size-full top-0" src={imgProfileAvatar} />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-[24px] pt-[24px]">
        {/* Featured Header */}
        <div className="flex items-end justify-between mb-[24px]">
          <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[36px] text-white tracking-[-0.9px] leading-[36px]">
            Featured
          </div>
          <button onClick={() => navigate("/search")} className="font-['Inter:Regular',sans-serif] font-normal text-[#72fe8f] text-[12px] tracking-[1.2px] leading-[16px]">
            VIEW ALL
          </button>
        </div>

        {/* Featured Large Card */}
        <button
          onClick={() => navigate("/app/synthcode-pro")}
          className="bg-[#20201f] h-[213.75px] overflow-clip relative rounded-[32px] w-full mb-[16px]"
        >
          <div className="absolute inset-0 opacity-60">
            <img alt="" className="absolute h-[160%] left-0 max-w-none top-[-30%] w-full" src={imgFeaturedHero} />
          </div>
          <div className="absolute bg-gradient-to-t from-black inset-0 to-[rgba(0,0,0,0)] via-1/2 via-[rgba(0,0,0,0.4)]" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[6.8px] pb-[18px] pt-[32px] px-[32px]">
            <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[36px] text-white leading-[45px]">
              SynthCode Pro
            </div>
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] leading-[22.75px] max-w-[448px]">
              The ultimate visual IDE for creative developers. Build immersive experiences with zero friction.
            </div>
            <div className="flex h-[42px] items-center justify-center px-[32px] py-[12px] rounded-[9999px] mt-2" style={{ backgroundImage: "linear-gradient(136.503deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#002a0c] text-[14px] leading-[20px]">
                Download Now
              </div>
            </div>
          </div>
        </button>

        {/* New Arrivals & Pro Bundle Cards */}
        <div className="flex flex-col gap-[16px] mb-[24px]">
          {/* New Arrivals */}
          <button
            onClick={() => navigate("/search")}
            className="bg-[#20201f] relative rounded-[32px] w-full p-[32px]"
          >
            <div className="flex flex-col gap-[8px]">
              <div className="h-[30px] w-[30px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.0701 30.1058">
                  <path d={svgPaths.p277ab000} fill="#72FE8F" />
                </svg>
              </div>
              <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white leading-[28px]">
                New Arrivals
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[19.5px]">
                Be amongst the first ones to try the new arrivals!
              </div>
            </div>
            <div className="flex justify-end mt-[16px]">
              <div className="size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1a406200} fill="white" />
                </svg>
              </div>
            </div>
          </button>

          {/* Pro Bundle */}
          <button
            onClick={() => navigate("/search")}
            className="bg-[#72fe8f] relative rounded-[32px] w-full p-[32px]"
          >
            <div className="flex flex-col gap-[8px]">
              <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#005f26] text-[20px] leading-[28px]">
                Pro Bundle
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[rgba(0,95,38,0.8)] leading-[19.5px]">
                Get 12 premium productivity tools in one exclusive dev pack.
              </div>
            </div>
            <div className="flex items-center justify-between mt-[16px]">
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#005f26] text-[24px] leading-[32px]">
                $49
              </div>
              <div className="h-[20px] w-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
                  <path d={svgPaths.p3faf9100} fill="#005F26" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex gap-[12px] overflow-x-auto py-[8px] mb-[24px]">
          <div className="bg-[#1cb853] flex items-center justify-center px-[24px] py-[10px] rounded-[9999px] shrink-0">
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#002a0c] text-[14px]">All</div>
          </div>
          {['Games', 'Productivity', 'Design', 'Utilities', 'Security', 'Social'].map((cat) => (
            <div key={cat} className="bg-[#20201f] flex items-center justify-center px-[24px] py-[10px] rounded-[9999px] shrink-0">
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px]">{cat}</div>
            </div>
          ))}
        </div>

        {/* Trending Now Section */}
        <div className="flex flex-col gap-[4px] mb-[24px]">
          <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[30px] text-white leading-[36px]">
            Trending Now
          </div>
          <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] leading-[20px]">
            What developers are using this week
          </div>
        </div>

        {/* Trending Apps List */}
        <div className="flex flex-col gap-[16px]">
          {trendingApps.map((app) => (
            <button
              key={app.id}
              onClick={() => navigate(`/app/${app.id}`)}
              className="flex gap-[20px] items-center w-full"
            >
              <div className="flex items-center justify-center shrink-0 size-[80px] rounded-[16px] overflow-hidden bg-[#262626]">
                <img alt={app.name} className="size-full object-cover" src={app.image} />
              </div>
              <div className="flex flex-[1_0_0] flex-col items-start gap-[4px]">
                <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[16px] text-white leading-[24px]">
                  {app.name}
                </div>
                <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
                  {app.category}
                </div>
                <div className="flex gap-[8px] items-center pt-[4px]">
                  <div className="bg-[#262626] flex items-center px-[8px] py-[2px] rounded-[4px]">
                    <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[10px] leading-[15px]">
                      {app.price}
                    </div>
                  </div>
                  <div className="flex gap-[4px] items-center">
                    <div className="h-[9.5px] w-[10px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 9.5">
                        <path d={svgPaths.p197ced20} fill="#72FE8F" />
                      </svg>
                    </div>
                    <div className="font-['Inter:Regular',sans-serif] font-normal text-[#72fe8f] text-[10px] leading-[15px]">
                      {app.rating}
                    </div>
                  </div>
                </div>
              </div>
              <div className="size-[16px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                  <path d={svgPaths.p1c92c780} fill="#ADAAAA" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
