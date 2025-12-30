import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, ShieldCheck, Settings, Ruler, Clock, 
  ChevronRight, Edit3, Camera, Save, X, Bell, Moon, 
  Heart, Star, MessageSquare, LogOut, Sparkles
} from 'lucide-react';

interface UserProfile {
  name: string;
  motto: string;
  avatarId: number;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // 状态管理
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Luna',
    motto: '自爱是生命浪漫的开始',
    avatarId: 1
  });
  
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editMotto, setEditMotto] = useState(profile.motto);
  const [userRating, setUserRating] = useState(0);

  // 偏好设置开关状态
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [protectionModeEnabled, setProtectionModeEnabled] = useState(false);

  const handleSaveProfile = () => {
    setProfile({
      ...profile,
      name: editName,
      motto: editMotto
    });
    setIsEditDrawerOpen(false);
  };

  const handleLogout = () => {
    // 执行退出登录逻辑并跳转回登录页
    navigate('/auth');
  };

  const menuItems = [
    { icon: <Ruler size={18} className="text-blue-400"/>, label: '身体指标数据', path: '/insights' },
    { icon: <Clock size={18} className="text-pink-400"/>, label: '月经周期设置', path: '/onboarding' },
    { icon: <ShieldCheck size={18} className="text-brand-mintDark"/>, label: '隐私与安全', path: '#' },
  ];

  return (
    <div className="min-h-screen bg-brand-bg pb-32 relative overflow-hidden flex flex-col">
      {/* 背景装饰球 */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-80 h-80 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* 顶部导航 */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between relative z-10">
        <button onClick={() => navigate('/home')} className="glass-btn w-10 h-10 active:scale-90 transition-transform">
            <ChevronLeft size={20} />
        </button>
        <h1 className="text-sub-title font-heading font-extrabold text-brand-text">个人中心</h1>
        <button className="glass-btn w-10 h-10 active:scale-90 transition-transform">
            <Settings size={20} className="text-brand-subtext" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-8 relative z-10 pb-10">
        
        {/* 用户头像及基础信息 */}
        <div className="flex flex-col items-center pt-4">
            <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-white shadow-xl flex items-center justify-center p-1 border-4 border-white/80">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-pink/30 to-brand-mint/30 flex items-center justify-center overflow-hidden">
                        <UserIcon id={profile.avatarId} size={48} />
                    </div>
                </div>
                <button 
                    onClick={() => setIsEditDrawerOpen(true)}
                    className="absolute bottom-0 right-0 w-9 h-9 bg-brand-text text-white rounded-full flex items-center justify-center border-4 border-brand-bg shadow-lg active:scale-90 transition-transform"
                >
                    <Edit3 size={14} />
                </button>
            </div>
            <h2 className="text-main-title font-heading font-extrabold text-brand-text mt-5">{profile.name}</h2>
            <p className="text-annotation font-bold text-brand-subtext mt-1 italic">“{profile.motto}”</p>
        </div>

        {/* 核心菜单区 */}
        <div className="space-y-4">
            <h3 className="text-annotation font-bold text-brand-subtext uppercase tracking-widest ml-1">我的数据</h3>
            <div className="glass-panel p-1 bg-white/40">
                {menuItems.map((item, i) => (
                    <div 
                        key={i} 
                        onClick={() => item.path !== '#' && navigate(item.path)}
                        className={`flex items-center justify-between p-4 hover:bg-white/60 rounded-2xl cursor-pointer transition-colors ${i !== menuItems.length - 1 ? 'border-b border-white/20' : ''}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <span className="text-body-text font-bold text-brand-text">{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-brand-subtext" />
                    </div>
                ))}
            </div>
        </div>

        {/* 功能开关 / 设置 */}
        <div className="space-y-4">
            <h3 className="text-annotation font-bold text-brand-subtext uppercase tracking-widest ml-1">偏好设置</h3>
            <div className="glass-panel p-4 bg-white/40 space-y-5">
                {/* 开关：通知提醒 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-orange-100/50 flex items-center justify-center text-orange-400">
                            <Bell size={18} />
                        </div>
                        <span className="text-body-text font-bold text-brand-text">通知提醒</span>
                    </div>
                    <div 
                        onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                        className={`w-11 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-300 ${notificationsEnabled ? 'bg-brand-mint' : 'bg-brand-shadowDark/60'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                </div>

                {/* 开关：深度守护模式 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100/50 flex items-center justify-center text-indigo-400">
                            <Moon size={18} />
                        </div>
                        <span className="text-body-text font-bold text-brand-text">深度守护模式</span>
                    </div>
                    <div 
                        onClick={() => setProtectionModeEnabled(!protectionModeEnabled)}
                        className={`w-11 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-300 ${protectionModeEnabled ? 'bg-brand-mint' : 'bg-brand-shadowDark/60'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 transform ${protectionModeEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                </div>
            </div>
        </div>

        {/* 评分互动 */}
        <div className="glass-card p-6 bg-gradient-to-br from-brand-pink/10 to-transparent border border-brand-pink/20">
            <div className="flex flex-col items-center text-center">
                <Heart size={24} className="text-brand-pinkDark mb-2 fill-brand-pinkDark/20" />
                <h4 className="text-body-text font-bold text-brand-text">喜欢 LunaFlow 吗？</h4>
                <p className="text-annotation text-brand-subtext font-medium mt-1 mb-4">你的评分能让我们陪伴更多女性成长</p>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                            key={star} 
                            onClick={() => setUserRating(star)}
                            className="transition-transform active:scale-90"
                        >
                            <Star 
                                size={24} 
                                className={`${userRating >= star ? 'text-orange-400 fill-orange-400' : 'text-brand-subtext/20'}`} 
                            />
                        </button>
                    ))}
                </div>
                {userRating > 0 && (
                    <p className="text-[10px] font-bold text-brand-pinkDark mt-3 animate-bounce">感谢您的支持！✨</p>
                )}
            </div>
        </div>

        {/* 退出登录 */}
        <button 
            onClick={handleLogout}
            className="w-full py-5 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center gap-3 text-body-text font-bold text-brand-pinkDark shadow-sm active:scale-[0.98] transition-all"
        >
            <LogOut size={18} /> 退出当前登录
        </button>

        <div className="text-center pb-6">
            <p className="text-[10px] font-bold text-brand-subtext/40 uppercase tracking-[0.4em]">LunaFlow v2.4.0</p>
        </div>
      </div>

      {/* --- 编辑个人资料抽屉 --- */}
      {isEditDrawerOpen && (
          <div className="absolute inset-0 z-[100] flex flex-col justify-end">
                <div className="absolute inset-0 bg-brand-bg/60 backdrop-blur-sm" onClick={() => setIsEditDrawerOpen(false)}></div>
                <div className="relative glass-panel bg-white/95 rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300 max-h-[90%] overflow-y-auto">
                    <div className="w-12 h-1.5 bg-brand-shadowDark/20 rounded-full mx-auto mb-8"></div>
                    
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-sub-title font-heading font-extrabold text-brand-text">编辑个人资料</h2>
                            <p className="text-annotation text-brand-subtext font-bold mt-1 uppercase">展现最真实的自己</p>
                        </div>
                        <button onClick={() => setIsEditDrawerOpen(false)} className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-subtext active:scale-90"><X size={20}/></button>
                    </div>

                    <div className="space-y-8 mb-12">
                        {/* 头像选择预览 */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pinkDark border-2 border-brand-pink/20 shadow-inner relative">
                                <UserIcon id={profile.avatarId} size={40} />
                                <div className="absolute inset-0 bg-black/5 rounded-full flex items-center justify-center">
                                    <Camera size={20} className="text-white opacity-60" />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                {[1, 2, 3, 4].map(id => (
                                    <button 
                                        key={id}
                                        onClick={() => setProfile({...profile, avatarId: id})}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${profile.avatarId === id ? 'border-brand-pinkDark scale-110 shadow-md' : 'border-transparent opacity-50'}`}
                                    >
                                        <div className="w-full h-full rounded-full bg-brand-bg flex items-center justify-center">
                                            <UserIcon id={id} size={16} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 昵称输入 */}
                        <div className="space-y-2">
                            <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">我的昵称</label>
                            <input 
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none focus:bg-white border-2 border-transparent focus:border-brand-pink/20 transition-all"
                                placeholder="输入昵称"
                            />
                        </div>

                        {/* 签名输入 */}
                        <div className="space-y-2">
                            <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">个性签名</label>
                            <textarea 
                                rows={2}
                                value={editMotto}
                                onChange={(e) => setEditMotto(e.target.value)}
                                className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none focus:bg-white border-2 border-transparent focus:border-brand-pink/20 transition-all resize-none"
                                placeholder="写下今日感悟..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => setIsEditDrawerOpen(false)} 
                            className="py-4 rounded-2xl bg-brand-bg/80 text-brand-subtext font-bold text-body-text active:scale-95 transition-all"
                        >
                            取消
                        </button>
                        <button 
                            onClick={handleSaveProfile} 
                            className="py-4 rounded-2xl bg-brand-text text-white font-bold text-body-text shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                           <Save size={18}/> 保存更改
                        </button>
                    </div>
                </div>
          </div>
      )}
    </div>
  );
};

// 简单的头像图标分配
const UserIcon: React.FC<{id: number, size: number}> = ({id, size}) => {
    switch(id) {
        case 1: return <Heart size={size} className="fill-current" />;
        case 2: return <Sparkles size={size} />;
        case 3: return <Star size={size} className="fill-current" />;
        case 4: return <MessageSquare size={size} />;
        default: return <Heart size={size} />;
    }
}

export default Profile;