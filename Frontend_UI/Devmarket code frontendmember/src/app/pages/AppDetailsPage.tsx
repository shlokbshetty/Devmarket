import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import svgPaths from "../../imports/svg-ilu7mp8pji";
import imgHeroBackground from "figma:asset/d78e8c668ebb6ce3342f260412602b6644731a16.png";
import imgAppIcon from "figma:asset/fc510f6091e62d3c51173e80c4e64f2c7a3b7f87.png";
import imgScreenshot1 from "figma:asset/f999d7fa86dabfad7fd2af2f99e54539f1b411b0.png";
import imgScreenshot2 from "figma:asset/3b6da3871807e2e9948e89f3f3dfdbdcd7db3bd0.png";
import imgScreenshot3 from "figma:asset/2f8fb0266651e3e9c74c7016a2cb895a8b04890d.png";
import imgProfileAvatar from "figma:asset/11acb89729196bcb46f2fe48ff1a59725b68f9ee.png";
import imgFluxDesigner from "figma:asset/228cf9fcad2de7923c688de7cba72370f8fe32b0.png";
import svgDownloadPaths from "../../imports/svg-x1iz0u28rz";

export default function AppDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showDownloadSheet, setShowDownloadSheet] = useState(false);

  const handleInstall = () => {
    setShowDownloadSheet(true);
  };

  return (
    <div className="bg-[#0e0e0e] relative w-full min-h-screen overflow-y-auto pb-[100px]">
      {/* Header */}
      <div className="backdrop-blur-[12px] bg-[rgba(14,14,14,0.8)] flex h-[64px] items-center justify-between sticky top-0 w-full z-10 px-[24px] shadow-[0px_0px_40px_0px_rgba(114,254,143,0.08)]">
        <div className="flex gap-[12px] items-center">
          <button onClick={() => navigate(-1)} className="size-[16px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8L10 4" stroke="#72FE8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[20px] text-white tracking-[-0.5px]">
            App Details
          </div>
        </div>
        <div className="flex gap-[16px] items-center">
          <button className="h-[20px] w-[18px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
              <path d={svgPaths.p2b729200} fill="#ADAAAA" />
            </svg>
          </button>
          <button onClick={() => navigate("/library")} className="bg-[#262626] overflow-clip relative rounded-full shrink-0 size-[32px]">
            <img alt="Profile" className="absolute left-0 max-w-none size-full top-0" src={imgProfileAvatar} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-[397px] overflow-clip relative w-full">
        <div className="absolute flex inset-[-10px] items-center justify-center">
          <div className="flex-none h-[417px] w-[410px] opacity-60">
            <img alt="" className="absolute h-[105%] left-[-3.44%] max-w-none top-[-2.5%] w-[106.88%]" src={imgHeroBackground} />
          </div>
        </div>
        <div className="absolute bg-gradient-to-t from-[#0e0e0e] inset-0 to-[rgba(14,14,14,0)] via-1/2 via-[rgba(14,14,14,0.4)]" />
        <div className="absolute bottom-0 flex flex-col left-0 pb-[32px] px-[24px] right-0">
          <div className="flex gap-[24px] items-end w-full">
            <div className="bg-[#262626] relative rounded-[24px] shrink-0 size-[96px] overflow-clip shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <img alt="App Icon" className="absolute left-0 max-w-none size-full top-0" src={imgAppIcon} />
            </div>
            <div className="flex flex-[1_0_0] flex-col gap-[4px]">
              <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[36px] text-white tracking-[-1.8px] leading-[40px]">
                CodeFlow Pro
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#72fe8f] text-[14px] tracking-[0.35px] leading-[20px]">
                VIBRANT SOFTWARE CO.
              </div>
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
              onClick={handleInstall}
              className="flex flex-[1_0_0] h-[56px] items-center justify-center rounded-[9999px] shadow-[0px_8px_30px_0px_rgba(114,254,143,0.3)]"
              style={{ backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }}
            >
              <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#002a0c] text-[18px] leading-[28px]">
                Install
              </div>
            </button>
            <button className="bg-[#20201f] flex h-[56px] items-center justify-center rounded-[9999px] shrink-0 w-[56px]">
              <div className="h-[18.35px] w-[20px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18.35">
                  <path d={svgPaths.p279a9400} fill="#72FE8F" />
                </svg>
              </div>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-[32px] items-start">
            <div className="flex flex-[1_0_0] flex-col gap-[8px] items-center">
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[20px]">
                4.9 ⭐
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">
                Rating
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col gap-[8px] items-center">
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[20px]">
                128 MB
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">
                Size
              </div>
            </div>
            <div className="flex flex-[1_0_0] flex-col gap-[8px] items-center">
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[12px] leading-[20px]">
                4+
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">
                Age
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        <div className="flex flex-col gap-[16px]">
          <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[18px] text-white leading-[28px]">
            Screenshots
          </div>
          <div className="flex gap-[16px] overflow-x-auto">
            {[imgScreenshot1, imgScreenshot2, imgScreenshot3].map((img, idx) => (
              <div key={idx} className="h-[427px] rounded-[16px] shrink-0 w-[240px] overflow-hidden">
                <img alt={`Screenshot ${idx + 1}`} className="size-full object-cover" src={img} />
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-[#131313] relative rounded-[24px] p-[24px] flex flex-col gap-[16px]">
          <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[18px] text-white leading-[28px]">
            About this app
          </div>
          <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] leading-[22.75px]">
            Elevate your creative workflow with CodeFlow Pro. Featuring advanced development tools, real-time collaboration, and an AI-driven code library. Built for the modern digital creator.
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[8px]">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-white leading-[20px]">
              Developer
            </div>
            <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] leading-[20px]">
              Vibrant Software Systems Inc.
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-white leading-[20px]">
              Works on this device
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-white leading-[20px]">
              Data Not Collected
            </div>
          </div>
        </div>
      </div>

      {/* Download Sheet Overlay */}
      {showDownloadSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowDownloadSheet(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div
            className="backdrop-blur-[20px] bg-[rgba(14,14,14,0.95)] flex flex-col gap-[32px] items-center w-full max-w-[672px] pb-[48px] pt-[17px] px-[32px] rounded-tl-[40px] rounded-tr-[40px] shadow-[0px_-20px_60px_0px_rgba(0,0,0,0.8)] relative border-t border-[rgba(255,255,255,0.05)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#262626] h-[6px] opacity-40 rounded-[9999px] w-[48px]" />
            <div className="flex flex-col items-center gap-[24px] w-full">
              <div className="bg-[#20201f] flex items-center justify-center p-[4px] rounded-[16px] size-[80px]">
                <img alt="Flux Designer" className="size-full rounded-[14px]" src={imgFluxDesigner} />
              </div>
              <div className="font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold text-[24px] text-center text-white leading-[32px]">
                Downloading Flux Designer
              </div>
              <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[14px] text-center leading-[20px]">
                42.5 MB of 128.0 MB • 2 mins remaining
              </div>
              <div className="flex flex-col gap-[12px] w-full">
                <div className="bg-[#262626] h-[16px] overflow-clip relative rounded-[9999px] w-full">
                  <div className="absolute inset-[0_65%_0_0] rounded-[9999px] shadow-[0px_0px_15px_0px_rgba(114,254,143,0.4)]" style={{ backgroundImage: "linear-gradient(135deg, rgb(114, 254, 143) 0%, rgb(28, 184, 83) 100%)" }} />
                </div>
                <div className="flex items-start justify-between px-[4px] w-full">
                  <div className="font-['Inter:Regular',sans-serif] font-normal text-[#72fe8f] text-[10px] tracking-[1px] uppercase leading-[15px]">
                    35% Complete
                  </div>
                  <div className="font-['Inter:Regular',sans-serif] font-normal text-[#adaaaa] text-[10px] tracking-[1px] uppercase leading-[15px]">
                    1.2 MB/s
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[16px] w-full mt-[24px]">
                <div className="flex gap-[16px] justify-center w-full">
                  <button className="bg-[#20201f] flex gap-[8px] h-[56px] items-center justify-center rounded-[9999px] w-[154px]">
                    <div className="size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <path d={svgDownloadPaths.p21276080} fill="white" />
                      </svg>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[14px] text-center text-white leading-[20px]">
                      Pause
                    </div>
                  </button>
                  <button className="bg-[#131313] flex gap-[8px] h-[56px] items-center justify-center opacity-50 rounded-[9999px] w-[156px] border border-[rgba(72,72,71,0.2)]">
                    <div className="size-[20px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                        <path d={svgDownloadPaths.p19e3b6c0} fill="#ADAAAA" />
                      </svg>
                    </div>
                    <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#adaaaa] text-[14px] text-center leading-[20px]">
                      Resume
                    </div>
                  </button>
                </div>
                <button onClick={() => setShowDownloadSheet(false)} className="flex gap-[8px] h-[56px] items-center justify-center rounded-[9999px] w-full border border-[rgba(255,115,81,0.3)]">
                  <div className="size-[20px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <path d={svgDownloadPaths.p28843fc0} fill="#FF7351" />
                    </svg>
                  </div>
                  <div className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#ff7351] text-[14px] text-center leading-[20px]">
                    Cancel Download
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
