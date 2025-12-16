import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award, Calendar, Clock, Heart, Star, Sparkles } from 'lucide-react';

const MenopauseSummary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-6 pt-10 pb-10 animate-in slide-in-from-right duration-500 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[0%] right-[0%] w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[0%] left-[0%] w-[300px] h-[300px] bg-brand-pink/20 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <button onClick={() => navigate('/home')} className="glass-btn w-12 h-12 active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-2xl font-heading font-extrabold text-brand-text">周期旅程总结</h1>
      </div>

      {/* Hero Card */}
      <div className="glass-panel p-8 rounded-[32px] mb-8 relative overflow-hidden flex flex-col items-center text-center group bg-white/60 border border-white/80 z-10">
         {/* Decorative Gradient Line */}
         <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-200"></div>
         
         <div className="w-28 h-28 rounded-full bg-orange-50 mb-8 flex items-center justify-center text-orange-400 relative border border-orange-100 shadow-inner">
             <Award size={48} />
             <Sparkles size={24} className="absolute top-3 right-3 text-yellow-400 animate-pulse" />
         </div>
         
         <h2 className="text-3xl font-heading font-extrabold text-brand-text mb-4">璀璨篇章</h2>
         <p className="text-brand-text/70 text-sm font-bold leading-relaxed px-2">
             恭喜你完成了这段了不起的生理旅程。<br/>感谢身体 38 年的守护，现在是享受自由、<br/>拥抱自我的"黄金时代"。
         </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-5 mb-8 relative z-10">
          <div className="glass-card p-6 rounded-[24px] flex flex-col items-center justify-center text-center bg-white/50">
              <Calendar className="text-purple-400 mb-3" size={28} />
              <p className="text-xs font-bold text-brand-subtext uppercase tracking-wider mb-2">相伴时光</p>
              <p className="text-3xl font-heading font-extrabold text-brand-text">38 <span className="text-sm font-bold">年</span></p>
          </div>
          <div className="glass-card p-6 rounded-[24px] flex flex-col items-center justify-center text-center bg-white/50">
              <Clock className="text-brand-mintDark mb-3" size={28} />
              <p className="text-xs font-bold text-brand-subtext uppercase tracking-wider mb-2">经历周期</p>
              <p className="text-3xl font-heading font-extrabold text-brand-text">456 <span className="text-sm font-bold">次</span></p>
          </div>
      </div>

      {/* Timeline / Highlights */}
      <div className="glass-panel p-8 rounded-[30px] space-y-10 mb-8 bg-white/40 border border-white/60 relative z-10">
          <h3 className="text-base font-bold text-brand-text mb-2 flex items-center gap-2">
              <Sparkles size={18} className="text-brand-subtext" />
              时光印记
          </h3>
          
          <div className="relative pl-2">
              {/* Vertical Line */}
              <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-brand-subtext/20"></div>

              {/* Item 1 */}
              <div className="flex gap-6 relative mb-8">
                 <div className="w-3.5 h-3.5 rounded-full bg-brand-pink ring-4 ring-white z-10 shrink-0 mt-1.5 shadow-sm"></div>
                 <div>
                     <p className="text-sm font-bold text-brand-subtext mb-1">初潮</p>
                     <p className="text-lg font-bold text-brand-text">1985年 盛夏</p>
                     <p className="text-xs text-brand-text/60 mt-1 font-medium">懵懂的开始，成长的第一步。</p>
                 </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-6 relative mb-8">
                 <div className="w-3.5 h-3.5 rounded-full bg-brand-mint ring-4 ring-white z-10 shrink-0 mt-1.5 shadow-sm"></div>
                 <div>
                     <p className="text-sm font-bold text-brand-subtext mb-1">平均周期</p>
                     <p className="text-lg font-bold text-brand-text">29 天 / 5 天</p>
                     <p className="text-xs text-brand-text/60 mt-1 font-medium">规律的律动，生命的节奏。</p>
                 </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-6 relative">
                 <div className="w-3.5 h-3.5 rounded-full bg-orange-300 ring-4 ring-white z-10 shrink-0 mt-1.5 shadow-sm"></div>
                 <div>
                     <p className="text-sm font-bold text-brand-subtext mb-1">绝经</p>
                     <p className="text-lg font-bold text-brand-text">2023年 秋季</p>
                     <p className="text-xs text-brand-text/60 mt-1 font-medium">自然的告别，优雅的转身。</p>
                 </div>
              </div>
          </div>
      </div>

      {/* Self Care Tip for Menopause */}
      <div className="relative z-10">
           <div className="flex items-center gap-2 mb-5">
               <Heart size={20} className="text-brand-pinkDark" />
               <h3 className="text-base font-bold text-brand-text">呵护建议</h3>
           </div>
           <div className="glass-card p-6 rounded-[24px] flex gap-5 items-start bg-white/50">
               <div className="w-12 h-12 shrink-0 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                   <Star size={24} />
               </div>
               <div>
                   <h4 className="text-sm font-bold text-brand-text mb-2">骨骼健康与情绪管理</h4>
                   <p className="text-xs text-brand-text/70 leading-relaxed font-medium">
                       建议定期补充钙质和维生素D，预防骨质疏松；保持规律的负重运动（如快走），维持肌肉力量。多参与社交活动，保持心情愉悦。
                   </p>
               </div>
           </div>
      </div>
    </div>
  );
};

export default MenopauseSummary;