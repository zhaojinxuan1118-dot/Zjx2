import React, { useState } from 'react';
import { 
  Info, Lightbulb, HeartPulse, Sparkles, ChevronRight, X, BookOpen, Share2, Bookmark
} from 'lucide-react';
import { CyclePhase } from '../types';
import { PHASE_DESCRIPTIONS } from '../constants';

interface KnowledgeContent {
  cognition: string[];
  insight: string;
  support: string;
  fullGuide: {
    title: string;
    subtitle: string;
    sections: { title: string; content: string }[];
  };
}

const PHASE_KNOWLEDGE: Record<CyclePhase, KnowledgeContent> = {
  [CyclePhase.Menstrual]: {
    cognition: ['雌激素与孕酮水平降至最低', '子宫内膜脱落形成经血', '下丘脑开始分泌GnRH促使新周期开始'],
    insight: '根据你的记录，经期前三天的疲劳感与体温下降趋势吻合。这通常是由于前列腺素水平升高引起的。',
    support: '缓解痛经：尝试温热敷、轻柔腹部按摩；若出现异常血块或超过7天的出血，建议预约妇科检查。',
    fullGuide: {
      title: '月经期：深度调理与自愈指南',
      subtitle: '不仅仅是多喝热水，更是一场身体的重塑',
      sections: [
        { title: '科学补铁', content: '经期流失大量血液，补铁不仅是为了脸色红润，更是为了维持心肌力量。建议摄入红肉、动物肝脏，并搭配富含维C的橙汁促进吸收。' },
        { title: '运动禁忌', content: '此时盆腔充血，应避免剧烈跑跳及任何倒立动作，防止经血逆流。推荐轻柔的猫式伸展。' },
        { title: '痛经机制', content: '前列腺素分泌过多是元凶。如果痛感剧烈，提前服用非甾体抗炎药比忍痛更有科学依据。' }
      ]
    }
  },
  [CyclePhase.Follicular]: {
    cognition: ['卵泡刺激素(FSH)上升', '子宫内膜开始增厚', '身体能量水平逐渐回升'],
    insight: '进入卵泡期后，你的步数记录通常会增加 30%。这是雌激素上升带来的自然活力提升。',
    support: '生活导航：此阶段适合开启新的运动计划；营养建议增加优质蛋白摄入，支持卵泡发育。',
    fullGuide: {
      title: '卵泡期：能量储备与活力的上升期',
      subtitle: '雌激素水平上升的焕新期，伴随精力提升和思维清晰度的提升',
      sections: [
        { title: '代谢高峰', content: '随着卵巢内卵泡发育，雌激素水平稳步攀升。它如同自然的能量催化剂，通常能提振情绪、提升思维清晰度与体能。建议：这段时间在运动上可以多进行高强度间歇训练。' },
        { title: '大脑认知', content: '空间逻辑能力在此阶段达到巅峰。适合处理复杂的财务计划或者学习新的技能。' },
        { title: '护肤逻辑', content: '皮脂腺分泌适中，角质层健康，是进行医美护理或尝试高浓度护肤品的最佳时机。' }
      ]
    }
  },
  [CyclePhase.Ovulation]: {
    cognition: ['黄体生成素(LH)达到峰值', '卵子从卵泡中释放', '基础体温会出现微小波动'],
    insight: '你的排卵期通常伴随轻微的心情波动，AI 建议在此期间保持充足水分以缓解可能的排卵痛。',
    support: '备孕指南：这是受孕概率最高的窗口期；若有避孕需求，请务必采取严格措施。',
    fullGuide: {
      title: '排卵期：体温升高与状态巅峰期',
      subtitle: '身心进入短暂的高敏感与高能量状态，适合表达、创造和决策',
      sections: [
        { title: '代谢调整', content: '代谢活跃的短暂高峰。伴随卵细胞的释放，核心体温开始上升，身体处于高效能模式。建议：这段时间可以利用巅峰状态，进行爆发力或技巧训练。' },
        { title: '大脑认知', content: '直觉敏锐，信心增强。社交认知与风险偏好达峰，适合决策、创意与关键沟通。' },
        { title: '魅力巅峰', content: '研究表明，排卵期女性的声音频率和体味会变得更具吸引力。' }
      ]
    }
  },
  [CyclePhase.Luteal]: {
    cognition: ['孕酮水平显著升高', '子宫内膜变得极其肥厚', '新陈代谢速度轻微加快'],
    insight: '趋势分析：你的睡眠质量在黄体期末尾会有所下降，这与孕酮水平回落导致的中枢系统敏感有关。',
    support: '舒缓建议：针对经前综合症(PMS)，建议低盐饮食，尝试镁补充剂或睡前冥想以改善睡眠。',
    fullGuide: {
      title: '黄体期：代谢升高与情绪调节期',
      subtitle: '身体代谢升高，情绪与感受更细腻，需要关照自身的内在变化',
      sections: [
        { title: '代谢调整', content: '在孕激素作用下，基础体温维持在高位，身体静息能量消耗增加。建议：这段时间可以多进行中等强度稳态有氧。' },
        { title: '大脑认知', content: '孕激素主导，认知趋稳。更注重细节与风险规避，适合精细工作、审阅与流程优化。' },
        { title: '水肿管理', content: '由于激素波动导致水钠潴留。减少加工食品摄入，多吃香蕉、冬瓜等高钾食物有助于消肿。' }
      ]
    }
  }
};

const Knowledge: React.FC = () => {
  const [activePhase, setActivePhase] = useState<CyclePhase>(CyclePhase.Menstrual);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const phases = [
    CyclePhase.Ovulation,
    CyclePhase.Menstrual,
    CyclePhase.Luteal,
    CyclePhase.Follicular
  ];

  const content = PHASE_KNOWLEDGE[activePhase];

  const getPhaseTheme = (phase: CyclePhase) => {
    switch (phase) {
      case CyclePhase.Menstrual: return { light: '#FFE8E0', main: '#FF8C5A', dark: '#E67645' };
      case CyclePhase.Follicular: return { light: '#FCE4EC', main: '#E6B5A6', dark: '#C98D7C' };
      case CyclePhase.Ovulation: return { light: '#E9F5D5', main: '#A2D149', dark: '#8BB738' };
      case CyclePhase.Luteal: return { light: '#FDF2B3', main: '#FFD900', dark: '#D9B500' };
      default: return { light: '#F3F4F6', main: '#9CA3AF', dark: '#4B5563' };
    }
  };

  const theme = getPhaseTheme(activePhase);

  return (
    <div className="min-h-screen bg-brand-bg pt-12 pb-32 relative overflow-hidden flex flex-col font-sans">
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="px-6 mb-8 relative z-10">
        <h1 className="text-main-title font-heading font-extrabold text-brand-text mb-1">自我知悉</h1>
        <p className="text-annotation font-bold text-brand-subtext uppercase tracking-[0.2em] mt-1">LUNAFLOW KNOWLEDGE HUB</p>
      </div>

      <div className="px-6 mb-8 relative z-10">
        <div className="flex justify-between items-center border-b border-brand-shadowDark/20">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={`pb-4 text-body-text font-bold transition-all duration-300 relative ${
                activePhase === phase ? 'text-brand-text' : 'text-brand-subtext opacity-50'
              }`}
            >
              {PHASE_DESCRIPTIONS[phase]}
              {activePhase === phase && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-1 bg-brand-pinkDark rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 gap-5 pb-8 relative z-10">
        <div 
          onClick={() => setIsDrawerOpen(true)}
          className="min-w-[280px] w-[75%] shrink-0 snap-center glass-panel p-6 flex flex-col h-[420px] shadow-sm border-white/80 bg-white/40 cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-text/5 flex items-center justify-center text-brand-text">
              <Info size={20} />
            </div>
            <div>
              <h3 className="text-body-text font-extrabold text-brand-text">认知 · 基础</h3>
              <p className="text-annotation text-brand-subtext font-bold uppercase">Physiology</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
            {content.cognition.map((text, i) => (
              <div key={i} className="flex gap-3 items-start p-3 rounded-xl bg-white/20">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-text/20 mt-2 shrink-0"></div>
                <p className="text-[16px] text-brand-text/80 font-bold leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between opacity-30">
            <span className="text-[13px] font-bold">01 / 03</span>
            <ChevronRight size={14} />
          </div>
        </div>

        <div className="min-w-[280px] w-[75%] shrink-0 snap-center glass-panel p-6 flex flex-col h-[420px] shadow-md border-white/80 bg-white/60">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-mint/20 flex items-center justify-center text-brand-mintDark">
              <Lightbulb size={20} />
            </div>
            <div>
              <h3 className="text-body-text font-extrabold text-brand-text">洞察 · 专属</h3>
              <p className="text-annotation text-brand-subtext font-bold uppercase">AI Insights</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 bg-white/30 rounded-2xl border border-white/50 border-l-4 border-brand-mint">
            <p className="text-[18px] text-brand-text font-bold leading-relaxed italic text-center">
              “{content.insight}”
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between opacity-30">
            <span className="text-[13px] font-bold">02 / 03</span>
            <ChevronRight size={14} />
          </div>
        </div>

        <div className="min-w-[280px] w-[75%] shrink-0 snap-center glass-panel p-6 flex flex-col h-[420px] shadow-sm border-white/80 bg-white/40">
          <div className="flex items-center gap-3 mb-4 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-brand-pink/20 flex items-center justify-center text-brand-pinkDark">
              <HeartPulse size={20} />
            </div>
            <div>
              <h3 className="text-body-text font-extrabold text-brand-text">支持 · 导航</h3>
              <p className="text-annotation text-brand-subtext font-bold uppercase">Guidance</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-[17px] text-brand-text/80 font-bold leading-relaxed mb-auto">
              {content.support}
            </p>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="w-full py-4 mt-6 rounded-xl bg-brand-text text-white font-bold text-annotation uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-black/5"
            >
              获取完整指南
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between opacity-30">
            <span className="text-[13px] font-bold">03 / 03</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-[#4A3F35]/30 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="relative glass-panel bg-white/95 rounded-t-[40px] h-[92%] flex flex-col animate-in slide-in-from-bottom duration-500">
            <div className="w-12 h-1.5 bg-brand-shadowDark/40 rounded-full mx-auto my-4 shrink-0"></div>
            
            <div className="px-8 pb-4 flex justify-between items-center shrink-0">
               <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center" style={{ color: theme.main }}><Share2 size={16}/></button>
                  <button className="w-9 h-9 rounded-full bg-brand-bg flex items-center justify-center" style={{ color: theme.main }}><Bookmark size={16}/></button>
               </div>
               <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 rounded-full bg-brand-text text-white flex items-center justify-center shadow-lg"><X size={20}/></button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-12">
               <div className="mb-10 text-center">
                  <div className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center border shadow-inner" style={{ backgroundColor: theme.light, borderColor: `${theme.main}20`, color: theme.dark }}>
                    <BookOpen size={40} />
                  </div>
                  <h2 className="text-[28px] font-heading font-extrabold text-brand-text leading-tight mb-3">
                    {content.fullGuide.title}
                  </h2>
                  <p className="text-[18px] font-bold text-brand-subtext px-4 italic">
                    {content.fullGuide.subtitle}
                  </p>
               </div>

               <div className="space-y-10">
                  {content.fullGuide.sections.map((section, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-6 rounded-full text-white flex items-center justify-center text-[12px] font-bold" style={{ backgroundColor: theme.main }}>{idx + 1}</div>
                        <h3 className="text-sub-title font-bold text-brand-text">{section.title}</h3>
                      </div>
                      <div className="pl-9 relative">
                        <div className="absolute left-[11px] top-0 bottom-[-40px] w-0.5" style={{ backgroundColor: `${theme.main}20` }}></div>
                        <p className="text-[18px] text-brand-text/80 leading-[1.7] font-bold">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Knowledge;