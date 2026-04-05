import { useNavigate } from "react-router";
import BottomNav from "../components/BottomNav";
import svgPaths from "../../imports/svg-u2k4te62sh";
import imgInstagram from "figma:asset/e069d85b4697c67f0b9032bee78ad76cc06d2876.png";
import imgClashOfClans from "figma:asset/5b8a8698c28295f2509617eaaed9617c362a9152.png";
import imgSnapshot from "figma:asset/902dee4b736d1502e55d797b44699fff96cdf8ed.png";
import imgProfileAvatar from "figma:asset/11acb89729196bcb46f2fe48ff1a59725b68f9ee.png";

const categories = [
  { id: 1, name: "Popular apps", icon: svgPaths.p39cfe380, color: "#72FE8F" },
  { id: 2, name: "Business tools", icon: svgPaths.p24c05900, color: "#88EBFF" },
  { id: 3, name: "Social Media", icon: svgPaths.p254c2600, color: "#7CFBB5" },
  { id: 4, name: "Games", icon: svgPaths.p6551200, color: "#FF7351" },
  { id: 5, name: "AI Categories", icon: svgPaths.p1c19e500, color: "#FFC876" },
];

const collections = [
  { id: 1, name: "Instagram", price: "Free", desc: "Photo and Video Sharing", image: imgInstagram },
  { id: 2, name: "Clash of Clans", price: "Free", desc: "Intense Real-time Battles", image: imgClashOfClans },
  { id: 3, name: "Snapshot", price: "Free", desc: "Camera and Multimedia", image: imgSnapshot },
];

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0e0e0e] relative w-full min-h-screen overflow-y-auto pb-[100px]">
      {/* Header */}
      <div className="backdrop-blur-[10px] bg-[rgba(14,14,14,0.8)] flex h-[64px] items-center justify-between sticky top-0 w-full z-10 px-[24px] shadow-[0px_0px_40px_0px_rgba(114,254,143,0.08)]">
        <div className="flex gap-[12px] items-center">
          <button onClick={() => navigate(-1)} className="size-[16px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8L10 4" stroke="#72FE8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white tracking-[-0.5px]">
            DevMarket
          </div>
        </div>
        <button onClick={() => navigate("/library")} className="bg-[#262626] overflow-clip relative rounded-full shrink-0 size-[32px]">
          <img alt="Profile" className="absolute left-0 max-w-none size-full top-0" src={imgProfileAvatar} />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-[24px] pt-[24px] flex flex-col gap-[32px]">
        {/* Search Bar */}
        <div className="flex flex-col relative w-full">
          <div className="bg-[#1a1a1a] h-[64px] relative rounded-[8px] w-full">
            <input
              type="text"
              placeholder="Search Apps & Games"
              className="bg-transparent flex items-center justify-center pl-[56px] pr-[24px] py-[20.5px] size-full rounded-[inherit] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[18px] text-white placeholder:text-[rgba(173,170,170,0.5)] outline-none"
            />
          </div>
          <div className="absolute bottom-[23px] left-[23px] top-[23px] w-[18px] pointer-events-none">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
              <path d={svgPaths.p8a35e00} fill="#ADAAAA" />
            </svg>
          </div>
        </div>

        {/* Browse Categories */}
        <div className="flex flex-col gap-[16px]">
          <div className="px-[8px]">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#adaaaa] text-[12px] tracking-[2.4px] uppercase leading-[16px]">
              Browse Categories
            </div>
          </div>

          {/* Category Links */}
          <div className="flex flex-col gap-[8px]">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/search?category=${category.id}`)}
                className="relative rounded-[8px] w-full hover:bg-[#131313] transition-colors"
              >
                <div className="flex gap-[16px] items-center p-[16px]">
                  <div className="bg-[#1a1a1a] flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]">
                    <div className="size-[19.3px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3 19.3">
                        <path d={category.icon} fill={category.color} />
                      </svg>
                    </div>
                  </div>
                  <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[18px] text-white leading-[28px]">
                    {category.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* No results state */}
        <div className="flex flex-col gap-[24px] items-center py-[32px]">
          <div className="size-[80px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="38" stroke="#72FE8F" strokeWidth="2" strokeDasharray="8 8" />
              <circle cx="32" cy="32" r="20" stroke="#72FE8F" strokeWidth="2" />
              <path d="M48 48L60 60" stroke="#72FE8F" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-[12px] items-center">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[24px] text-center text-white leading-[32px]">
              No results yet
            </div>
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] text-center leading-[20px] max-w-[300px]">
              Try searching for an app or browsing by categories above to start exploring DevMarket.
            </div>
          </div>
        </div>

        {/* Curated Collections */}
        <div className="flex flex-col gap-[24px]">
          <div className="px-[8px]">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#adaaaa] text-[12px] tracking-[2.4px] uppercase leading-[16px]">
              Curated Collections
            </div>
          </div>
          <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[30px] text-white leading-[36px]">
            New & Notable
          </div>

          {/* Collection Items */}
          <div className="flex flex-col gap-[24px]">
            {collections.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/app/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
                className="flex flex-col gap-[16px] w-full"
              >
                <div className="h-[180px] relative rounded-[16px] w-full overflow-hidden">
                  <img alt={item.name} className="size-full object-cover" src={item.image} />
                  <div className="absolute bg-gradient-to-t from-black/80 inset-0 to-transparent" />
                </div>
                <div className="flex items-center justify-between w-full px-[8px]">
                  <div className="flex flex-col gap-[4px] items-start">
                    <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[18px] text-white leading-[24px]">
                      {item.name}
                    </div>
                    <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[16px]">
                      {item.desc}
                    </div>
                  </div>
                  <div className="bg-[#262626] flex items-center px-[12px] py-[6px] rounded-[9999px]">
                    <div className="font-['Inter:Regular',sans-serif] font-normal text-[#72fe8f] text-[12px] leading-[16px]">
                      {item.price}
                    </div>
                  </div>
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
