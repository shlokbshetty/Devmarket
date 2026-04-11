import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { apiGet } from "../api/client.js";
import svgPaths from "../imports/svg-ilu7mp8pji.js";

const IMG = {
  heroBackground: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  appIcon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=128&h=128&fit=crop",
  screenshot1: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=500&fit=crop",
  screenshot2: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=500&fit=crop",
  screenshot3: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=300&h=500&fit=crop",
  fluxDesigner: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=128&h=128&fit=crop",
  profileAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop",
};

export default function AppDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadState, setDownloadState] = useState('idle');
  const [progress, setProgress] = useState(0);

  const performInstall = async () => {
    if (!app?.downloadUrl) return;
    setDownloadState('downloading');
    setProgress(0);

    try {
      const response = await fetch(app.downloadUrl);
      if (!response.ok) throw new Error('Download failed');

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const res = new Response(
        new ReadableStream({
          async start(controller) {
            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              loaded += value.byteLength;
              if (total) {
                setProgress(Math.round((loaded / total) * 100));
              } else {
                setProgress(p => Math.min(p + 10, 90));
              }
              controller.enqueue(value);
            }
            controller.close();
          },
        })
      );

      const blob = await res.blob();

      // Simulate extraction phase
      setDownloadState('extracting');
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = app.name ? `${app.name.replace(/\s+/g, '_')}.apk` : 'app.apk';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setDownloadState('done');
    } catch (err) {
      console.error(err);
      setDownloadState('error');
    }

    setTimeout(() => {
      setDownloadState('idle');
      setProgress(0);
    }, 3000);
  };

  useEffect(() => {
    async function fetchAppDetails() {
      try {
        const res = await apiGet(`/apps/${id}`);
        if (res?.app) {
          setApp(res.app);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch app details, falling back to mock UI", err);
      } finally {
        setLoading(false);
      }

      // Fallback UI
      setApp({
        _id: "codeflow",
        name: "CodeFlow Pro",
        developerId: { name: "VIBRANT SOFTWARE CO." },
        category: "Productivity",
        description: "Elevate your creative workflow with CodeFlow Pro. Featuring advanced development tools, real-time collaboration, and an AI-driven code library. Built for the modern digital creator.",
        averageRating: "4.9",
        screenshots: null,
        downloadUrl: null,
      });
    }
    fetchAppDetails();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500 dark:text-[#adaaaa]">Loading app details...</div>;
  }

  const primaryImage = app.screenshots?.[0] || IMG.heroBackground;
  const iconImage = app.screenshots?.[0] || IMG.appIcon;

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-full overflow-y-auto pb-[24px] transition-colors">
      {/* Hero Section */}
      <div className="h-[397px] overflow-clip relative w-full">
        <div className="absolute inset-[-10px] flex items-center justify-center">
          <div className="flex-none h-[417px] w-full opacity-60">
            <img alt="" className="w-full h-full object-cover" src={primaryImage} />
          </div>
        </div>
        <div className="absolute bg-gradient-to-t from-gray-50 dark:from-[#0e0e0e] inset-0 to-transparent via-[rgba(249,250,251,0.4)] dark:via-[rgba(14,14,14,0.4)] transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[7px] pb-[32px] px-[24px]">
          <div className="flex gap-[24px] items-end w-full">
            <div className="bg-white dark:bg-[#262626] rounded-[24px] shrink-0 size-[96px] overflow-clip shadow-lg dark:shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] transition-colors">
              <img alt="App Icon" className="size-full object-cover" src={iconImage} />
            </div>
            <div className="flex flex-1 flex-col gap-[4px]">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[36px] text-gray-900 dark:text-white tracking-[-1.8px] leading-[40px]">{app.name}</div>
              <div className="font-['Inter',sans-serif] text-[#1ed760] dark:text-[#1ed760] text-[14px] tracking-[0.35px] leading-[20px] font-bold">{app.developerId?.name?.toUpperCase() || "UNKNOWN DEVELOPER"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[24px] pt-[32px] flex flex-col gap-[32px]">
        {/* Install Button & Stats */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex gap-[16px]">
            <button
              onClick={downloadState === 'idle' ? performInstall : undefined}
              className={`relative overflow-hidden flex flex-1 h-[56px] items-center justify-center rounded-[16px] shadow-sm transition-opacity ${downloadState === 'idle' ? 'cursor-pointer hover:opacity-90 dark:shadow-[0px_8px_30px_0px_rgba(114,254,143,0.3)]' : 'cursor-default'}`}
              style={{ backgroundImage: "linear-gradient(135deg, #18a94b 0%, #158b3e 100%)" }}
            >
              {['downloading', 'extracting'].includes(downloadState) && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#1ed760] transition-all duration-300 ease-out"
                  style={{ width: `${downloadState === 'extracting' ? 100 : progress}%` }}
                />
              )}
              <div className="relative z-10 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-white text-[18px] leading-[28px]">
                {downloadState === 'idle' && 'Install'}
                {downloadState === 'downloading' && `Downloading (${progress}%)`}
                {downloadState === 'extracting' && 'Extracting...'}
                {downloadState === 'done' && 'Installed'}
                {downloadState === 'error' && 'Failed'}
              </div>
            </button>
            <button className="bg-white hover:bg-gray-100 dark:hover:bg-[#2c2c2c] dark:bg-[#20201f] shadow-sm dark:shadow-none transition-colors flex h-[56px] items-center justify-center rounded-[16px] shrink-0 w-[56px]">
              <svg width="20" height="19" fill="none" viewBox="0 0 20 18.35"><path d={svgPaths.p279a9400} className="fill-[#1ed760] dark:fill-[#1ed760]" /></svg>
            </button>
          </div>
          <div className="flex gap-[32px] items-start">
            {[{val: `${app.averageRating || "0"} ⭐`, lbl: "Rating"}, {val: "128 MB", lbl: "Size"}, {val: app.category || "App", lbl: "Category"}].map(s=>(
              <div key={s.lbl} className="flex flex-1 flex-col gap-[8px] items-center">
                <div className="font-['Inter',sans-serif] font-bold text-gray-700 dark:text-[#adaaaa] text-[14px] leading-[20px]">{s.val}</div>
                <div className="font-['Inter',sans-serif] text-gray-400 dark:text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshots */}
        <div className="flex flex-col gap-[16px]">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] text-gray-900 dark:text-white leading-[28px]">Screenshots</div>
          <div className="flex gap-[16px] overflow-x-auto scrollbar-hide pb-4">
            {(app.screenshots && app.screenshots.length > 0 ? app.screenshots : [IMG.screenshot1, IMG.screenshot2, IMG.screenshot3]).map((img, idx) => (
              <div key={idx} className="h-[300px] rounded-[16px] shrink-0 w-[180px] overflow-hidden shadow-sm dark:shadow-none">
                <img alt={`Screenshot ${idx + 1}`} className="size-full object-cover" src={img} />
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-[#131313] shadow-sm dark:shadow-none rounded-[24px] p-[24px] flex flex-col gap-[16px] transition-colors">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] text-gray-900 dark:text-white leading-[28px]">About this app</div>
          <div className="font-['Inter',sans-serif] text-gray-600 dark:text-[#adaaaa] text-[14px] leading-[23px] whitespace-pre-line">{app.description}</div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col gap-[24px]">
          {[{t:"Developer",v: app.developerId?.name || "Unknown"},{t:"Works on this device",v:""},{t:"Data Not Collected",v:""}].map(i=>(
            <div key={i.t} className="flex flex-col gap-[8px]">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] text-gray-900 dark:text-white leading-[20px]">{i.t}</div>
              {i.v && <div className="font-['Inter',sans-serif] text-gray-600 dark:text-[#adaaaa] text-[14px] leading-[20px]">{i.v}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
