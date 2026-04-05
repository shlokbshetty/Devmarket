import { useState } from "react";
import { Link2, Image as ImageIcon, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { apiPost } from "../api/client.js";

const CATEGORIES = ["Games", "Productivity", "Utilities", "Creative Tools", "Security", "DevOps", "Education", "Other"];

export function DevDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [appName, setAppName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [apkUrl, setApkUrl] = useState("");
  const [screenshots, setScreenshots] = useState([""]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold mb-2">Sign in Required</h2>
        <p className="text-gray-500 dark:text-zinc-400 text-sm mb-4">You need to be logged in to upload apps.</p>
        <button onClick={() => navigate('/login')} className="bg-[#1ed760] dark:bg-[#1ed760] text-black font-bold py-2.5 px-6 rounded-xl hover:bg-[#1ed760] dark:hover:bg-[#1ed760] transition-colors">
          Sign In
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const validScreenshots = screenshots.filter(s => s.trim() !== "");
      await apiPost("/apps/upload", { name: appName, description, category, apkUrl, screenshots: validScreenshots });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setAppName(""); setDescription(""); setCategory(""); setApkUrl(""); setScreenshots([""]);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addScreenshot = () => { if (screenshots.length < 5) setScreenshots([...screenshots, ""]); };
  const removeScreenshot = (i) => setScreenshots(screenshots.filter((_, idx) => idx !== i));
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
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">APK Download URL</label>
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" size={16} />
                <input type="url" value={apkUrl} onChange={(e) => setApkUrl(e.target.value)} placeholder="https://drive.google.com/file/your-apk"
                  className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#1ed760] dark:focus:border-[#1ed760] transition-colors" required />
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
                      <button type="button" onClick={() => removeScreenshot(i)} className="p-2 text-gray-400 dark:text-zinc-500 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {screenshots.length < 5 && (
                  <button type="button" onClick={addScreenshot} className="flex items-center gap-2 text-xs font-bold text-[#1ed760] dark:text-[#1ed760] hover:text-[#1ed760] dark:hover:text-[#1ed760] transition-colors py-1">
                    <Plus size={14} /> Add Screenshot URL
                  </button>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading || !appName || !description || !category || !apkUrl}
                className="w-full bg-[#1ed760] dark:bg-[#1ed760] text-black font-bold py-3.5 rounded-xl hover:bg-[#1ed760] dark:hover:bg-[#1ed760] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md">
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
