import { useNavigate } from "react-router";

const IMG = {
  instagram: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=250&fit=crop",
  clashOfClans: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
  snapshot: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=250&fit=crop",
  profileAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
};

const categories = [
  { id: 1, name: "Popular apps", color: "#72FE8F" },
  { id: 2, name: "Business tools", color: "#88EBFF" },
  { id: 3, name: "Social Media", color: "#7CFBB5" },
  { id: 4, name: "Games", color: "#FF7351" },
  { id: 5, name: "AI Categories", color: "#FFC876" },
];

const collections = [
  { id: 1, name: "Instagram", price: "Free", desc: "Photo and Video Sharing", image: IMG.instagram },
  { id: 2, name: "Clash of Clans", price: "Free", desc: "Intense Real-time Battles", image: IMG.clashOfClans },
  { id: 3, name: "Snapshot", price: "Free", desc: "Camera and Multimedia", image: IMG.snapshot },
];

export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-full overflow-y-auto pb-[24px] transition-colors">
      {/* Main Content */}
      <div className="px-[24px] pt-[24px] flex flex-col gap-[32px]">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="bg-white dark:bg-[#1a1a1a] shadow-sm dark:shadow-none h-[64px] rounded-[16px] w-full transition-colors border border-gray-200 dark:border-transparent">
            <input type="text" placeholder="Search Apps & Games"
              className="bg-transparent pl-[56px] pr-[24px] py-[20px] size-full rounded-[inherit] font-['Plus_Jakarta_Sans',sans-serif] font-medium text-[16px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[rgba(173,170,170,0.5)] outline-none" />
          </div>
          <div className="absolute bottom-[23px] left-[23px] top-[23px] w-[18px] pointer-events-none text-gray-400 dark:text-[#ADAAAA]">
            <svg className="block size-full" fill="none" viewBox="0 0 18 18">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M15 15L12.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Browse Categories */}
        <div className="flex flex-col gap-[16px]">
          <div className="px-[8px]">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-gray-500 dark:text-[#adaaaa] text-[12px] tracking-[2.4px] uppercase leading-[16px]">Browse Categories</div>
          </div>
          <div className="flex flex-col gap-[8px]">
            {categories.map((category) => (
              <button key={category.id} onClick={() => navigate(`/search?category=${category.id}`)} className="rounded-[16px] w-full hover:bg-white dark:hover:bg-[#131313] transition-colors p-[8px]">
                <div className="flex gap-[16px] items-center px-[8px] py-[8px]">
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] flex items-center justify-center rounded-[12px] shrink-0 size-[48px] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                      <rect width="20" height="20" rx="4" fill={category.color} opacity="0.2" />
                      <circle cx="10" cy="10" r="4" fill={category.color} />
                    </svg>
                  </div>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] text-gray-900 dark:text-white leading-[28px]">{category.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* No results state */}
        <div className="flex flex-col gap-[24px] items-center py-[32px]">
          <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" stroke="#10b981" strokeWidth="2" strokeDasharray="8 8" className="dark:stroke-[#72FE8F]" />
            <circle cx="32" cy="32" r="20" stroke="#10b981" strokeWidth="2" className="dark:stroke-[#72FE8F]" />
            <path d="M48 48L60 60" stroke="#10b981" strokeWidth="2" strokeLinecap="round" className="dark:stroke-[#72FE8F]" />
          </svg>
          <div className="flex flex-col gap-[12px] items-center">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[24px] text-center text-gray-900 dark:text-white leading-[32px]">No results yet</div>
            <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[14px] text-center leading-[20px] max-w-[300px]">Try searching for an app or browsing by categories above to start exploring DevMarket.</div>
          </div>
        </div>

        {/* Curated Collections */}
        <div className="flex flex-col gap-[24px]">
          <div className="px-[8px]">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-gray-500 dark:text-[#adaaaa] text-[12px] tracking-[2.4px] uppercase leading-[16px]">Curated Collections</div>
          </div>
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[30px] text-gray-900 dark:text-white leading-[36px] px-[8px]">New & Notable</div>
          <div className="flex flex-col gap-[24px]">
            {collections.map((item) => (
              <button key={item.id} onClick={() => navigate(`/app/${item.name.toLowerCase().replace(/\s+/g, '-')}`)} className="flex flex-col gap-[16px] w-full group">
                <div className="h-[180px] relative rounded-[24px] w-full overflow-hidden shadow-sm dark:shadow-none transition-shadow group-hover:shadow-md">
                  <img alt={item.name} className="size-full object-cover transition-transform group-hover:scale-105" src={item.image} />
                  <div className="absolute bg-gradient-to-t from-black/80 inset-0 to-transparent" />
                </div>
                <div className="flex items-center justify-between w-full px-[8px]">
                  <div className="flex flex-col gap-[4px] items-start">
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] text-gray-900 dark:text-white leading-[24px]">{item.name}</div>
                    <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[12px] leading-[16px]">{item.desc}</div>
                  </div>
                  <div className="bg-gray-200 dark:bg-[#262626] flex items-center px-[12px] py-[6px] rounded-full transition-colors">
                    <div className="font-['Inter',sans-serif] text-emerald-600 dark:text-[#72fe8f] text-[12px] leading-[16px] font-bold">{item.price}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
