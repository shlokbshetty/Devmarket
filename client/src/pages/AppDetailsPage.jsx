import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import svgPaths from "../imports/svg-ilu7mp8pji.js";
import svgDownloadPaths from "../imports/svg-x1iz0u28rz.js";

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
  const [showDownloadSheet, setShowDownloadSheet] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-full overflow-y-auto pb-[24px] transition-colors">
      {/* Hero Section */}
      <div className="h-[397px] overflow-clip relative w-full">
        <div className="absolute inset-[-10px] flex items-center justify-center">
          <div className="flex-none h-[417px] w-full opacity-60">
            <img alt="" className="w-full h-full object-cover" src={IMG.heroBackground} />
          </div>
        </div>
        <div className="absolute bg-gradient-to-t from-gray-50 dark:from-[#0e0e0e] inset-0 to-transparent via-[rgba(249,250,251,0.4)] dark:via-[rgba(14,14,14,0.4)] transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[7px] pb-[32px] px-[24px]">
          <div className="flex gap-[24px] items-end w-full">
            <div className="bg-white dark:bg-[#262626] rounded-[24px] shrink-0 size-[96px] overflow-clip shadow-lg dark:shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] transition-colors">
              <img alt="App Icon" className="size-full object-cover" src={IMG.appIcon} />
            </div>
            <div className="flex flex-1 flex-col gap-[4px]">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[36px] text-gray-900 dark:text-white tracking-[-1.8px] leading-[40px]">CodeFlow Pro</div>
              <div className="font-['Inter',sans-serif] text-emerald-600 dark:text-[#72fe8f] text-[14px] tracking-[0.35px] leading-[20px] font-bold">VIBRANT SOFTWARE CO.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[24px] pt-[32px] flex flex-col gap-[32px]">
        {/* Install Button & Stats */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex gap-[16px]">
            <button onClick={() => setShowDownloadSheet(true)}
              className="flex flex-1 h-[56px] items-center justify-center rounded-[16px] shadow-sm dark:shadow-[0px_8px_30px_0px_rgba(114,254,143,0.3)] hover:opacity-90 transition-opacity"
              style={{ backgroundImage: "linear-gradient(135deg, #72FE8F 0%, #1CB853 100%)" }}>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#002a0c] text-[18px] leading-[28px]">Install</div>
            </button>
            <button className="bg-white hover:bg-gray-100 dark:hover:bg-[#2c2c2c] dark:bg-[#20201f] shadow-sm dark:shadow-none transition-colors flex h-[56px] items-center justify-center rounded-[16px] shrink-0 w-[56px]">
              <svg width="20" height="19" fill="none" viewBox="0 0 20 18.35"><path d={svgPaths.p279a9400} className="fill-emerald-500 dark:fill-[#72FE8F]" /></svg>
            </button>
          </div>
          <div className="flex gap-[32px] items-start">
            {[{val:"4.9 ⭐",lbl:"Rating"},{val:"128 MB",lbl:"Size"},{val:"4+",lbl:"Age"}].map(s=>(
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
            {[IMG.screenshot1, IMG.screenshot2, IMG.screenshot3].map((img, idx) => (
              <div key={idx} className="h-[300px] rounded-[16px] shrink-0 w-[180px] overflow-hidden shadow-sm dark:shadow-none">
                <img alt={`Screenshot ${idx + 1}`} className="size-full object-cover" src={img} />
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-[#131313] shadow-sm dark:shadow-none rounded-[24px] p-[24px] flex flex-col gap-[16px] transition-colors">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[18px] text-gray-900 dark:text-white leading-[28px]">About this app</div>
          <div className="font-['Inter',sans-serif] text-gray-600 dark:text-[#adaaaa] text-[14px] leading-[23px]">Elevate your creative workflow with CodeFlow Pro. Featuring advanced development tools, real-time collaboration, and an AI-driven code library. Built for the modern digital creator.</div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col gap-[24px]">
          {[{t:"Developer",v:"Vibrant Software Systems Inc."},{t:"Works on this device",v:""},{t:"Data Not Collected",v:""}].map(i=>(
            <div key={i.t} className="flex flex-col gap-[8px]">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] text-gray-900 dark:text-white leading-[20px]">{i.t}</div>
              {i.v && <div className="font-['Inter',sans-serif] text-gray-600 dark:text-[#adaaaa] text-[14px] leading-[20px]">{i.v}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Download Sheet Overlay — z-[60] */}
      {showDownloadSheet && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center" onClick={() => setShowDownloadSheet(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="backdrop-blur-[20px] bg-white/95 dark:bg-[rgba(14,14,14,0.95)] flex flex-col gap-[32px] items-center w-full max-w-[430px] pb-[48px] pt-[17px] px-[32px] rounded-tl-[40px] rounded-tr-[40px] shadow-[0px_-20px_60px_0px_rgba(0,0,0,0.1)] dark:shadow-[0px_-20px_60px_0px_rgba(0,0,0,0.8)] relative border-t border-gray-100 dark:border-[rgba(255,255,255,0.05)] transition-colors"
            onClick={(e) => e.stopPropagation()}>
            <div className="bg-gray-300 dark:bg-[#262626] h-[6px] opacity-40 rounded-full w-[48px]" />
            <div className="flex flex-col items-center gap-[24px] w-full">
              <div className="bg-gray-100 dark:bg-[#20201f] transition-colors flex items-center justify-center p-[4px] rounded-[16px] size-[80px]">
                <img alt="Flux Designer" className="size-full rounded-[14px] object-cover" src={IMG.fluxDesigner} />
              </div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[24px] text-center text-gray-900 dark:text-white leading-[32px]">Downloading Flux Designer</div>
              <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[14px] text-center leading-[20px]">42.5 MB of 128.0 MB • 2 mins remaining</div>
              <div className="flex flex-col gap-[12px] w-full">
                <div className="bg-gray-200 dark:bg-[#262626] h-[16px] overflow-clip relative rounded-full w-full transition-colors">
                  <div className="absolute inset-y-0 left-0 w-[35%] rounded-full shadow-[0px_0px_15px_0px_rgba(16,185,129,0.4)] dark:shadow-[0px_0px_15px_0px_rgba(114,254,143,0.4)]" style={{ backgroundImage: "linear-gradient(135deg, #72FE8F 0%, #1CB853 100%)" }} />
                </div>
                <div className="flex items-start justify-between px-[4px] w-full">
                  <div className="font-['Inter',sans-serif] text-emerald-600 dark:text-[#72fe8f] font-bold text-[10px] tracking-[1px] uppercase leading-[15px]">35% Complete</div>
                  <div className="font-['Inter',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">1.2 MB/s</div>
                </div>
              </div>
              <div className="flex flex-col gap-[16px] w-full mt-[24px]">
                <div className="flex gap-[16px] justify-center w-full">
                  <button className="bg-white border border-gray-200 dark:border-transparent dark:bg-[#20201f] hover:bg-gray-50 dark:hover:bg-[#2c2c2c] transition-colors flex gap-[8px] h-[56px] items-center justify-center rounded-full w-[154px]">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d={svgDownloadPaths.p21276080} className="fill-gray-900 dark:fill-white" /></svg>
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[14px] text-center text-gray-900 dark:text-white leading-[20px]">Pause</div>
                  </button>
                  <button className="bg-gray-100 dark:bg-[#131313] flex gap-[8px] h-[56px] items-center justify-center opacity-50 rounded-full w-[156px] border border-gray-200 dark:border-[rgba(72,72,71,0.2)]">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d={svgDownloadPaths.p19e3b6c0} className="fill-gray-400 dark:fill-[#ADAAAA]" /></svg>
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-gray-400 dark:text-[#adaaaa] text-[14px] text-center leading-[20px]">Resume</div>
                  </button>
                </div>
                <button onClick={() => setShowDownloadSheet(false)} className="flex gap-[8px] h-[56px] items-center justify-center rounded-full w-full border border-red-200 dark:border-[rgba(255,115,81,0.3)] bg-red-50 dark:bg-transparent">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d={svgDownloadPaths.p28843fc0} fill="#FF7351" className="dark:fill-[#FF7351]" /></svg>
                  <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-red-500 dark:text-[#ff7351] text-[14px] text-center leading-[20px]">Cancel Download</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
