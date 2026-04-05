import { useState } from "react";
import { UploadCloud, Image as ImageIcon, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function DevDashboard() {
  const [appName, setAppName] = useState("");
  const [description, setDescription] = useState("");
  const [apkUploaded, setApkUploaded] = useState(false);
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appName && description && apkUploaded) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setAppName("");
        setDescription("");
        setApkUploaded(false);
        setScreenshots([]);
      }, 3000);
    }
  };

  const handleScreenshotUpload = () => {
    setScreenshots(prev => [...prev, "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=600"]);
  };

  return (
    <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Developer Portal</h1>
        <p className="text-gray-500 dark:text-zinc-400 text-sm">Upload your latest APKs to the store.</p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl p-5 shadow-lg">
        {submitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <CheckCircle2 size={56} className="text-emerald-500 dark:text-[#34d399] mb-4" />
            <h2 className="text-xl font-bold mb-2">Submitted!</h2>
            <p className="text-gray-500 dark:text-zinc-400 text-sm">Your app is now under review.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">App Name</label>
              <input 
                type="text" 
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="e.g. CodeFlow Pro"
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your app's main features..."
                rows={4}
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors resize-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Upload APK File</label>
              <div 
                className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  apkUploaded ? "border-emerald-400 dark:border-[#34d399] bg-emerald-50 dark:bg-[#34d399]/10" : "border-gray-300 dark:border-[#333] hover:border-gray-400 dark:hover:border-[#555] bg-gray-50 dark:bg-[#111]"
                }`}
                onClick={() => setApkUploaded(true)}
              >
                {apkUploaded ? (
                  <>
                    <FileText size={28} className="text-emerald-500 dark:text-[#34d399] mb-2" />
                    <span className="text-gray-900 dark:text-white text-sm font-bold">app-release-v1.0.apk</span>
                    <span className="text-xs text-gray-500 dark:text-zinc-500 mt-1">24.5 MB</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={28} className="text-gray-400 dark:text-zinc-500 mb-2" />
                    <span className="text-gray-600 dark:text-zinc-300 text-sm font-bold">Tap to upload APK</span>
                    <span className="text-xs text-gray-500 dark:text-zinc-600 mt-1">Maximum 100MB</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Screenshots</label>
                <span className="text-[10px] text-gray-500 dark:text-zinc-500 font-bold">{screenshots.length} / 5</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {screenshots.map((src, i) => (
                  <div key={i} className="relative aspect-[9/16] rounded-xl overflow-hidden border border-gray-200 dark:border-[#333] shadow-sm">
                    <img src={src} alt={`Screenshot ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                
                {screenshots.length < 5 && (
                  <button 
                    type="button"
                    onClick={handleScreenshotUpload}
                    className="aspect-[9/16] rounded-xl border-2 border-dashed border-gray-300 dark:border-[#333] hover:border-gray-400 dark:hover:border-[#555] bg-gray-50 dark:bg-[#111] flex flex-col items-center justify-center text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-white transition-colors"
                  >
                    <ImageIcon size={20} className="mb-1" />
                    <span className="text-[10px] font-bold uppercase">Add</span>
                  </button>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={!appName || !description || !apkUploaded}
                className="w-full bg-emerald-400 dark:bg-[#34d399] text-black font-bold py-3.5 rounded-xl hover:bg-emerald-500 dark:hover:bg-[#2ebc87] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-md"
              >
                Submit for Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
