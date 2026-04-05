import { useState } from "react";
import { Search, Check, X, Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminPanel() {
  const [apps, setApps] = useState([
    { id: 1, name: "SynthCode Pro", dev: "Alice Cooper", status: "Pending", category: "IDE", date: "Oct 24", icon: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop" },
    { id: 2, name: "GuardRail AI", dev: "CyberSec Inc.", status: "Pending", category: "Security", date: "Oct 25", icon: "https://images.unsplash.com/photo-1614064641913-6b71a30f10e4?w=128&h=128&fit=crop" },
    { id: 3, name: "CodeFlow v2", dev: "Bob Smith", status: "Pending", category: "Productivity", date: "Oct 26", icon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=128&h=128&fit=crop" }
  ]);

  const [selectedApp, setSelectedApp] = useState<number | null>(null);

  const handleAction = (e: React.MouseEvent, id: number, action: 'Approve' | 'Reject') => {
    e.stopPropagation();
    setApps(apps.filter(app => app.id !== id));
    if (selectedApp === id) setSelectedApp(null);
  };

  return (
    <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm">Review pending submissions.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        <div className="min-w-[140px] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] p-4 rounded-3xl flex-1 flex flex-col justify-between shadow-sm">
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-3">
            <Clock size={16} />
          </div>
          <div>
            <h3 className="text-2xl font-black leading-none mb-1">{apps.length}</h3>
            <p className="text-gray-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Pending</p>
          </div>
        </div>
        <div className="min-w-[140px] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] p-4 rounded-3xl flex-1 flex flex-col justify-between shadow-sm">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-[#34d399]/10 flex items-center justify-center text-emerald-600 dark:text-[#34d399] mb-3">
            <Check size={16} />
          </div>
          <div>
            <h3 className="text-2xl font-black leading-none mb-1">14</h3>
            <p className="text-gray-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Approved</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={16} />
        <input 
          type="text" 
          placeholder="Search pending apps..." 
          className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors text-gray-900 dark:text-white shadow-sm"
        />
      </div>

      {/* Pending List */}
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-3 ml-1">Requires Review</h2>
      
      <div className="space-y-3 pb-8">
        <AnimatePresence>
          {apps.map((app) => (
            <motion.div 
              key={app.id} 
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, height: 0, margin: 0 }}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl overflow-hidden shadow-md"
            >
              <div 
                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
                onClick={() => setSelectedApp(selectedApp === app.id ? null : app.id)}
              >
                <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-zinc-800 shrink-0 border border-gray-200 dark:border-transparent" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{app.name}</div>
                  <div className="text-xs text-gray-500 dark:text-zinc-400 truncate">by {app.dev}</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] bg-gray-100 dark:bg-[#333] px-1.5 py-0.5 rounded text-gray-600 dark:text-zinc-300 font-bold mb-1">
                    {app.category}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium">{app.date}</span>
                </div>
                <ChevronRight 
                  size={18} 
                  className={`text-gray-400 dark:text-zinc-600 transition-transform ${selectedApp === app.id ? "rotate-90" : ""}`} 
                />
              </div>

              {/* Expandable Action Area */}
              <AnimatePresence>
                {selectedApp === app.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-gray-50 dark:bg-[#111] border-t border-gray-100 dark:border-[#222]"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 font-medium">
                        <span>Version: 1.0.4</span>
                        <span>Size: 24.5 MB</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={(e) => handleAction(e, app.id, 'Reject')}
                          className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl transition-all text-sm font-bold border border-red-100 dark:border-transparent"
                        >
                          <X size={16} /> Reject
                        </button>
                        <button 
                          onClick={(e) => handleAction(e, app.id, 'Approve')}
                          className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-500 hover:text-black py-2.5 rounded-xl transition-all text-sm font-bold border border-emerald-100 dark:border-transparent"
                        >
                          <Check size={16} /> Approve
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {apps.length === 0 && (
            <div className="text-center py-10 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-[#222]">
              <Check size={40} className="text-emerald-400 dark:text-[#34d399] mx-auto mb-3 opacity-50" />
              <p className="text-gray-500 dark:text-zinc-500 text-sm font-bold">No pending apps!</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
