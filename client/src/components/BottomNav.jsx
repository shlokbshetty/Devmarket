import { useNavigate } from "react-router";
import { useLocation } from "react-router";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="backdrop-blur-[20px] bg-white/85 dark:bg-[rgba(14,14,14,0.85)] shrink-0 z-50 shadow-[0px_-4px_40px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_-4px_40px_0px_rgba(0,0,0,0.3)] transition-colors border-t border-gray-100 dark:border-transparent">
      <div className="flex h-[72px] items-center justify-around px-[24px]">
        {/* Home */}
        <button onClick={() => navigate("/")} className="flex flex-col gap-[6px] items-center group" aria-label="Home">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" className={`${isActive("/") ? "stroke-emerald-500 fill-emerald-50 dark:stroke-[#72FE8F] dark:fill-[#72FE8F]" : "stroke-gray-400 fill-transparent dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 22V12H15V22" className={`${isActive("/") ? "stroke-emerald-600 dark:stroke-[#002A0C]" : "stroke-gray-400 dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wide text-[10px] transition-colors ${isActive("/") ? "text-emerald-600 dark:text-[#72FE8F]" : "text-gray-400 dark:text-[#adaaaa]"}`}>Home</div>
          {isActive("/") && <div className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-[#72FE8F] shadow-[0_0_10px_rgba(16,185,129,0.4)] dark:shadow-[0_0_10px_#72fe8f44]" />}
        </button>

        {/* Search */}
        <button onClick={() => navigate("/search")} className="flex flex-col gap-[6px] items-center group" aria-label="Search">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" className={`${isActive("/search") ? "stroke-emerald-500 dark:stroke-[#72FE8F]" : "stroke-gray-400 dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" />
            <path d="M21 21L16.65 16.65" className={`${isActive("/search") ? "stroke-emerald-500 dark:stroke-[#72FE8F]" : "stroke-gray-400 dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wide text-[10px] transition-colors ${isActive("/search") ? "text-emerald-600 dark:text-[#72FE8F]" : "text-gray-400 dark:text-[#adaaaa]"}`}>Search</div>
          {isActive("/search") && <div className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-[#72FE8F] shadow-[0_0_10px_rgba(16,185,129,0.4)] dark:shadow-[0_0_10px_#72fe8f44]" />}
        </button>

        {/* Downloads */}
        <button onClick={() => navigate("/downloads")} className="flex flex-col gap-[6px] items-center group" aria-label="Downloads">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" className={`${isActive("/downloads") ? "stroke-emerald-500 dark:stroke-[#72FE8F]" : "stroke-gray-400 dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10L12 15L17 10" className={`${isActive("/downloads") ? "stroke-emerald-500 dark:stroke-[#72FE8F]" : "stroke-gray-400 dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15V3" className={`${isActive("/downloads") ? "stroke-emerald-500 dark:stroke-[#72FE8F]" : "stroke-gray-400 dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wide text-[10px] transition-colors ${isActive("/downloads") ? "text-emerald-600 dark:text-[#72FE8F]" : "text-gray-400 dark:text-[#adaaaa]"}`}>Downloads</div>
          {isActive("/downloads") && <div className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-[#72FE8F] shadow-[0_0_10px_rgba(16,185,129,0.4)] dark:shadow-[0_0_10px_#72fe8f44]" />}
        </button>

        {/* Library */}
        <button onClick={() => navigate("/library")} className="flex flex-col gap-[6px] items-center group" aria-label="Library">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9L11 6H19C19.5304 6 20.0391 6.21071 20.4142 6.58579C20.7893 6.96086 21 7.46957 21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" className={`${isActive("/library") ? "stroke-emerald-500 dark:stroke-[#72FE8F]" : "stroke-gray-400 dark:stroke-[#adaaaa]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold tracking-wide text-[10px] transition-colors ${isActive("/library") ? "text-emerald-600 dark:text-[#72FE8F]" : "text-gray-400 dark:text-[#adaaaa]"}`}>Library</div>
          {isActive("/library") && <div className="w-1 h-1 rounded-full bg-emerald-500 dark:bg-[#72FE8F] shadow-[0_0_10px_rgba(16,185,129,0.4)] dark:shadow-[0_0_10px_#72fe8f44]" />}
        </button>
      </div>
    </div>
  );
}
