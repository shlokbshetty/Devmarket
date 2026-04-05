import { Search, Star, Download, ArrowRight, ShoppingBag } from "lucide-react";

const trendingApps = [
  { name: "GuardRail AI", category: "Security & Audit", type: "FREE", rating: 4.9, icon: "https://images.unsplash.com/photo-1614064641913-6b71a30f10e4?w=128&h=128&fit=crop" },
  { name: "CodeFlow", category: "Productivity", type: "$9.99", rating: 4.7, icon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=128&h=128&fit=crop" },
  { name: "Void Runner", category: "Games", type: "FREE", rating: 4.8, icon: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=128&h=128&fit=crop" },
  { name: "Prism Design", category: "Creative Tools", type: "$14.99", rating: 4.5, icon: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=128&h=128&fit=crop" },
  { name: "ServerPro", category: "DevOps", type: "FREE", rating: 4.6, icon: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=128&h=128&fit=crop" },
];

export function MobileHome() {
  return (
    <div className="w-full bg-gray-50 dark:bg-[#0a0a0a] pb-24 text-gray-900 dark:text-white p-4 space-y-6 transition-colors">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={18} />
        <input type="text" placeholder="Search apps, tools, and scripts..."
          className="w-full bg-white dark:bg-[#1a1a1a] rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 dark:focus:ring-[#34d399] transition-all border border-gray-200 dark:border-[#222]" />
      </div>

      {/* Featured */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-2xl font-extrabold tracking-tight">Featured</h1>
          <a href="#" className="text-emerald-600 dark:text-[#34d399] text-xs font-bold tracking-wider uppercase">View All</a>
        </div>
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-800 to-black p-5 flex flex-col justify-end min-h-[180px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] opacity-40 dark:opacity-30 mix-blend-overlay bg-cover bg-center"></div>
          <div className="relative z-10 text-white">
            <h2 className="text-2xl font-bold mb-1 drop-shadow-md">SynthCode Pro</h2>
            <p className="text-gray-200 dark:text-zinc-300 text-xs mb-4 leading-relaxed max-w-[220px] drop-shadow-md">The visual IDE for creative developers.</p>
            <button className="bg-[#34d399] text-black font-bold py-2 px-5 rounded-full text-xs hover:bg-[#2ebc87] transition-colors shadow-lg">Download Now</button>
          </div>
        </div>
      </section>

      {/* Banners */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-gray-200 dark:border-transparent dark:bg-[#222] rounded-2xl p-4 relative group cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-colors shadow-sm dark:shadow-none">
          <div className="text-emerald-500 dark:text-[#34d399] mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 3.82-13.82L13 2.5a2.18 2.18 0 0 1 2.91.09 2.18 2.18 0 0 1 .09 2.91L15.5 6A22 22 0 0 1 12 15z"></path></svg>
          </div>
          <h3 className="text-base font-bold mb-1">Arrivals</h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400 leading-tight">Try the new arrivals!</p>
          <ArrowRight className="absolute bottom-4 right-4 text-gray-400 dark:text-zinc-500" size={16} />
        </div>
        <div className="bg-[#59ff8b] rounded-2xl p-4 text-black relative flex flex-col justify-between cursor-pointer shadow-sm">
          <div><h3 className="text-base font-bold mb-1">Bundle</h3><p className="text-xs text-black/70 leading-tight mb-2">12 premium tools</p></div>
          <div className="flex items-center justify-between mt-auto"><span className="text-xl font-black tracking-tight">$49</span><ShoppingBag size={18} /></div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {["All", "Games", "Productivity", "Utilities", "Design"].map((cat, i) => (
          <button key={cat} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${i === 0 ? "bg-emerald-400 dark:bg-[#2ebc87] text-black border border-transparent" : "bg-white dark:bg-[#1a1a1a] text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] border border-gray-200 dark:border-[#222]"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Trending */}
      <section>
        <h2 className="text-xl font-bold mb-1">Trending Now</h2>
        <p className="text-gray-500 dark:text-zinc-400 text-xs mb-4">What developers are using this week</p>
        <div className="space-y-3">
          {trendingApps.map((app, i) => (
            <div key={i} className="flex items-center gap-3 group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-white dark:hover:bg-[#1a1a1a] transition-colors border border-transparent hover:border-gray-100 dark:hover:border-transparent hover:shadow-sm dark:hover:shadow-none">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#222] border border-gray-200 dark:border-[#333] shrink-0 p-0.5">
                <div className="w-full h-full rounded-lg bg-cover bg-center opacity-90 dark:opacity-80" style={{ backgroundImage: `url(${app.icon})` }}></div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate text-gray-900 dark:text-white">{app.name}</h4>
                <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1">{app.category}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${app.type === 'FREE' ? 'bg-gray-200 dark:bg-[#333] text-gray-700 dark:text-zinc-300' : 'bg-emerald-100 dark:bg-[#2ebc87]/20 text-emerald-700 dark:text-[#2ebc87]'}`}>{app.type}</span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-zinc-400 font-bold">
                    <Star className="text-emerald-500 dark:text-[#2ebc87] fill-emerald-500 dark:fill-[#2ebc87]" size={10} />{app.rating}
                  </div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white dark:bg-transparent border border-gray-200 dark:border-zinc-700 flex items-center justify-center text-gray-400 dark:text-zinc-400 group-hover:bg-emerald-400 dark:group-hover:bg-[#2ebc87] group-hover:text-black group-hover:border-emerald-400 dark:group-hover:border-[#2ebc87] transition-all shadow-sm dark:shadow-none">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
