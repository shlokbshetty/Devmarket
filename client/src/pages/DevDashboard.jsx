import { useState, useCallback } from "react";
import { UploadCloud, Image as ImageIcon, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { apiUpload } from "../api/client.js";
import { hapticLight, hapticMedium, hapticSuccess } from "../utils/nativeBridge.js";

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

  // Button interaction helper with tactile haptics
  const handleButtonInteraction = useCallback((e, action) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    hapticLight();
    action();
  }, []);

  const addScreenshot = useCallback(() => {
    hapticLight();
    if (screenshots.length < 5) setScreenshots(prev => [...prev, ""]);
  }, [screenshots.length]);

  const removeScreenshot = useCallback((i) => {
    hapticLight();
    setScreenshots(prev => prev.filter((_, idx) => idx !== i));
  }, []);

  const updateScreenshot = (i, val) => {
    const updated = [...screenshots];
    updated[i] = val;
    setScreenshots(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    hapticMedium();

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

      hapticSuccess();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setAppName("");
        setDescription("");
        setCategory("");
        setVersion("");
        setApkFile(null);
        setScreenshots([""]);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to upload APK");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full p-6 text-gray-900 dark:text-white min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-500 mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold mb-2">Sign in Required</h2>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 max-w-xs">You need to be logged into a developer account to publish applications.</p>
        <button 
          onClick={(e) => handleButtonInteraction(e, () => navigate('/login'))}
          className="bg-[#1ed760] text-black font-bold py-3 px-8 rounded-2xl hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (user?.role !== 'developer' && user?.role !== 'administrator') {
    return (
      <div className="w-full p-6 text-gray-900 dark:text-white min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1ed760]/15 flex items-center justify-center text-[#1ed760] mb-4">
          <UploadCloud size={32} />
        </div>
        <h2 className="text-xl font-bold mb-2">Developer Account Required</h2>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-6 max-w-sm">
          Your account role is currently <span className="font-bold text-gray-900 dark:text-white capitalize">{user?.role || 'user'}</span>. Contact an administrator to elevate your privileges to Developer.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-5 text-gray-900 dark:text-white pb-24 bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1ed760] bg-[#1ed760]/10 px-2.5 py-0.5 rounded-full">Developer Center</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight mb-1">Publish Application</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-xs">Deploy binary APK packages to DevMarket mobile marketplace.</p>
      </div>

      <div className="bg-white dark:bg-[#161616] border border-gray-200/80 dark:border-white/5 rounded-3xl p-5 shadow-sm">
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 size={56} className="text-[#1ed760] mb-3 animate-bounce" />
            <h2 className="text-2xl font-bold mb-1">Package Submitted!</h2>
            <p className="text-gray-500 dark:text-zinc-400 text-xs max-w-xs">Your application package has been queued for security verification and moderation.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-semibold">{error}</div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">App Name</label>
              <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="e.g. SynthCode Pro"
                className="w-full bg-gray-50 dark:bg-[#202020] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760] transition-all" required />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Explain the key features, permissions, and toolchains..." rows={3}
                className="w-full bg-gray-50 dark:bg-[#202020] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760] transition-all resize-none" required />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#202020] border border-gray-200 dark:border-white/10 rounded-2xl px-3 py-3 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760] transition-all" required>
                  <option value="">Select Category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Version</label>
                <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="e.g. 1.0.0"
                  className="w-full bg-gray-50 dark:bg-[#202020] border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1ed760] transition-all" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">APK Binary Package</label>
              <label className="flex items-center gap-3 w-full bg-gray-50 dark:bg-[#202020] border border-dashed border-gray-300 dark:border-white/20 rounded-2xl px-4 py-4 cursor-pointer hover:border-[#1ed760] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#1ed760]/15 flex items-center justify-center text-[#1ed760] shrink-0">
                  <UploadCloud size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white block truncate">
                    {apkFile ? apkFile.name : "Select .apk file"}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-zinc-400">
                    {apkFile ? `${(apkFile.size / (1024 * 1024)).toFixed(2)} MB` : "Android application package (max 200MB)"}
                  </span>
                </div>
                <input type="file" accept=".apk" className="hidden" onChange={(e) => setApkFile(e.target.files?.[0] || null)} required />
              </label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Screenshot URLs</label>
                <span className="text-[10px] text-[#1ed760] font-bold">{screenshots.length} / 5</span>
              </div>
              <div className="space-y-2">
                {screenshots.map((url, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="relative flex-1">
                      <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={14} />
                      <input type="url" value={url} onChange={(e) => updateScreenshot(i, e.target.value)} placeholder={`Screenshot URL #${i + 1}`}
                        className="w-full bg-gray-50 dark:bg-[#202020] border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#1ed760] transition-all" />
                    </div>
                    {screenshots.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeScreenshot(i)}
                        className="p-2.5 text-gray-400 hover:text-red-500 active:scale-90 transition-transform"
                        aria-label="Remove screenshot"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {screenshots.length < 5 && (
                  <button 
                    type="button" 
                    onClick={addScreenshot}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#1ed760] hover:underline pt-1"
                  >
                    <Plus size={14} /> Add Screenshot Field
                  </button>
                )}
              </div>
            </div>

            <div className="pt-3">
              <button 
                type="submit" 
                disabled={loading || !appName || !description || !category || !version || !apkFile}
                className="w-full bg-[#1ed760] text-black font-extrabold py-3.5 rounded-2xl hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
              >
                {loading ? "Uploading APK..." : "Submit APK for Distribution"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
