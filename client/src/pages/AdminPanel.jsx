import { useState, useEffect } from "react";
import { Search, Check, X, Clock, ChevronRight, Shield } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { apiGet, apiPut, apiDelete } from "../api/client.js";

export function AdminPanel() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [approvedCount, setApprovedCount] = useState(0);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (isAuthenticated && isAdmin) fetchPendingApps();
  }, [isAuthenticated, isAdmin]);

  const fetchPendingApps = async () => {
    try {
      setLoading(true);
      const data = await apiGet("/admin/pending");
      setApps(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (e, id, action) => {
    e.stopPropagation();
    setActionLoading(id);
    try {
      if (action === 'Approve') {
        await apiPut(`/admin/approve/${id}`);
        setApprovedCount(prev => prev + 1);
      } else {
        await apiDelete(`/admin/remove/${id}`);
      }
      setApps(apps.filter(app => app._id !== id));
      if (selectedApp === id) setSelectedApp(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center">
        <Shield size={48} className="text-gray-300 dark:text-zinc-700 mb-4" />
        <h2 className="text-xl font-bold mb-2">Admin Access Only</h2>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4 text-center">You need admin privileges to access this page.</p>
        {!isAuthenticated && (
          <button onClick={() => navigate('/login')} className="bg-[#1ed760] dark:bg-[#1ed760] text-black font-bold py-2.5 px-6 rounded-xl hover:bg-[#1ed760] dark:hover:bg-[#1ed760] transition-colors">Sign In</button>
        )}
      </div>
    );
  }

  const filteredApps = searchQuery
    ? apps.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.category?.toLowerCase().includes(searchQuery.toLowerCase()))
    : apps;

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';

  return (
    <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm">Review pending submissions.</p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        <div className="min-w-[140px] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] p-4 rounded-3xl flex-1 flex flex-col justify-between shadow-sm">
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-3"><Clock size={16} /></div>
          <div><h3 className="text-2xl font-black leading-none mb-1">{apps.length}</h3><p className="text-gray-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Pending</p></div>
        </div>
        <div className="min-w-[140px] bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] p-4 rounded-3xl flex-1 flex flex-col justify-between shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#1ed760]/20 dark:bg-[#1ed760]/10 flex items-center justify-center text-[#1ed760] dark:text-[#1ed760] mb-3"><Check size={16} /></div>
          <div><h3 className="text-2xl font-black leading-none mb-1">{approvedCount}</h3><p className="text-gray-500 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Approved</p></div>
        </div>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={16} />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search pending apps..."
          className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-2xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors text-gray-900 dark:text-white shadow-sm" />
      </div>

      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mb-3 ml-1">Requires Review</h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="w-8 h-8 border-2 border-[#1ed760] dark:border-[#1ed760] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500 dark:text-zinc-500 text-sm">Loading...</p>
        </div>
      ) : (
        <div className="space-y-3 pb-8">
          <AnimatePresence>
            {filteredApps.map((app) => (
              <motion.div key={app._id} initial={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95, height: 0, margin: 0 }}
                className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl overflow-hidden shadow-md">
                <div className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#222] transition-colors"
                  onClick={() => setSelectedApp(selectedApp === app._id ? null : app._id)}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1ed760] to-[#1ed760] dark:from-[#1ed760] dark:to-[#1ed760] flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {app.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate">{app.name}</div>
                    <div className="text-xs text-gray-500 dark:text-zinc-400 truncate">by {app.developerId?.name || "Unknown"}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] bg-gray-100 dark:bg-[#333] px-1.5 py-0.5 rounded text-gray-600 dark:text-zinc-300 font-bold mb-1">{app.category}</span>
                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium">{formatDate(app.createdAt)}</span>
                  </div>
                  <ChevronRight size={18} className={`text-gray-400 dark:text-zinc-600 transition-transform ${selectedApp === app._id ? "rotate-90" : ""}`} />
                </div>

                <AnimatePresence>
                  {selectedApp === app._id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-gray-50 dark:bg-[#111] border-t border-gray-100 dark:border-[#222]">
                      <div className="p-4 space-y-3">
                        <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed">{app.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-zinc-400 font-medium">
                          <span>APK: <a href={app.apkUrl} target="_blank" rel="noreferrer" className="text-[#1ed760] dark:text-[#1ed760] underline">Download</a></span>
                          <span>{app.screenshots?.length || 0} screenshots</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button onClick={(e) => handleAction(e, app._id, 'Reject')} disabled={actionLoading === app._id}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl transition-all text-sm font-bold border border-red-100 dark:border-transparent disabled:opacity-50">
                            <X size={16} /> Reject
                          </button>
                          <button onClick={(e) => handleAction(e, app._id, 'Approve')} disabled={actionLoading === app._id}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#1ed760]/10 dark:bg-[#1ed760]/10 text-[#1ed760] dark:text-[#1ed760] hover:bg-[#1ed760] hover:text-black py-2.5 rounded-xl transition-all text-sm font-bold border border-[#1ed760]/20 dark:border-transparent disabled:opacity-50">
                            <Check size={16} /> Approve
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          {!loading && filteredApps.length === 0 && (
            <div className="text-center py-10 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-200 dark:border-[#222]">
              <Check size={40} className="text-[#1ed760] dark:text-[#1ed760] mx-auto mb-3 opacity-50" />
              <p className="text-gray-500 dark:text-zinc-500 text-sm font-bold">No pending apps!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
