import { useNavigate, useLocation } from "react-router";
import svgPaths from "../../imports/svg-o2x411qyq2";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="backdrop-blur-[10px] bg-[rgba(14,14,14,0.9)] fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(255,255,255,0.05)] shadow-[0px_-4px_40px_0px_rgba(0,0,0,0.3)]">
      <div className="content-stretch flex h-[84px] items-center justify-around max-w-[672px] mx-auto px-[24px]">
        {/* Home */}
        <button
          onClick={() => navigate("/")}
          className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 group"
          aria-label="Home"
        >
          <div className="h-[24px] relative shrink-0 w-[24px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke={isActive("/") ? "#72FE8F" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={isActive("/") ? "#72FE8F" : "none"}
              />
              <path
                d="M9 22V12H15V22"
                stroke={isActive("/") ? "#002A0C" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={`font-['Inter:Regular',sans-serif] font-normal text-[10px] ${isActive("/") ? "text-[#72FE8F]" : "text-[#ADAAAA]"}`}>
            Home
          </div>
        </button>

        {/* Search */}
        <button
          onClick={() => navigate("/search")}
          className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 group"
          aria-label="Search"
        >
          <div className="h-[24px] relative shrink-0 w-[24px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <circle
                cx="11"
                cy="11"
                r="8"
                stroke={isActive("/search") ? "#72FE8F" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 21L16.65 16.65"
                stroke={isActive("/search") ? "#72FE8F" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={`font-['Inter:Regular',sans-serif] font-normal text-[10px] ${isActive("/search") ? "text-[#72FE8F]" : "text-[#ADAAAA]"}`}>
            Search
          </div>
        </button>

        {/* Downloads */}
        <button
          onClick={() => navigate("/downloads")}
          className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 group"
          aria-label="Downloads"
        >
          <div className="h-[24px] relative shrink-0 w-[24px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                stroke={isActive("/downloads") ? "#72FE8F" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 10L12 15L17 10"
                stroke={isActive("/downloads") ? "#72FE8F" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15V3"
                stroke={isActive("/downloads") ? "#72FE8F" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={`font-['Inter:Regular',sans-serif] font-normal text-[10px] ${isActive("/downloads") ? "text-[#72FE8F]" : "text-[#ADAAAA]"}`}>
            Downloads
          </div>
        </button>

        {/* Library */}
        <button
          onClick={() => navigate("/library")}
          className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 group"
          aria-label="Library"
        >
          <div className="h-[24px] relative shrink-0 w-[24px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <path
                d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9L11 6H19C19.5304 6 20.0391 6.21071 20.4142 6.58579C20.7893 6.96086 21 7.46957 21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                stroke={isActive("/library") ? "#72FE8F" : "#ADAAAA"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={`font-['Inter:Regular',sans-serif] font-normal text-[10px] ${isActive("/library") ? "text-[#72FE8F]" : "text-[#ADAAAA]"}`}>
            Library
          </div>
        </button>
      </div>
    </div>
  );
}
