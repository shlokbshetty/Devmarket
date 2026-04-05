import { useState, useRef } from "react";
import { User, Mail, Camera, Save, LogOut } from "lucide-react";
import { useOutletContext } from "react-router";

export function Profile() {
  const { profilePic, setProfilePic } = useOutletContext<{ profilePic: string, setProfilePic: (url: string) => void }>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "Alex Developer",
    email: "alex@devmarket.app",
    bio: "Focused on creating dev tools and extensions.",
    company: "Indie Dev"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full p-4 text-gray-900 dark:text-white min-h-[calc(100vh-65px)] bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Profile</h1>
          <p className="text-gray-500 dark:text-zinc-400 text-sm">Manage settings.</p>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#222] rounded-lg transition-colors text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-300 shadow-sm"
          >
            Edit
          </button>
        ) : (
          <button 
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400 dark:bg-[#34d399] text-black hover:bg-emerald-500 dark:hover:bg-[#2ebc87] rounded-lg transition-colors text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Save size={14} /> Save
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl p-5 flex flex-col items-center shadow-lg">
          <div className="relative mb-4 group cursor-pointer" onClick={handleImageClick}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-white dark:border-[#333] shadow-md dark:shadow-none group-hover:border-emerald-400 dark:group-hover:border-[#34d399] transition-colors">
              <img 
                src={profilePic} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          <h2 className="text-lg font-bold mb-0.5">{profile.name}</h2>
          <p className="text-emerald-600 dark:text-[#34d399] text-xs font-bold mb-4 uppercase tracking-wider">{profile.company}</p>
          
          <div className="w-full pt-4 border-t border-gray-100 dark:border-[#333] space-y-3 text-sm text-gray-700 dark:text-zinc-300">
            <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-3 rounded-2xl border border-gray-200 dark:border-[#222]">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-gray-400 dark:text-zinc-500" />
                <span className="truncate max-w-[180px] text-xs font-medium">{profile.email}</span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-3 rounded-2xl border border-gray-200 dark:border-[#222]">
              <div className="flex items-center gap-3">
                <User size={16} className="text-gray-400 dark:text-zinc-500" />
                <span className="text-xs font-medium">Member since Oct 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Form */}
        <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] rounded-3xl p-5 shadow-lg">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500 mb-4 ml-1">Personal Info</h3>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Name</label>
              <input 
                type="text" 
                disabled={!isEditing}
                value={isEditing ? editedProfile.name : profile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors disabled:opacity-70 disabled:bg-gray-100 dark:disabled:bg-[#1a1a1a]"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Company</label>
              <input 
                type="text" 
                disabled={!isEditing}
                value={isEditing ? editedProfile.company : profile.company}
                onChange={(e) => setEditedProfile({...editedProfile, company: e.target.value})}
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors disabled:opacity-70 disabled:bg-gray-100 dark:disabled:bg-[#1a1a1a]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Bio</label>
              <textarea 
                rows={3}
                disabled={!isEditing}
                value={isEditing ? editedProfile.bio : profile.bio}
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-emerald-400 dark:focus:border-[#34d399] transition-colors disabled:opacity-70 disabled:bg-gray-100 dark:disabled:bg-[#1a1a1a] resize-none"
              />
            </div>
          </div>
          
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-[#333]">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/20 hover:bg-red-500 hover:text-white rounded-xl transition-colors text-sm font-bold">
              <LogOut size={16} /> Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
