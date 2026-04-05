import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Home, UploadCloud, Shield, 
  User, LogOut, ChevronRight, Briefcase, Settings as SettingsIcon 
} from "lucide-react";

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256");
  
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Upload APK", path: "/dev", icon: <UploadCloud size={20} /> },
    { name: "Admin Dashboard", path: "/admin", icon: <Shield size={20} /> },
  ];

  return (
    <div className="bg-gray-200 dark:bg-black min-h-screen flex justify-center w-full transition-colors">
      {/* Mobile App Container */}
      <div className="w-full max-w-[430px] bg-gray-50 dark:bg-[#121212] min-h-screen shadow-2xl relative text-gray-900 dark:text-white font-sans flex flex-col overflow-hidden border-x border-gray-300 dark:border-[#222] transition-colors">
        
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-4 py-4 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#333] sticky top-0 z-30 transition-colors">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="p-1.5 -ml-1.5 hover:bg-gray-100 dark:hover:bg-[#333] rounded-md transition-colors text-gray-900 dark:text-white"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <div className="text-lg font-bold flex items-center gap-2">
              <Briefcase size={20} className="text-emerald-500 dark:text-[#34d399]" />
              DevMarket
            </div>
          </div>
          
          <button onClick={() => navigate("/profile")} className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-[#333] hover:border-emerald-500 dark:hover:border-[#34d399] transition-colors">
            <img 
              src={profilePic} 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </button>
        </header>

        {/* Slide-in Sidebar Menu */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeSidebar}
                className="absolute inset-0 bg-black/50 dark:bg-black/70 z-40 backdrop-blur-sm"
              />
              
              {/* Drawer */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="absolute top-0 left-0 h-full w-[280px] bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-[#333] z-50 flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#333]">
                  <div className="text-lg font-bold flex items-center gap-2">
                    <Briefcase size={20} className="text-emerald-500 dark:text-[#34d399]" />
                    DevMarket
                  </div>
                  <button 
                    onClick={closeSidebar}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#333] rounded-full transition-colors bg-gray-50 dark:bg-[#222] text-gray-700 dark:text-zinc-300"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-4 flex flex-col gap-6 flex-1 overflow-y-auto">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#222] rounded-xl mb-2 border border-gray-100 dark:border-transparent">
                    <img src={profilePic} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-[#444]" />
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">Alex Developer</div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400">Admin Account</div>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-2">
                    <div className="text-xs font-semibold text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-1 px-1">Menu</div>
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={closeSidebar}
                          className={`flex items-center justify-between px-3 py-3.5 rounded-xl transition-all ${
                            isActive 
                              ? "bg-emerald-50 dark:bg-[#34d399]/10 text-emerald-600 dark:text-[#34d399] font-bold" 
                              : "text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a] font-medium"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {link.icon}
                            <span>{link.name}</span>
                          </div>
                          {isActive && <ChevronRight size={16} />}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-[#333] flex flex-col gap-2">
                  <Link
                    to="/settings"
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors font-medium ${
                      location.pathname === "/settings" 
                        ? "bg-emerald-50 dark:bg-[#34d399]/10 text-emerald-600 dark:text-[#34d399] font-bold" 
                        : "text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#2a2a2a]"
                    }`}
                  >
                    <SettingsIcon size={20} />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeSidebar}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors font-medium"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Link>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          <Outlet context={{ profilePic, setProfilePic }} />
        </main>
      </div>
    </div>
  );
}
