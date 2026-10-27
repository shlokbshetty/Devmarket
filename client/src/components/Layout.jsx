import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, Home, UploadCloud, Shield,
  User, LogOut, ChevronRight, Briefcase, Settings as SettingsIcon,
  Search, Download, FolderOpen, Share2, Smartphone, Wifi, Battery
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "../context/AuthContext.jsx";
import BottomNav from "./BottomNav.jsx";
import { isNative, updateStatusBar, setupBackButtonListener, hapticLight } from "../utils/nativeBridge.js";

const DEFAULT_PIC = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256";

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(DEFAULT_PIC);
  const [currentTime, setCurrentTime] = useState("");
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, resolvedTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Status bar time update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Sync native status bar color with active theme
  useEffect(() => {
    const isDark = (resolvedTheme || theme) === 'dark';
    updateStatusBar(isDark);
  }, [theme, resolvedTheme]);

  // Handle hardware back button on Android
  useEffect(() => {
    const cleanup = setupBackButtonListener(navigate, isSidebarOpen, () => setSidebarOpen(false));
    return cleanup;
  }, [isSidebarOpen, navigate]);

  const toggleSidebar = () => {
    hapticLight();
    setSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    hapticLight();
    closeSidebar();
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Search", path: "/search", icon: <Search size={20} /> },
    { name: "Downloads", path: "/downloads", icon: <Download size={20} /> },
    { name: "Library", path: "/library", icon: <FolderOpen size={20} /> },
    ...(isAuthenticated ? [
      { name: "Profile", path: "/profile", icon: <User size={20} /> },
      ...(user?.role === 'developer' ? [{ name: "Upload APK", path: "/dev", icon: <UploadCloud size={20} /> }] : []),
    ] : []),
    ...(isAdmin ? [
      { name: "Admin Dashboard", path: "/admin", icon: <Shield size={20} /> },
    ] : []),
  ];

  // Detect marketplace pages for theming + bottom nav
  const marketplaceRoutes = ["/", "/search", "/downloads", "/library"];
  const isMarketplacePage = marketplaceRoutes.includes(location.pathname) || location.pathname.startsWith("/app/");
  const isAppDetailPage = location.pathname.startsWith("/app/") && !location.pathname.endsWith("/share");

  return (
    <div className="bg-neutral-100 dark:bg-black min-h-screen flex items-center justify-center w-full transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 
        Container behaves as edge-to-edge native full-screen on mobile (<640px or Capacitor native),
        and displays as a flagship smartphone frame preview on desktop monitors.
      */}
      <div 
        className={`w-full h-[100dvh] sm:max-w-[430px] sm:h-[880px] sm:max-h-[92vh] sm:rounded-[48px] sm:ring-1 sm:ring-black/10 dark:sm:ring-white/10 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] dark:sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative bg-white dark:bg-[#0e0e0e] text-gray-900 dark:text-white flex flex-col overflow-hidden transition-all duration-300`}
      >
        {/* Desktop simulated status bar (hidden on physical native devices) */}
        {!isNative && (
          <div className="hidden sm:flex items-center justify-between px-7 pt-3 pb-1 text-xs font-semibold text-gray-700 dark:text-gray-300 select-none z-40 bg-white dark:bg-[#0e0e0e]">
            <span>{currentTime || "09:41"}</span>
            {/* Dynamic island / speaker pill */}
            <div className="w-24 h-4 bg-black dark:bg-[#202020] rounded-full mx-auto" />
            <div className="flex items-center gap-1.5">
              <Wifi size={13} />
              <Battery size={14} className="fill-current" />
            </div>
          </div>
        )}

        {/* Top App Header */}
        <header 
          className={`flex items-center justify-between px-5 py-3.5 ${
            isMarketplacePage ? 'bg-white/85 dark:bg-[rgba(14,14,14,0.85)] backdrop-blur-[20px]' : 'bg-gray-50 dark:bg-[#131313]'
          } shrink-0 z-30 transition-colors border-b border-gray-100/60 dark:border-white/5 select-none`}
          style={{ paddingTop: isNative ? 'max(env(safe-area-inset-top, 0px), 12px)' : undefined }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-1.5 -ml-1.5 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-[#202020] active:scale-90 text-gray-900 dark:text-white"
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
            <Link to="/" onClick={() => hapticLight()} className="text-lg font-black tracking-tight flex items-center gap-2 text-gray-900 dark:text-white group">
              <div className="w-7 h-7 rounded-lg bg-[#1ed760]/15 dark:bg-[#1ed760]/20 flex items-center justify-center text-[#1ed760] group-hover:scale-105 transition-transform">
                <Briefcase size={16} className="text-[#1ed760]" />
              </div>
              <span>DevMarket</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {/* Share button only on App Detail pages */}
            {isAppDetailPage && (
              <button
                onClick={() => { hapticLight(); navigate(location.pathname + "/share"); }}
                className="p-1.5 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-[#202020] text-gray-500 dark:text-[#adaaaa] hover:text-gray-900 dark:hover:text-white"
                aria-label="Share App"
              >
                <Share2 size={19} />
              </button>
            )}

            {isAuthenticated ? (
              <button 
                onClick={() => { hapticLight(); navigate("/profile"); }} 
                className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#1ed760]/30 hover:ring-[#1ed760] transition-all active:scale-95"
                aria-label="User Profile"
              >
                <img src={profilePic} alt="User" className="w-full h-full object-cover" />
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => hapticLight()}
                className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#1ed760] text-black hover:opacity-90 active:scale-95 transition-all shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </header>

        {/* Slide-in Mobile Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="absolute inset-0 bg-black/60 z-[60] backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                className="absolute top-0 left-0 h-full w-[280px] bg-white dark:bg-[#161616] z-[70] flex flex-col shadow-2xl transition-colors"
                style={{ paddingTop: isNative ? 'max(env(safe-area-inset-top, 0px), 16px)' : undefined }}
              >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#131313] border-b border-gray-100 dark:border-white/5 transition-colors">
                  <div className="text-base font-black flex items-center gap-2 text-gray-900 dark:text-white">
                    <div className="w-6 h-6 rounded-md bg-[#1ed760]/20 flex items-center justify-center text-[#1ed760]">
                      <Briefcase size={14} />
                    </div>
                    DevMarket Mobile
                  </div>
                  <button onClick={closeSidebar} className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#252525] rounded-full transition-colors text-gray-500 dark:text-[#adaaaa]">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-4 flex flex-col gap-5 flex-1 overflow-y-auto scrollbar-hide">
                  {isAuthenticated && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1e1e1e] rounded-2xl border border-gray-100 dark:border-white/5 transition-colors">
                      <img src={profilePic} alt="Avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#1ed760]/40" />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-sm text-gray-900 dark:text-white truncate">{user?.name || 'User'}</div>
                        <div className="text-xs text-[#1ed760] font-semibold capitalize">{user?.role || 'user'} Account</div>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-1">
                    <div className="text-[11px] font-bold text-gray-400 dark:text-[#767575] uppercase tracking-wider mb-1 px-2">Navigation</div>
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link 
                          key={link.path} 
                          to={link.path} 
                          onClick={() => { hapticLight(); closeSidebar(); }}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all ${
                            isActive
                              ? "bg-[#1ed760]/15 text-[#1ed760] font-bold shadow-sm"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-[#adaaaa] dark:hover:text-white dark:hover:bg-[#202020] font-medium"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={isActive ? "text-[#1ed760]" : "text-gray-400 dark:text-[#8e8e8e]"}>{link.icon}</span>
                            <span>{link.name}</span>
                          </div>
                          {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#1ed760]" />}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Sidebar Footer */}
                <div 
                  className="p-4 bg-gray-50 dark:bg-[#131313] border-t border-gray-100 dark:border-white/5 flex flex-col gap-2 transition-colors"
                  style={{ paddingBottom: isNative ? 'max(env(safe-area-inset-bottom, 0px), 16px)' : undefined }}
                >
                  {isAuthenticated && (
                    <Link 
                      to="/settings" 
                      onClick={() => { hapticLight(); closeSidebar(); }}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors font-medium ${
                        location.pathname === "/settings"
                          ? "bg-[#1ed760]/10 text-[#1ed760] font-bold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-[#adaaaa] dark:hover:text-white dark:hover:bg-[#202020]"
                      }`}
                    >
                      <SettingsIcon size={18} /><span>Settings</span>
                    </Link>
                  )}
                  {isAuthenticated ? (
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10 transition-colors font-medium w-full text-left"
                    >
                      <LogOut size={18} /><span>Sign Out</span>
                    </button>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={() => { hapticLight(); closeSidebar(); }}
                      className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#1ed760] hover:bg-[#1ed760]/10 transition-colors font-medium"
                    >
                      <User size={18} /><span>Sign In</span>
                    </Link>
                  )}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide min-h-0 bg-gray-50 dark:bg-[#0e0e0e] transition-colors">
          <Outlet context={{ profilePic, setProfilePic }} />
        </main>

        {/* Bottom Navigation */}
        {isMarketplacePage && <BottomNav />}
      </div>
    </div>
  );
}
