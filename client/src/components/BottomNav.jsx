import { useNavigate, useLocation } from "react-router";
import { hapticLight } from "../utils/nativeBridge.js";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleTabClick = (path) => {
    hapticLight();
    navigate(path);
  };

  return (
    <nav 
      aria-label="Bottom Navigation"
      className="backdrop-blur-[24px] bg-white/90 dark:bg-[#0e0e0e]/90 shrink-0 z-50 shadow-[0px_-4px_30px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_-4px_30px_0px_rgba(0,0,0,0.4)] transition-colors border-t border-gray-100 dark:border-[#1f1f1f] select-none"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
    >
      <div className="flex h-[64px] items-center justify-around px-4">
        {/* Home */}
        <button 
          onClick={() => handleTabClick("/")} 
          className="flex flex-col gap-1 items-center justify-center flex-1 py-1 group active:scale-95 transition-transform" 
          aria-label="Home"
        >
          <div className="relative">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                className={`${isActive("/") ? "stroke-[#1ed760] fill-[#1ed760]/15 dark:stroke-[#1ed760] dark:fill-[#1ed760]" : "stroke-gray-400 fill-transparent dark:stroke-[#8e8e8e]"} transition-colors`} 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              />
              <path d="M9 22V12H15V22" 
                className={`${isActive("/") ? "stroke-[#1ed760] dark:stroke-[#0e0e0e]" : "stroke-gray-400 dark:stroke-[#8e8e8e]"} transition-colors`} 
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
              />
            </svg>
          </div>
          <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[10px] tracking-wide transition-colors ${isActive("/") ? "text-[#1ed760]" : "text-gray-400 dark:text-[#8e8e8e]"}`}>Home</span>
          {isActive("/") && <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] shadow-[0_0_8px_#1ed760]" />}
        </button>

        {/* Search */}
        <button 
          onClick={() => handleTabClick("/search")} 
          className="flex flex-col gap-1 items-center justify-center flex-1 py-1 group active:scale-95 transition-transform" 
          aria-label="Search"
        >
          <div className="relative">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" className={`${isActive("/search") ? "stroke-[#1ed760] fill-[#1ed760]/10" : "stroke-gray-400 fill-transparent dark:stroke-[#8e8e8e]"} transition-colors`} strokeWidth="2" />
              <path d="M21 21L16.65 16.65" className={`${isActive("/search") ? "stroke-[#1ed760]" : "stroke-gray-400 dark:stroke-[#8e8e8e]"} transition-colors`} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[10px] tracking-wide transition-colors ${isActive("/search") ? "text-[#1ed760]" : "text-gray-400 dark:text-[#8e8e8e]"}`}>Search</span>
          {isActive("/search") && <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] shadow-[0_0_8px_#1ed760]" />}
        </button>

        {/* Downloads */}
        <button 
          onClick={() => handleTabClick("/downloads")} 
          className="flex flex-col gap-1 items-center justify-center flex-1 py-1 group active:scale-95 transition-transform" 
          aria-label="Downloads"
        >
          <div className="relative">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" className={`${isActive("/downloads") ? "stroke-[#1ed760]" : "stroke-gray-400 dark:stroke-[#8e8e8e]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 10L12 15L17 10" className={`${isActive("/downloads") ? "stroke-[#1ed760]" : "stroke-gray-400 dark:stroke-[#8e8e8e]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 15V3" className={`${isActive("/downloads") ? "stroke-[#1ed760]" : "stroke-gray-400 dark:stroke-[#8e8e8e]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[10px] tracking-wide transition-colors ${isActive("/downloads") ? "text-[#1ed760]" : "text-gray-400 dark:text-[#8e8e8e]"}`}>Downloads</span>
          {isActive("/downloads") && <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] shadow-[0_0_8px_#1ed760]" />}
        </button>

        {/* Library */}
        <button 
          onClick={() => handleTabClick("/library")} 
          className="flex flex-col gap-1 items-center justify-center flex-1 py-1 group active:scale-95 transition-transform" 
          aria-label="Library"
        >
          <div className="relative">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9L11 6H19C19.5304 6 20.0391 6.21071 20.4142 6.58579C20.7893 6.96086 21 7.46957 21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" className={`${isActive("/library") ? "stroke-[#1ed760] fill-[#1ed760]/10" : "stroke-gray-400 fill-transparent dark:stroke-[#8e8e8e]"} transition-colors`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[10px] tracking-wide transition-colors ${isActive("/library") ? "text-[#1ed760]" : "text-gray-400 dark:text-[#8e8e8e]"}`}>Library</span>
          {isActive("/library") && <span className="w-1.5 h-1.5 rounded-full bg-[#1ed760] shadow-[0_0_8px_#1ed760]" />}
        </button>
      </div>
    </nav>
  );
}
