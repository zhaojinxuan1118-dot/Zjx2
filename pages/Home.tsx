import React, { useState, useEffect } from 'react';
import { Menu, Droplets, Activity, Calendar as CalendarIcon, Sun, Heart, MoreHorizontal, ScrollText, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportDrawer from '../components/ReportDrawer';
import { CyclePhase } from '../types';
import { PHASE_COLORS, PHASE_DESCRIPTIONS } from '../constants';
import { generateDailyInsight } from '../services/geminiService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [insight, setInsight] = useState('AI 正在分析今日状态...');
  
  const currentDay = 12;
  const currentPhase = CyclePhase.Follicular;
  const daysUntilNext = 16;
  const phaseName = PHASE_DESCRIPTIONS[currentPhase];

  useEffect(() => {
    generateDailyInsight(currentPhase, [], ['活力']).then(setInsight);
  }, [currentPhase]);

  return (
    <div className="min-h-screen px-6 pt-10 relative overflow-hidden bg-[#F5F7FA]">
      <ReportDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      {/* Ambient Background for Glass Effect */}
      <div className="absolute top-[-5%] right-[-10%] w-[350px] h-[350px] bg-brand-mint/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute top-[30%] left-[-15%] w-[300px] h-[300px] bg-brand-pink/20 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-10 relative z-10">
        <div 
            onClick={() => navigate('/profile')}
            className="glass-btn px-6 py-3 rounded-full flex items-center gap-4 cursor-pointer hover:bg-white/40 transition-colors"
        >
            <div className="w-8 h-8 rounded-full bg-brand-pink/30 flex items-center justify-center text-brand-pinkDark backdrop-blur-sm">
                <User size={16} />
            </div>
            <span className="text-base font-bold text-brand-text/80">早上好, Luna</span>
        </div>
        <button onClick={() => setDrawerOpen(true)} className="glass-btn w-12 h-12">
            <Menu size={22} />
        </button>
      </div>

      {/* Main Cycle Dial - Glass Style */}
      <div className="flex flex-col items-center justify-center mb-12 relative z-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
             {/* Outer Glass Ring */}
             <div className="absolute inset-0 rounded-full border border-white/60 bg-white/20 backdrop-blur-md shadow-lg"></div>
             
             {/* Inner Ring */}
             <div className="absolute inset-4 rounded-full border border-white/40 bg-white/10 flex items-center justify-center backdrop-blur-sm">
                 {/* Center Content */}
                 <div className="w-40 h-40 rounded-full bg-gradient-to-b from-white/80 to-white/40 shadow-inner flex flex-col items-center justify-center z-10 border border-white/60">
                     <span className="text-sm font-bold text-brand-subtext mb-1 tracking-widest uppercase">Day</span>
                     <span className="text-6xl font-heading font-extrabold text-brand-text drop-shadow-sm">{currentDay}</span>
                     <span className="text-sm font-bold text-brand-pinkDark mt-2 bg-brand-pink/10 px-4 py-1.5 rounded-full border border-brand-pink/20">{phaseName}</span>
                 </div>
             </div>
        </div>
        
        <div className="mt-8 flex gap-4">
            <div className="glass-card px-8 py-4 rounded-full flex items-center gap-3">
                <CalendarIcon size={18} className="text-brand-text/60" />
                <span className="text-sm font-bold text-brand-text">下次经期: <span className="text-brand-pinkDark">{daysUntilNext}天后</span></span>
            </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
         {/* Period Prediction Card */}
         <div className="glass-card p-6 flex flex-col items-center justify-center aspect-[4/3] relative overflow-hidden group">
             <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-brand-mint shadow-sm"></div>
             <Droplets size={28} className="text-brand-mintDark mb-3" />
             <h3 className="text-sm font-bold text-brand-subtext uppercase tracking-wider">经期预测</h3>
             <p className="text-xl font-bold text-brand-text mt-1">准时</p>
         </div>

         {/* Body Status Card */}
         <div className="glass-card p-6 flex flex-col items-center justify-center aspect-[4/3] relative overflow-hidden">
             <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-brand-pink shadow-sm"></div>
             <Activity size={28} className="text-brand-pinkDark mb-3" />
             <h3 className="text-sm font-bold text-brand-subtext uppercase tracking-wider">今日状态</h3>
             <p className="text-xl font-bold text-brand-text mt-1">活力充沛</p>
         </div>
      </div>

      {/* Menopause Summary Entry Card */}
      <div 
        onClick={() => navigate('/menopause-summary')}
        className="glass-card p-5 rounded-[24px] flex items-center justify-between mb-8 cursor-pointer active:scale-[0.98] transition-all relative z-10 group bg-gradient-to-r from-white/40 to-white/10"
      >
          <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/50 border border-white/60 text-purple-400 flex items-center justify-center shadow-sm">
                  <ScrollText size={24} />
              </div>
              <div>
                  <h3 className="text-base font-bold text-brand-text">周期旅程总结</h3>
                  <p className="text-xs text-brand-subtext font-bold mt-1">查看你的身体里程碑报告</p>
              </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-brand-subtext">
               <ChevronRight size={20} />
          </div>
      </div>

      {/* Large Insight Card */}
      <div className="glass-card p-7 rounded-[30px] relative overflow-hidden mb-8 z-10 border-t border-l border-white/80">
        <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-400">
                    <Sun size={22} />
                </div>
                <h3 className="font-bold text-lg text-brand-text">每日贴士</h3>
            </div>
            <MoreHorizontal size={24} className="text-brand-subtext" />
        </div>
        
        <p className="text-base text-brand-text/80 leading-relaxed font-medium pl-3 border-l-4 border-brand-pink/50">
            {insight}
        </p>
        
        <div className="mt-6 flex gap-3">
             <span className="px-4 py-1.5 rounded-full bg-white/40 border border-white/50 text-xs font-bold text-brand-subtext">#自爱</span>
             <span className="px-4 py-1.5 rounded-full bg-white/40 border border-white/50 text-xs font-bold text-brand-subtext">#健康</span>
        </div>
      </div>
    </div>
  );
};

export default Home;