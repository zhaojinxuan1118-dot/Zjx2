import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Award, Calendar, Clock, Heart, Star, Sparkles, TrendingUp } from 'lucide-react';

const MenopauseSummary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-bg px-6 pt-10 pb-10 animate-in slide-in-from-right duration-500 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[0%] right-[0%] w-[400px] h-[400px] bg-brand-pink/10 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[0%] left-[0%] w-[300px] h-[300px] bg-brand-mint/10 rounded-full blur-[90px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <button onClick={() => navigate('/home')} className="glass-btn w-12 h-12 active:scale-95">
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-main-title font-heading font-extrabold text-brand-text">周期旅程</h1>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Main Summary Card */}
        <div className="glass-panel p-8 rounded-[32px] bg-white/40 border border-white/60">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-pinkDark/10 text-brand-pinkDark flex items-center justify-center border border-brand-pinkDark/20">
                    <Sparkles size={22} />
                </div>
                <div>
                    <h2 className="text-sub-title font-bold text-brand-text">身体里程碑</h2>
                    <p className="text-annotation font-bold text-brand-subtext">过去 6 个月的数据洞察</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/40 p-4 rounded-2xl border border-white/60">
                    <p className="text-annotation font-bold text-brand-subtext mb-1">平均周期</p>
                    <p className="text-main-title font-extrabold text-brand-text">28<span className="text-annotation font-normal text-brand-subtext ml-1">天</span></p>
                </div>
                <div className="bg-white/40 p-4 rounded-2xl border border-white/60">
                    <p className="text-annotation font-bold text-brand-subtext mb-1">经期长度</p>
                    <p className="text-main-title font-extrabold text-brand-text">5<span className="text-annotation font-normal text-brand-subtext ml-1">天</span></p>
                </div>
            </div>

            <p className="text-body-text text-brand-text/80 leading-relaxed font-bold">
                你的周期非常规律，正如月亮的盈亏。这显示你的内分泌系统处于非常健康和平稳的状态。
            </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 gap-4">
            <div className="glass-card p-5 rounded-[24px] flex items-center gap-4 bg-white/40">
                <div className="w-12 h-12 rounded-full bg-orange-50/50 text-orange-400 flex items-center justify-center border border-orange-100 shrink-0">
                    <Award size={22} />
                </div>
                <div>
                    <h3 className="text-body-text font-bold text-brand-text">自我关爱达人</h3>
                    <p className="text-annotation text-brand-subtext font-bold mt-1">连续 3 个月记录了完整的心情日志。</p>
                </div>
            </div>

            <div className="glass-card p-5 rounded-[24px] flex items-center gap-4 bg-white/40">
                <div className="w-12 h-12 rounded-full bg-blue-50/50 text-blue-400 flex items-center justify-center border border-blue-100 shrink-0">
                    <TrendingUp size={22} />
                </div>
                <div>
                    <h3 className="text-body-text font-bold text-brand-text">症状缓解</h3>
                    <p className="text-annotation text-brand-subtext font-bold mt-1">痛经症状较上月减轻了 20%。</p>
                </div>
            </div>
        </div>

        {/* Prediction */}
        <div className="glass-panel p-6 rounded-[30px] bg-white/40">
            <div className="flex items-center gap-3 mb-4">
                 <Calendar size={20} className="text-brand-subtext" />
                 <h3 className="text-sub-title font-bold text-brand-text">下个阶段</h3>
            </div>
            <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white/60">
                 <div>
                     <p className="text-body-text font-bold text-brand-text">排卵期</p>
                     <p className="text-annotation text-brand-subtext font-bold mt-1">预计 4 天后开始</p>
                 </div>
                 <div className="px-4 py-2 rounded-full bg-brand-mint/20 text-brand-mintDark text-annotation font-bold border border-brand-mint/30">
                     精力充沛
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MenopauseSummary;