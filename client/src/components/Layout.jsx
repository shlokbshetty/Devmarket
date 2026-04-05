import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu, X, Home, UploadCloud, Shield,
  User, LogOut, ChevronRight, Briefcase, Settings as SettingsIcon,
  Search, Download, FolderOpen, Share2
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import BottomNav from "./BottomNav.jsx";

const DEFAULT_PIC = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256";

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(DEFAULT_PIC);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    closeSidebar();
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Search", path: "/search", icon: <Search size={20} /> },
    { name: "Downloads", path: "/downloads", icon: <Download size={20} /> },
    { name: "Library", path: "/library", icon: <FolderOpen size={20} /> },
    ...(isAuthenticated ? [
      { name: "Profile", path: "/profile", icon: <User size={20} /> },
      { name: "Upload APK", path: "/dev", icon: <UploadCloud size={20} /> },
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
    <div className="bg-gray-100 dark:bg-black min-h-screen flex justify-center w-full transition-colors">
      {/* Mobile App Container — Editorial Discovery: surface (#0e0e0e) */}
      <div className={`w-full max-w-[430px] bg-white dark:bg-[#0e0e0e] h-screen shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative text-gray-900 dark:text-white font-['Plus_Jakarta_Sans',sans-serif] flex flex-col overflow-hidden transition-colors`}>

        {/* Top Navigation Bar — Glass blur on marketplace, solid surface otherwise */}
        <header className={`flex items-center justify-between px-5 py-4 ${isMarketplacePage ? 'bg-white/85 dark:bg-[rgba(14,14,14,0.85)] backdrop-blur-[20px]' : 'bg-gray-50 dark:bg-[#131313]'} shrink-0 z-30 transition-colors`}>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="p-1.5 -ml-1.5 rounded-[0.25rem] transition-colors hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-gray-900 dark:text-white"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <div className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Briefcase size={20} className="text-emerald-500 dark:text-[#72FE8F]" />
              DevMarket
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Share button — only on App Detail pages */}
            {isAppDetailPage && (
              <button
                onClick={() => navigate(location.pathname + "/share")}
                className="p-1.5 rounded-[0.25rem] transition-colors hover:bg-gray-100 dark:hover:bg-[#2c2c2c] text-gray-500 dark:text-[#adaaaa] hover:text-gray-900 dark:hover:text-white"
                aria-label="Share App"
              >
                <Share2 size={20} />
              </button>
            )}

            {isAuthenticated ? (
              <button onClick={() => navigate("/profile")} className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-emerald-500/40 dark:hover:ring-[#72FE8F]/40 transition-all">
                <img src={profilePic} alt="User" className="w-full h-full object-cover" />
              </button>
            ) : (
              <Link to="/login" className="text-sm font-bold hover:underline text-emerald-600 dark:text-[#72FE8F]">
                Sign In
              </Link>
            )}
          </div>
        </header>

        {/* Slide-in Sidebar — Editorial Discovery: surface_container #1a1a1a */}
        {/* Adjusted z-index from z-40/z-50 to z-[60]/z-[70] so it overlays BottomNav */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="absolute inset-0 bg-black/30 dark:bg-black/70 z-[60] backdrop-blur-sm"
              />
              <motion.aside
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="absolute top-0 left-0 h-full w-[280px] bg-white dark:bg-[#1a1a1a] z-[70] flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-colors"
              >
                {/* Sidebar Header — bg shift to #131313, no borders */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#131313] transition-colors">
                  <div className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                    <Briefcase size={20} className="text-emerald-500 dark:text-[#72FE8F]" />
                    DevMarket
                  </div>
                  <button onClick={closeSidebar} className="p-2 hover:bg-gray-200 dark:hover:bg-[#2c2c2c] rounded-full transition-colors bg-gray-100 dark:bg-[#20201f] text-gray-500 dark:text-[#adaaaa]">
                    <X size={18} />
                  </button>
                </div>

                <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto">
                  {isAuthenticated && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#20201f] rounded-xl mb-2 transition-colors">
                      <img src={profilePic} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-sm text-gray-900 dark:text-white">{user?.name || 'User'}</div>
                        <div className="text-xs text-gray-500 dark:text-[#adaaaa] capitalize">{user?.role || 'user'} Account</div>
                      </div>
                    </div>
                  )}

                  <nav className="flex flex-col gap-1">
                    <div className="text-xs font-semibold text-gray-500 dark:text-[#767575] uppercase tracking-wider mb-1 px-1">Menu</div>
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link key={link.path} to={link.path} onClick={closeSidebar}
                          className={`flex items-center justify-between px-3 py-3.5 rounded-xl transition-all ${isActive
                            ? "bg-emerald-50 text-emerald-600 dark:bg-[#72FE8F]/10 dark:text-[#72FE8F] font-bold"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-[#adaaaa] dark:hover:text-white dark:hover:bg-[#20201f] font-medium"
                            }`}
                        >
                          <div className="flex items-center gap-3">{link.icon}<span>{link.name}</span></div>
                          {isActive && <ChevronRight size={16} />}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Sidebar Footer — bg shift to #131313 */}
                <div className="p-4 bg-gray-50 dark:bg-[#131313] flex flex-col gap-2 transition-colors">
                  {isAuthenticated && (
                    <Link to="/settings" onClick={closeSidebar}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors font-medium ${location.pathname === "/settings"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-[#72FE8F]/10 dark:text-[#72FE8F] font-bold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-[#adaaaa] dark:hover:text-white dark:hover:bg-[#20201f]"
                        }`}
                    >
                      <SettingsIcon size={20} /><span>Settings</span>
                    </Link>
                  )}
                  {isAuthenticated ? (
                    <button onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-400/10 transition-colors font-medium w-full text-left"
                    >
                      <LogOut size={20} /><span>Logout</span>
                    </button>
                  ) : (
                    <Link to="/login" onClick={closeSidebar}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-emerald-600 hover:bg-emerald-50 dark:text-[#72FE8F] dark:hover:bg-[#72FE8F]/10 transition-colors font-medium"
                    >
                      <User size={20} /><span>Sign In</span>
                    </Link>
                  )}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content — fills remaining space, scrollable independently */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide min-h-0">
          <Outlet context={{ profilePic, setProfilePic }} />
        </main>

        {/* Bottom Navigation — outside scroll area, always at bottom */}
        {isMarketplacePage && <BottomNav />}
      </div>
    </div>
  );
}
