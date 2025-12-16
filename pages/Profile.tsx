import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, User, Save, Ruler, Weight, CalendarClock, Clock, Sparkles } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  
  // State for user profile
  const [nickname, setNickname] = useState('Luna');
  const [age, setAge] = useState('25');
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('50');
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');

  const handleSave = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-6 pt-10 pb-10 animate-in slide-in-from-right duration-500 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[10%] w-[300px] h-[300px] bg-blue-100 rounded-full blur-[80px] pointer-events-none opacity-60"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[250px] h-[250px] bg-brand-pink/20 rounded-full blur-[80px] pointer-events-none opacity-60"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <button onClick={() => navigate('/home')} className="glass-btn w-12 h-12 active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-2xl font-heading font-extrabold text-brand-text">个人档案</h1>
        <div className="w-12"></div> {/* Spacer for centering */}
      </div>

      <div className="space-y-10 relative z-10">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
            <div className="relative group cursor-pointer">
                <div className="w-32 h-32 rounded-full glass-card flex items-center justify-center overflow-hidden border-4 border-white/50 shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-brand-pink/10 to-brand-mint/10 flex items-center justify-center text-brand-text/30">
                        <User size={56} />
                    </div>
                </div>
                {/* Camera Badge */}
                <div className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-brand-pinkDark text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Camera size={18} />
                </div>
            </div>
            
            <div className="mt-8 w-full max-w-xs">
                <div className="glass-card px-5 py-4 rounded-2xl flex items-center gap-4 bg-white/40">
                    <User size={20} className="text-brand-subtext" />
                    <input 
                        type="text" 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="bg-transparent border-none outline-none text-center font-heading font-extrabold text-xl text-brand-text flex-1"
                    />
                    <Sparkles size={20} className="text-brand-pinkDark/50" />
                </div>
            </div>
        </div>

        {/* Basic Info Section */}
        <div className="space-y-4">
            <h3 className="ml-2 text-sm font-bold text-brand-subtext uppercase tracking-wider">基础信息</h3>
            
            <div className="glass-panel p-6 rounded-[30px] space-y-6">
                {/* Age */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                            <User size={18} />
                        </div>
                        <span className="text-base font-bold text-brand-text">年龄</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-20 text-right bg-transparent border-b border-brand-subtext/30 focus:border-brand-pinkDark outline-none font-bold text-brand-text text-xl"
                        />
                        <span className="text-sm font-bold text-brand-subtext">岁</span>
                    </div>
                </div>

                {/* Height */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 border border-orange-100">
                            <Ruler size={18} />
                        </div>
                        <span className="text-base font-bold text-brand-text">身高</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-20 text-right bg-transparent border-b border-brand-subtext/30 focus:border-brand-pinkDark outline-none font-bold text-brand-text text-xl"
                        />
                        <span className="text-sm font-bold text-brand-subtext">cm</span>
                    </div>
                </div>

                {/* Weight */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100">
                            <Weight size={18} />
                        </div>
                        <span className="text-base font-bold text-brand-text">体重</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-20 text-right bg-transparent border-b border-brand-subtext/30 focus:border-brand-pinkDark outline-none font-bold text-brand-text text-xl"
                        />
                        <span className="text-sm font-bold text-brand-subtext">kg</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Cycle Settings Section */}
        <div className="space-y-4">
            <h3 className="ml-2 text-sm font-bold text-brand-subtext uppercase tracking-wider">周期设置</h3>
            
            <div className="glass-panel p-6 rounded-[30px] space-y-6">
                {/* Cycle Length */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pinkDark border border-brand-pink/20">
                            <CalendarClock size={18} />
                        </div>
                        <span className="text-base font-bold text-brand-text">平均周期长度</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={cycleLength}
                            onChange={(e) => setCycleLength(e.target.value)}
                            className="w-20 text-right bg-transparent border-b border-brand-subtext/30 focus:border-brand-pinkDark outline-none font-bold text-brand-text text-xl"
                        />
                        <span className="text-sm font-bold text-brand-subtext">天</span>
                    </div>
                </div>

                {/* Period Length */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 border border-purple-100">
                            <Clock size={18} />
                        </div>
                        <span className="text-base font-bold text-brand-text">经期持续天数</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input 
                            type="number" 
                            value={periodLength}
                            onChange={(e) => setPeriodLength(e.target.value)}
                            className="w-20 text-right bg-transparent border-b border-brand-subtext/30 focus:border-brand-pinkDark outline-none font-bold text-brand-text text-xl"
                        />
                        <span className="text-sm font-bold text-brand-subtext">天</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSave}
        className="w-full py-5 rounded-[24px] bg-brand-pinkDark text-white font-extrabold text-lg flex items-center justify-center gap-3 mt-10 shadow-lg shadow-brand-pink/30 active:scale-[0.98] transition-transform relative z-10"
      >
          <Save size={22} />
          保存更改
      </button>

    </div>
  );
};

export default Profile;