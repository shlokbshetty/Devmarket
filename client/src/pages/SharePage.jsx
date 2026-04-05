import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { apiGet } from "../api/client.js";

const IMG = {
  appIcon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=128&h=128&fit=crop",
  felix: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop",
  sarah: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
  marcus: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop",
  aria: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop",
  lena: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop",
};

const friends = [
  { name: "Felix", img: IMG.felix, online: true },
  { name: "Sarah", img: IMG.sarah, online: true },
  { name: "Marcus", img: IMG.marcus, online: false },
  { name: "Aria", img: IMG.aria, online: false },
  { name: "Lena", img: IMG.lena, online: true },
];

const platforms = [
  { name: "Discord", color: "#5865F2", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
  )},
  { name: "Slack", color: "#E01E5A", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>
  )},
  { name: "GitHub", color: "#333", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  )},
  { name: "X", color: "#000", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  )},
  { name: "Telegram", color: "#0088cc", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
  )},
  { name: "LinkedIn", color: "#0A66C2", icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  )},
];

export default function SharePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [app, setApp] = useState(null);

  useEffect(() => {
    async function fetchApp() {
      try {
        const res = await apiGet(`/apps/${id}`);
        if (res?.data) {
          setApp(res.data);
          return;
        }
      } catch (err) {
        console.error("Failed to fetch app for sharing, falling back", err);
      }

      setApp({
        _id: "codeflow",
        name: "CodeFlow Pro",
        category: "Productivity",
        screenshots: null
      });
    }
    fetchApp();
  }, [id]);

  const toggleFriend = (name) => {
    setSelectedFriends(prev =>
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`https://devmarket.app/app/${id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0e0e0e] relative w-full min-h-full transition-colors">
      {/* Dimmed background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" onClick={() => navigate(-1)} />

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#131313] rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.8)] z-10 transition-colors">
        {/* Drag Handle */}
        <div className="flex justify-center pt-[17px] pb-[24px]">
          <div className="bg-gray-300 dark:bg-[#262626] h-[6px] opacity-40 rounded-full w-[48px]" />
        </div>

        {/* App Info Header */}
        <div className="flex items-center gap-[20px] px-[32px] pb-[24px]">
          <div className="bg-gray-100 dark:bg-[#20201f] transition-colors rounded-[16px] shrink-0 size-[64px] overflow-hidden p-[4px]">
            <img alt="App Icon" className="size-full rounded-[14px] object-cover" src={app?.screenshots?.[0] || IMG.appIcon} />
          </div>
          <div className="flex-1">
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[20px] text-gray-900 dark:text-white leading-[28px]">{app?.name || "Loading..."}</div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] text-gray-500 dark:text-[#adaaaa] text-[14px] leading-[20px]">{app?.category || "App"}</div>
          </div>
          <button onClick={() => navigate(-1)} className="bg-gray-100 hover:bg-gray-200 dark:bg-[#20201f] dark:hover:bg-[#2c2c2c] flex items-center justify-center rounded-full shrink-0 size-[40px] transition-colors">
            <svg width="16" height="16" fill="none" viewBox="0 0 20 20">
              <path d="M15 5L5 15M5 5L15 15" className="stroke-gray-600 dark:stroke-[#adaaaa]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Copy App Link Button */}
        <div className="px-[32px] pb-[32px]">
          <button onClick={handleCopyLink}
            className="flex items-center justify-center gap-[12px] h-[56px] w-full rounded-[16px] shadow-sm dark:shadow-[0px_8px_30px_0px_rgba(114,254,143,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundImage: "linear-gradient(135deg, #72FE8F 0%, #1CB853 100%)" }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="#005F26" strokeWidth="2" />
              <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#005F26" strokeWidth="2" />
            </svg>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#005f26] text-[16px] leading-[24px]">
              {copied ? "Link Copied!" : "Copy App Link"}
            </div>
          </button>
        </div>

        {/* Send to Friends */}
        <div className="px-[32px] pb-[32px]">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-gray-500 dark:text-[#767575] text-[12px] tracking-[2.4px] uppercase leading-[16px] mb-[20px]">Send to Friends</div>
          <div className="flex gap-[20px] overflow-x-auto scrollbar-hide pb-[4px]">
            {friends.map((friend) => (
              <button key={friend.name} onClick={() => toggleFriend(friend.name)} className="flex flex-col items-center gap-[8px] shrink-0">
                <div className={`relative rounded-full size-[64px] overflow-hidden ${selectedFriends.includes(friend.name) ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-[#72FE8F] dark:ring-offset-[#131313]' : 'opacity-80 hover:opacity-100'} transition-all`}>
                  <img alt={friend.name} className="size-full object-cover" src={friend.img} />
                  {friend.online && (
                    <div className="absolute bottom-[2px] right-[2px] size-[12px] rounded-full bg-emerald-500 dark:bg-[#72FE8F] shadow-[0_0_10px_rgba(16,185,129,0.4)] dark:shadow-[0_0_10px_#72fe8f44] border-2 border-white dark:border-[#131313]" />
                  )}
                </div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[12px] text-gray-700 dark:text-[#adaaaa] leading-[16px]">{friend.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Share Via */}
        <div className="px-[32px] pb-[48px]">
          <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-gray-500 dark:text-[#767575] text-[12px] tracking-[2.4px] uppercase leading-[16px] mb-[20px]">Share Via</div>
          <div className="grid grid-cols-3 gap-[12px]">
            {platforms.map((platform) => (
              <button key={platform.name}
                className="bg-gray-50 hover:bg-gray-100 dark:bg-[#1a1a1a] dark:hover:bg-[#20201f] transition-colors flex flex-col items-center gap-[12px] py-[20px] rounded-[16px] border border-gray-100 dark:border-transparent"
              >
                <div className="flex items-center justify-center size-[40px] rounded-[10px] shadow-sm transform hover:scale-105 transition-transform" style={{ backgroundColor: platform.color }}>
                  {platform.icon}
                </div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[12px] text-gray-700 dark:text-[#adaaaa] leading-[16px]">{platform.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
