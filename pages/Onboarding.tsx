import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, User, Ruler, Weight, Plus, Minus, Info } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // 身体数据状态 (Step 1)
  const [age, setAge] = useState<string>('25');
  const [height, setHeight] = useState<string>('165');
  const [weight, setWeight] = useState<string>('50');
  
  // 周期记录状态 (Step 2)
  const [lastPeriodEnd, setLastPeriodEnd] = useState('');
  const [periodDays, setPeriodDays] = useState(5);
  const [cycleDays, setCycleDays] = useState(28);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate('/loading');
    }
  };

  const adjustPeriod = (delta: number) => {
    setPeriodDays(prev => Math.max(2, Math.min(14, prev + delta)));
  };

  const adjustCycle = (delta: number) => {
    setCycleDays(prev => Math.max(21, Math.min(45, prev + delta)));
  };

  return (
    <div className="min-h-screen bg-brand-bg px-[14px] pt-12 pb-10 flex flex-col relative overflow-hidden">
      {/* 动态背景光效 */}
      <div className="absolute top-[-5%] right-[-10%] w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-48 h-48 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* 进度条指示器 */}
      <div className="px-2 mb-10">
        <div className="w-full h-1.5 bg-brand-shadowDark/30 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-brand-pinkDark rounded-full transition-all duration-700 ease-in-out" 
              style={{ width: `${(step/2)*100}%` }}
            ></div>
        </div>
        <div className="flex justify-between mt-3 px-1">
            <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${step >= 1 ? 'text-brand-pinkDark' : 'text-brand-subtext'}`}>基础指标</span>
            <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${step >= 2 ? 'text-brand-pinkDark' : 'text-brand-subtext'}`}>周期设置</span>
        </div>
      </div>

      <div className="flex-1 px-2">
        {step === 1 ? (
          <div className="fade-in flex flex-col h-full">
            <h2 className="text-main-title font-heading font-extrabold text-brand-text mb-2">定制你的方案</h2>
            <p className="text-annotation font-bold text-brand-subtext mb-12">请填写你的基础身体数据，以便我们提供精准建议</p>
            
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5">
                    {/* 年龄输入 */}
                    <div className="glass-panel p-5 flex items-center gap-4 bg-white/40 border-white/60 shadow-sm active:scale-[0.99] transition-transform">
                        <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 text-brand-pinkDark flex items-center justify-center">
                            <User size={22} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-extrabold text-brand-subtext uppercase tracking-widest mb-1">年龄 (岁)</p>
                            <input 
                                type="number" 
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full bg-transparent outline-none text-body-text font-extrabold text-brand-text"
                                placeholder="请输入年龄"
                            />
                        </div>
                    </div>

                    {/* 身高输入 */}
                    <div className="glass-panel p-5 flex items-center gap-4 bg-white/40 border-white/60 shadow-sm active:scale-[0.99] transition-transform">
                        <div className="w-12 h-12 rounded-2xl bg-brand-mint/10 text-brand-mintDark flex items-center justify-center">
                            <Ruler size={22} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-extrabold text-brand-subtext uppercase tracking-widest mb-1">身高 (cm)</p>
                            <input 
                                type="number" 
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full bg-transparent outline-none text-body-text font-extrabold text-brand-text"
                                placeholder="请输入身高"
                            />
                        </div>
                    </div>

                    {/* 体重输入 */}
                    <div className="glass-panel p-5 flex items-center gap-4 bg-white/40 border-white/60 shadow-sm active:scale-[0.99] transition-transform">
                        <div className="w-12 h-12 rounded-2xl bg-brand-bg text-brand-text/30 flex items-center justify-center border border-brand-shadowDark/20">
                            <Weight size={22} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-extrabold text-brand-subtext uppercase tracking-widest mb-1">体重 (kg)</p>
                            <input 
                                type="number" 
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full bg-transparent outline-none text-body-text font-extrabold text-brand-text"
                                placeholder="请输入体重"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-5 bg-brand-mint/10 rounded-2xl border border-brand-mint/20 text-center">
                 <p className="text-annotation font-bold text-brand-mintDark leading-relaxed italic">
                     “这些数据将用于更精准地分析你的 BMI 和基础代谢率”
                 </p>
            </div>
          </div>
        ) : (
          <div className="fade-in space-y-6">
            <h2 className="text-main-title font-heading font-extrabold text-brand-text mb-2">追踪经期习惯</h2>
            <p className="text-annotation font-bold text-brand-subtext mb-8">这些信息能帮助 AI 建立专属于你的生理时钟</p>
            
            {/* 日期选择区 */}
            <div className="glass-panel p-8 flex flex-col items-center bg-white/60 border-white/80 shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/5 to-transparent pointer-events-none"></div>
                <div className="w-16 h-16 rounded-full bg-brand-pink/20 text-brand-pinkDark flex items-center justify-center mb-6 shadow-inner relative z-10">
                    <Calendar size={28} />
                </div>
                
                <div className="w-full relative z-10 text-center">
                    <p className="text-annotation font-extrabold text-brand-subtext uppercase tracking-[0.25em] mb-4">上次月经开始日期</p>
                    <div className="glass-card p-4 w-full text-center border-brand-pink/20 hover:border-brand-pink/50 transition-colors bg-white/60">
                        <input 
                            type="date" 
                            value={lastPeriodEnd}
                            onChange={(e) => setLastPeriodEnd(e.target.value)}
                            className="w-full bg-transparent outline-none font-extrabold text-[18px] text-brand-text text-center"
                        />
                    </div>
                </div>
            </div>
            
            {/* 周期时长设置 */}
            <div className="space-y-4">
                 {/* 经期持续天数 */}
                 <div className="glass-card p-5 bg-white/40 border border-white/60 flex items-center justify-between">
                     <div>
                         <p className="text-annotation font-extrabold text-brand-subtext uppercase tracking-widest">经期天数</p>
                         <p className="text-[10px] text-brand-subtext/60 mt-0.5">通常为 3-7 天</p>
                     </div>
                     <div className="flex items-center gap-6">
                         <button 
                            onClick={() => adjustPeriod(-1)}
                            className="w-10 h-10 rounded-full border border-brand-pink/30 flex items-center justify-center text-brand-pinkDark active:scale-90 transition-all hover:bg-brand-pink/10"
                         >
                             <Minus size={18} />
                         </button>
                         <span className="text-body-text font-extrabold text-brand-text min-w-[3rem] text-center">{periodDays} 天</span>
                         <button 
                            onClick={() => adjustPeriod(1)}
                            className="w-10 h-10 rounded-full bg-brand-pinkDark text-white flex items-center justify-center shadow-md active:scale-90 transition-all"
                         >
                             <Plus size={18} />
                         </button>
                     </div>
                 </div>

                 {/* 周期跨度天数 */}
                 <div className="glass-card p-5 bg-white/40 border border-white/60 flex items-center justify-between">
                     <div>
                         <p className="text-annotation font-extrabold text-brand-subtext uppercase tracking-widest">周期长度</p>
                         <p className="text-[10px] text-brand-subtext/60 mt-0.5">通常为 25-35 天</p>
                     </div>
                     <div className="flex items-center gap-6">
                         <button 
                            onClick={() => adjustCycle(-1)}
                            className="w-10 h-10 rounded-full border border-brand-mintDark/30 flex items-center justify-center text-brand-mintDark active:scale-90 transition-all hover:bg-brand-mint/10"
                         >
                             <Minus size={18} />
                         </button>
                         <span className="text-body-text font-extrabold text-brand-text min-w-[3rem] text-center">{cycleDays} 天</span>
                         <button 
                            onClick={() => adjustCycle(1)}
                            className="w-10 h-10 rounded-full bg-brand-mintDark text-white flex items-center justify-center shadow-md active:scale-90 transition-all"
                         >
                             <Plus size={18} />
                         </button>
                     </div>
                 </div>
            </div>

            <div className="flex items-center gap-2 px-2 opacity-60">
                <Info size={14} className="text-brand-subtext" />
                <p className="text-[10px] font-bold text-brand-subtext">你可以随时在“设置”中修改这些数据</p>
            </div>
          </div>
        )}
        
        {/* 移动到这里的按钮容器，取消了 mt-auto 并添加了 mt-10 */}
        <div className="px-2 mt-10">
          <button 
            onClick={handleNext} 
            className="w-full py-5 rounded-[28px] bg-brand-text text-white font-extrabold flex items-center justify-center gap-3 shadow-2xl active:scale-[0.98] transition-all hover:bg-brand-text/95"
          >
              <span className="tracking-widest">{step === 1 ? '确认并下一步' : '开启我的健康旅程'}</span>
              <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;