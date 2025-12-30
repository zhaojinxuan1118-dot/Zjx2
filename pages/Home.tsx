import React, { useState, useEffect } from 'react';
import { 
  Menu, Calendar as CalendarIcon, ChevronRight, FlaskConical, 
  Bell, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReportDrawer from '../components/ReportDrawer';
import { CyclePhase } from '../types';
import { PHASE_DESCRIPTIONS } from '../constants';
import { generateDailyInsight } from '../services/geminiService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [insight, setInsight] = useState('AI 正在 analysis 今日状态...');
  
  const currentDay = 12;
  const phase = CyclePhase.Follicular;
  const phaseName = PHASE_DESCRIPTIONS[phase];

  useEffect(() => {
    generateDailyInsight(phase, [], ['活力']).then(text => {
      setInsight(text.replace(/\*/g, ''));
    });
  }, []);

  return (
    <div className="min-h-screen px-[18px] pt-0 pb-32 relative overflow-hidden bg-brand-bg">
      <ReportDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      
      {/* Header */}
      <div className="h-[44px] flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white shadow-neu-sm flex items-center justify-center overflow-hidden p-0.5">
             <div className="w-full h-full bg-gradient-to-br from-brand-pink/20 to-brand-mint/20 rounded-full"></div>
          </div>
          <div>
            <p className="text-[15px] font-extrabold text-brand-text leading-none">Hi Luna</p>
            <p className="text-[11px] font-bold text-brand-subtext mt-0.5">今日自愈指南</p>
          </div>
        </div>
        
        <div className="flex gap-2">
            <button onClick={() => navigate('/experimental')} className="neu-icon-btn w-10 h-10">
                <FlaskConical size={18} />
            </button>
            <button onClick={() => setDrawerOpen(true)} className="neu-icon-btn w-10 h-10">
                <Menu size={18} />
            </button>
        </div>
      </div>

      {/* Cycle Dial Container */}
      <div className="flex flex-col items-center justify-center mb-10 relative z-10 fade-in">
        <div className="relative w-72 h-72 flex items-center justify-center">
             
             {/* 紧致的磨砂玻璃透光背景层 - 色值为活力橙 #FF8C5A */}
             {/* 第一层：基础氛围橙色光晕 (#FF8C5A @ 30% 不透明度) */}
             <div className="absolute w-[110%] h-[110%] bg-[#FF8C5A]/30 rounded-full blur-[60px] -z-10"></div>
             {/* 第二层：核心发光点 (#FF8C5A @ 50% 不透明度) */}
             <div className="absolute w-[85%] h-[85%] bg-[#FF8C5A]/50 rounded-full blur-[40px] -z-10 animate-pulse transition-all duration-1000"></div>

             {/* Neumorphic Dial */}
             <div className="absolute inset-4 rounded-full neu-flat"></div>
             <div className="absolute inset-10 rounded-full neu-pressed flex items-center justify-center">
                 <div className="w-40 h-40 rounded-full bg-brand-bg flex flex-col items-center justify-center z-10">
                     <span className="text-annotation font-bold text-brand-subtext mb-1 tracking-widest uppercase">Cycle Day</span>
                     <span className="text-6xl font-heading font-extrabold text-brand-text leading-none">{currentDay}</span>
                     
                     <div className="mt-5">
                        <div 
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full shadow-md text-white font-extrabold text-[11px] transition-all" 
                          style={{ backgroundColor: '#FF8C5A' }}
                        >
                            <Sparkles size={11} fill="currentColor" />
                            {phaseName}
                        </div>
                     </div>
                 </div>
             </div>
        </div>
      </div>

      {/* Calendar Entry */}
      <div 
        onClick={() => navigate('/calendar')}
        className="neu-flat p-6 mb-6 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all fade-in"
      >
          <div className="flex items-center gap-5">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-colors"
                style={{ backgroundColor: 'rgba(255, 140, 90, 0.12)', color: '#FF8C5A' }}
              >
                  <CalendarIcon size={24} />
              </div>
              <div>
                  <h3 className="text-body-text font-bold text-brand-text">生理期日历</h3>
                  <p className="text-annotation text-brand-subtext font-bold">精准预测与健康洞察</p>
              </div>
          </div>
          <ChevronRight size={20} className="text-brand-subtext" />
      </div>

      {/* AI Card - 修改边框为草绿色 */}
      <div className="neu-flat p-6 relative overflow-hidden mb-6 border-l-[6px] border-brand-mint fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-brand-mint/10 rounded-lg text-brand-mintDark">
                <Bell size={20} />
            </div>
            <h3 className="font-extrabold text-annotation uppercase tracking-wider text-brand-text/50">AI 智能调理建议</h3>
        </div>
        <p className="text-[16px] text-brand-text font-bold leading-relaxed">
            {insight}
        </p>
      </div>

    </div>
  );
};

export default Home;