import { useState, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { apiUpload } from "../api/client.js";

const CATEGORIES = ["Games", "Productivity", "Utilities", "Creative Tools", "Security", "DevOps", "Education", "Other"];

export function DevDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [appName, setAppName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [version, setVersion] = useState("");
  const [apkFile, setApkFile] = useState(null);
  const [screenshots, setScreenshots] = useState([""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pressedButtons, setPressedButtons] = useState(new Set());

  if (!isAuthenticated) {
    return (
      <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">Sign in Required</h2>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4">You need to be logged in to access this page.</p>
        <button 
          onClick={(e) => handleButtonInteraction(e, () => navigate('/login'))}
          onTouchStart={() => handleTouchStart('signin-btn')}
          onTouchEnd={() => handleTouchEnd('signin-btn')}
          onTouchCancel={() => handleTouchCancel('signin-btn')}
          className={`bg-emerald-400 dark:bg-[#34d399] text-black font-bold py-2.5 px-6 rounded-xl hover:bg-emerald-500 dark:hover:bg-[#2ebc87] transition-colors ${pressedButtons.has('signin-btn') ? 'scale-[0.98] opacity-80' : ''}`}
          style={{ 
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none'
          }}
        >
          Sign In
        </button>
      </div>
    );
  }

  if (user?.role !== 'developer') {
    return (
      <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">Developer Access Required</h2>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4 text-center max-w-sm">Only Developer accounts can upload and publish apps to DevMarket. You are currently logged in as a {user?.role || 'user'}.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Provide haptic feedback on mobile if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setError("");
    setLoading(true);
    try {
      const validScreenshots = screenshots.filter(s => s.trim() !== "");

      const formData = new FormData();
      formData.append('name', appName);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('version', version);
      formData.append('apk', apkFile);
      validScreenshots.forEach(s => formData.append('screenshots', s));

      await apiUpload("/apps/upload", formData);

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setAppName(""); setDescription(""); setCategory(""); setVersion(""); setApkFile(null); setScreenshots([""]);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced button event handling for mobile
  const handleButtonInteraction = useCallback((e, action) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Provide haptic feedback on mobile if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    action();
  }, []);

  const handleTouchStart = useCallback((buttonId) => {
    setPressedButtons(prev => new Set(prev).add(buttonId));
  }, []);

  const handleTouchEnd = useCallback((buttonId) => {
    setPressedButtons(prev => {
      const newSet = new Set(prev);
      newSet.delete(buttonId);
      return newSet;
    });
  }, []);

  const handleTouchCancel = useCallback((buttonId) => {
    setPressedButtons(prev => {
      const newSet = new Set(prev);
      newSet.delete(buttonId);
      return newSet;
    });
  }, []);

  const addScreenshot = () => { if (screenshots.length < 5) setScreenshots([...screenshots, ""]); };
  const removeScreenshot = (i) => {
    // Provide haptic feedback on mobile if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    setScreenshots(screenshots.filter((_, idx) => idx !== i));
  };
  const updateScreenshot = (i, val) => { const u = [...screenshots]; u[i] = val; setScreenshots(u); };

  return (
    <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Developer Portal</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm">Upload your latest apps to the store.</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl p-5 shadow-lg">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle2 size={56} className="text-[#1ed760] dark:text-[#1ed760] mb-4" />
            <h2 className="text-xl font-bold mb-2">Submitted!</h2>
            <p className="text-gray-500 dark:text-zinc-400 text-sm">Your app is now under review.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">{error}</div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">App Name</label>
              <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="e.g. CodeFlow Pro"
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your app's main features..." rows={4}
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors resize-none" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors" required>
                <option value="">Select a category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Version</label>
              <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="e.g. 1.0.0"
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Upload APK</label>
              <div className="relative">
                <label className="flex items-center gap-3 w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 cursor-pointer hover:border-[#1ed760] dark:hover:border-[#1ed760] transition-colors">
                  <UploadCloud size={16} className="text-gray-400 dark:text-zinc-500 shrink-0" />
                  <span className="text-sm text-gray-500 dark:text-zinc-400 truncate">
                    {apkFile ? apkFile.name : "Choose .apk file…"}
                  </span>
                  <input type="file" accept=".apk" className="hidden" onChange={(e) => setApkFile(e.target.files?.[0] || null)} required />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Screenshot URLs</label>
                <span className="text-[10px] text-gray-500 dark:text-zinc-500 font-bold">{screenshots.length} / 5</span>
              </div>
              <div className="space-y-2">
                {screenshots.map((url, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="relative flex-1">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={14} />
                      <input type="url" value={url} onChange={(e) => updateScreenshot(i, e.target.value)} placeholder={`Screenshot ${i + 1} URL`}
                        className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors" />
                    </div>
                    {screenshots.length > 1 && (
                      <button 
                        type="button" 
                        onClick={(e) => handleButtonInteraction(e, () => removeScreenshot(i))}
                        onTouchStart={() => handleTouchStart(`remove-${i}`)}
                        onTouchEnd={() => handleTouchEnd(`remove-${i}`)}
                        onTouchCancel={() => handleTouchCancel(`remove-${i}`)}
                        className={`p-2 text-gray-400 dark:text-zinc-500 hover:text-red-500 transition-colors ${pressedButtons.has(`remove-${i}`) ? 'scale-[0.98] opacity-80' : ''}`}
                        style={{ 
                          touchAction: 'manipulation',
                          WebkitTapHighlightColor: 'transparent',
                          userSelect: 'none'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {screenshots.length < 5 && (
                  <button 
                    type="button" 
                    onClick={(e) => handleButtonInteraction(e, addScreenshot)}
                    onTouchStart={() => handleTouchStart('add-screenshot')}
                    onTouchEnd={() => handleTouchEnd('add-screenshot')}
                    onTouchCancel={() => handleTouchCancel('add-screenshot')}
                    className={`flex items-center gap-2 text-xs font-bold text-[#1ed760] dark:text-[#1ed760] hover:text-[#1ed760] dark:hover:text-[#1ed760] transition-colors py-1 ${pressedButtons.has('add-screenshot') ? 'scale-[0.98] opacity-80' : ''}`}
                    style={{ 
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      userSelect: 'none'
                    }}
                  >
                    <Plus size={14} /> Add Screenshot URL
                  </button>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading || !appName || !description || !category || !version || !apkFile}
                onTouchStart={() => handleTouchStart('submit-btn')}
                onTouchEnd={() => handleTouchEnd('submit-btn')}
                onTouchCancel={() => handleTouchCancel('submit-btn')}
                className={`w-full bg-emerald-400 dark:bg-[#34d399] text-black font-bold py-3.5 rounded-xl hover:bg-emerald-500 dark:hover:bg-[#2ebc87] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md ${pressedButtons.has('submit-btn') ? 'scale-[0.98] opacity-80' : ''}`}
                style={{ 
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}
              >
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
