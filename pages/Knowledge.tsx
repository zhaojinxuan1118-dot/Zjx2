import React, { useState } from 'react';
import { BookOpen, Droplets, Info, CheckCircle2, XCircle, Smile, Wind, ChevronLeft, Utensils, Clock, ArrowRight } from 'lucide-react';

interface ArticleItem {
  id: number;
  type: 'article' | 'recipe';
  title: string;
  category: string;
  duration: string;
  content: string; // Storing as HTML string for rich text structure
}

const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 1,
    type: 'article',
    title: '如何科学缓解经前焦虑 (PMS)？',
    category: '心理健康',
    duration: '5分钟阅读',
    content: `
      <h3 class="text-lg font-bold mb-3 text-brand-text">什么是经前焦虑？</h3>
      <p class="mb-5 text-brand-text/80 text-base leading-relaxed">经前综合症 (PMS) 影响着超过 90% 的女性。在月经开始前的一周，雌激素和孕激素水平的急剧下降会影响大脑中血清素（一种调节情绪的神经递质）的分泌，从而导致焦虑、易怒和情绪波动。</p>
      
      <h3 class="text-lg font-bold mb-3 text-brand-text">缓解策略</h3>
      <ul class="list-disc pl-5 mb-5 text-brand-text/80 text-base leading-relaxed space-y-3">
        <li><strong>增加镁的摄入：</strong>镁有助于放松肌肉和神经。深绿色蔬菜、坚果和黑巧克力都是很好的来源。</li>
        <li><strong>规律的有氧运动：</strong>运动能促进内啡肽的分泌，这是天然的"快乐荷尔蒙"。快走、游泳或瑜伽都非常有效。</li>
        <li><strong>保证睡眠：</strong>激素波动会影响体温调节，导致失眠。尝试睡前泡个热水澡。</li>
      </ul>
    `
  },
  {
    id: 2,
    type: 'recipe',
    title: '暖宫补血：红枣桂圆姜茶',
    category: '经期食谱',
    duration: '15分钟制作',
    content: `
      <h3 class="text-lg font-bold mb-3 text-brand-text">食材准备</h3>
      <ul class="list-disc pl-5 mb-5 text-brand-text/80 text-base leading-relaxed space-y-2">
        <li>红枣：5-6颗（去核）</li>
        <li>桂圆干：5-6颗</li>
        <li>生姜：3片</li>
        <li>红糖：适量</li>
        <li>水：500ml</li>
      </ul>

      <h3 class="text-lg font-bold mb-3 text-brand-text">制作步骤</h3>
      <ol class="list-decimal pl-5 mb-5 text-brand-text/80 text-base leading-relaxed space-y-3">
        <li>将红枣去核，生姜切片。</li>
        <li>锅中加入500ml清水，放入红枣、桂圆和生姜。</li>
        <li>大火烧开后转小火煮10-15分钟，直到汤色变深。</li>
        <li>加入红糖，搅拌至融化即可关火。</li>
      </ol>
      
      <div class="glass-card p-5 rounded-xl mt-6 bg-brand-pink/10 border border-brand-pink/20">
         <p class="text-sm text-brand-pinkDark font-bold">💡 小贴士：建议在经期前三天开始饮用，有助于暖宫驱寒，缓解痛经。</p>
      </div>
    `
  },
  {
    id: 3,
    type: 'article',
    title: '月经期间为什么会水肿？',
    category: '生理科普',
    duration: '3分钟阅读',
    content: `
      <p class="mb-5 text-brand-text/80 text-base leading-relaxed">很多女生发现，经期前体重会增加1-2公斤，甚至感觉脸部和腿部浮肿。这其实是正常的生理现象。</p>
      <h3 class="text-lg font-bold mb-3 text-brand-text">原因分析</h3>
      <p class="mb-5 text-brand-text/80 text-base leading-relaxed">黄体期孕激素水平升高，会导致身体钠潴留（滞留水分）。此外，经期食欲增加摄入过多的盐分也会加重水肿。</p>
      <h3 class="text-lg font-bold mb-3 text-brand-text">应对方法</h3>
      <p class="mb-5 text-brand-text/80 text-base leading-relaxed">饮食清淡，多吃富含钾的食物（如香蕉、冬瓜），有助于排出多余的钠。</p>
    `
  },
  {
    id: 4,
    type: 'recipe',
    title: '五红汤：补气养血神器',
    category: '经期食谱',
    duration: '40分钟制作',
    content: `
      <h3 class="text-lg font-bold mb-3 text-brand-text">关于五红汤</h3>
      <p class="mb-5 text-brand-text/80 text-base leading-relaxed">五红汤由五种红色的食材组成，是传统的补血养颜方。</p>

      <h3 class="text-lg font-bold mb-3 text-brand-text">食材</h3>
      <ul class="list-disc pl-5 mb-5 text-brand-text/80 text-base leading-relaxed space-y-2">
        <li>红豆：20g（需提前浸泡）</li>
        <li>红衣花生：20g</li>
        <li>红枣：5颗</li>
        <li>枸杞：10g</li>
        <li>红糖：适量</li>
      </ul>

      <h3 class="text-lg font-bold mb-3 text-brand-text">做法</h3>
      <p class="mb-5 text-brand-text/80 text-base leading-relaxed">将浸泡好的红豆、花生放入锅中煮30分钟，再加入红枣煮15分钟，最后放入枸杞和红糖煮5分钟即可。</p>
    `
  }
];

const KnowledgePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wiki' | 'articles'>('wiki');
  const [phaseTab, setPhaseTab] = useState<'follicular' | 'ovulation' | 'luteal'>('follicular');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Content Data
  const PHASE_DATA = {
    follicular: {
      title: '卵泡期',
      subtitle: '精力充沛的黄金期',
      color: 'text-brand-mintDark',
      bg: 'bg-brand-mint',
      feeling: '雌激素水平逐渐上升，你的皮肤状态变好，新陈代谢加快，精力充沛，心情愉悦。这是尝试新事物、高强度运动和社交的好时机。',
      discharge: '月经结束后，白带量少，呈白色或乳白色，质地粘稠，缺乏弹性。随着接近排卵期，会逐渐变得稀薄。'
    },
    ovulation: {
      title: '排卵期',
      subtitle: '魅力四射的高光时刻',
      color: 'text-orange-400',
      bg: 'bg-orange-400',
      feeling: '体温轻微升高，性欲可能增强，精力旺盛。部分女性可能会感到轻微的排卵痛（一侧下腹微痛）。皮肤细腻有光泽。',
      discharge: '白带量达到高峰，呈蛋清样，透明拉丝，弹性极好，不易拉断。这是为了帮助精子通过宫颈。外阴有湿润感。'
    },
    luteal: {
      title: '黄体期',
      subtitle: '需要温柔呵护的时期',
      color: 'text-brand-pinkDark',
      bg: 'bg-brand-pink',
      feeling: '孕激素升高，可能会出现经前综合症（PMS）。容易疲劳、乳房胀痛、情绪波动、食欲增加、水肿或长痘痘。体温维持在高温区。',
      discharge: '排卵后，白带量减少，变回白色或微黄，质地粘稠浑浊，不再拉丝。'
    }
  };

  const MENSTRUAL_TIPS = [
    { type: 'do', text: '注意保暖，特别是腹部和足部' },
    { type: 'do', text: '补充富含铁质的食物（如菠菜、红肉）' },
    { type: 'dont', text: '避免剧烈运动和倒立动作' },
    { type: 'dont', text: '少吃生冷辛辣刺激性食物' },
  ];

  const BLOOD_COLORS = [
    { color: '#FF4D4D', label: '鲜红色', desc: '经血排出顺畅，通常出现在流量最大的几天。' },
    { color: '#8B0000', label: '暗红色', desc: '血液在子宫内停留时间稍长，氧化所致，属正常现象。' },
    { color: '#5C4033', label: '褐色/咖啡色', desc: '通常出现在经期刚开始或快结束时，为陈旧性血液。' },
  ];

  // Detail View Overlay
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col pt-10 px-6 pb-28 animate-in slide-in-from-right duration-300 relative">
         {/* Detail View Background */}
         <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-brand-pink/10 rounded-full blur-[80px] pointer-events-none"></div>

         <div className="flex items-center gap-4 mb-6 relative z-10">
            <button onClick={() => setSelectedArticle(null)} className="glass-btn w-12 h-12 shrink-0">
                <ChevronLeft size={22} />
            </button>
            <span className="font-bold text-xl text-brand-text truncate pr-4">
                {selectedArticle.category}
            </span>
         </div>

         <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
             <div className="glass-panel p-8 rounded-[32px] bg-white/60 border border-white/80">
                <div className="flex items-center gap-2 mb-4">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold ${selectedArticle.type === 'recipe' ? 'bg-orange-100 text-orange-500' : 'bg-blue-100 text-blue-500'}`}>
                        {selectedArticle.type === 'recipe' ? '食谱' : '科普'}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-brand-subtext">
                        <Clock size={14} /> {selectedArticle.duration}
                    </span>
                </div>
                
                <h1 className="text-3xl font-heading font-extrabold text-brand-text mb-8 leading-tight">
                    {selectedArticle.title}
                </h1>
                
                {/* Dynamic HTML Content */}
                <div 
                    className="prose prose-base prose-slate max-w-none" 
                    dangerouslySetInnerHTML={{__html: selectedArticle.content}} 
                />
             </div>
             
             {/* Bottom Action (Decorative) */}
             <div className="mt-8 flex justify-center">
                 <button className="glass-btn px-8 py-4 text-sm font-bold text-brand-pinkDark gap-3 bg-white/70" onClick={() => setSelectedArticle(null)}>
                     <CheckCircle2 size={18} /> 标记为已读
                 </button>
             </div>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pb-32 pt-10 relative overflow-hidden bg-[#F5F7FA]">
      {/* Background Orbs */}
      <div className="absolute top-[5%] left-[50%] w-[250px] h-[250px] bg-orange-100/50 rounded-full blur-[60px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[300px] h-[300px] bg-blue-100/40 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-3xl font-heading font-extrabold text-brand-text">探索科普</h1>
        <p className="text-sm text-brand-subtext font-bold mt-2">了解身体的奥秘</p>
      </div>

      {/* Main Tabs */}
      <div className="glass-panel p-1.5 rounded-2xl flex mb-8 bg-white/40 relative z-10">
         <button 
             onClick={() => setActiveTab('wiki')}
             className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'wiki' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext hover:text-brand-text/70'}`}
         >
             身体百科
         </button>
         <button 
             onClick={() => setActiveTab('articles')}
             className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'articles' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext hover:text-brand-text/70'}`}
         >
             精选文章
         </button>
      </div>

      {activeTab === 'wiki' ? (
        <div className="space-y-8 fade-in relative z-10">
            
            {/* Section 1: Menstrual Guide */}
            <section>
                <div className="flex items-center gap-3 mb-5">
                    <Droplets size={22} className="text-brand-pinkDark" />
                    <h2 className="text-xl font-bold text-brand-text">经期特别指南</h2>
                </div>
                
                <div className="glass-panel p-6 rounded-[30px] mb-6 bg-white/50">
                    <h3 className="text-base font-bold text-brand-text mb-4">经血颜色解码</h3>
                    <div className="space-y-5">
                        {BLOOD_COLORS.map((item, idx) => (
                            <div key={idx} className="flex gap-5 items-start">
                                <div className="w-5 h-5 rounded-full mt-1 shrink-0 shadow-sm border border-white/50" style={{backgroundColor: item.color}}></div>
                                <div>
                                    <span className="text-sm font-bold text-brand-text block mb-1">{item.label}</span>
                                    <span className="text-xs text-brand-subtext leading-relaxed">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                     <div className="glass-card p-5 rounded-[24px] bg-white/50">
                         <div className="flex items-center gap-2 mb-3 text-brand-mintDark">
                             <CheckCircle2 size={18} />
                             <span className="text-sm font-bold">宜</span>
                         </div>
                         <ul className="space-y-3">
                             {MENSTRUAL_TIPS.filter(t => t.type === 'do').map((t, i) => (
                                 <li key={i} className="text-xs text-brand-text font-medium flex gap-1 leading-relaxed">
                                    • {t.text}
                                 </li>
                             ))}
                         </ul>
                     </div>
                     <div className="glass-card p-5 rounded-[24px] bg-white/50">
                         <div className="flex items-center gap-2 mb-3 text-brand-pinkDark">
                             <XCircle size={18} />
                             <span className="text-sm font-bold">忌</span>
                         </div>
                         <ul className="space-y-3">
                             {MENSTRUAL_TIPS.filter(t => t.type === 'dont').map((t, i) => (
                                 <li key={i} className="text-xs text-brand-text font-medium flex gap-1 leading-relaxed">
                                    • {t.text}
                                 </li>
                             ))}
                         </ul>
                     </div>
                </div>
            </section>

            {/* Section 2: Cycle Phases */}
            <section>
                <div className="flex items-center gap-3 mb-5 mt-10">
                    <Info size={22} className="text-blue-400" />
                    <h2 className="text-xl font-bold text-brand-text">周期阶段解密</h2>
                </div>

                {/* Phase Tabs */}
                <div className="flex justify-between gap-3 mb-6">
                    {(['follicular', 'ovulation', 'luteal'] as const).map(p => (
                        <button 
                            key={p}
                            onClick={() => setPhaseTab(p)}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 border ${
                                phaseTab === p 
                                ? 'bg-white border-white shadow-sm text-brand-text' 
                                : 'bg-transparent border-transparent text-brand-subtext hover:bg-white/30'
                            }`}
                        >
                            {p === 'follicular' ? '卵泡期' : p === 'ovulation' ? '排卵期' : '黄体期'}
                        </button>
                    ))}
                </div>

                {/* Phase Content Card */}
                <div className="glass-panel p-8 rounded-[32px] relative overflow-hidden transition-all duration-500 bg-white/60 border border-white/80">
                    <div className={`absolute top-0 left-0 w-full h-2 ${PHASE_DATA[phaseTab].bg}`}></div>
                    
                    <div className="mb-8">
                        <h3 className={`text-2xl font-heading font-extrabold ${PHASE_DATA[phaseTab].color}`}>
                            {PHASE_DATA[phaseTab].title}
                        </h3>
                        <p className="text-sm font-bold text-brand-subtext mt-1">{PHASE_DATA[phaseTab].subtitle}</p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3 text-brand-text/70">
                                <Smile size={18} />
                                <span className="text-sm font-bold">身体感受</span>
                            </div>
                            <p className="text-sm text-brand-text/80 leading-relaxed bg-white/40 p-4 rounded-2xl border border-white/60">
                                {PHASE_DATA[phaseTab].feeling}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3 text-brand-text/70">
                                <Wind size={18} />
                                <span className="text-sm font-bold">白带情况</span>
                            </div>
                            <p className="text-sm text-brand-text/80 leading-relaxed bg-white/40 p-4 rounded-2xl border border-white/60">
                                {PHASE_DATA[phaseTab].discharge}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      ) : (
          <div className="space-y-5 fade-in relative z-10">
              {ARTICLES_DATA.map((article) => (
                  <div 
                    key={article.id} 
                    onClick={() => setSelectedArticle(article)}
                    className="glass-card p-6 rounded-[24px] flex gap-5 items-center cursor-pointer hover:scale-[1.02] transition-transform bg-white/50"
                  >
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border border-white/50 ${article.type === 'recipe' ? 'bg-orange-50 text-orange-400' : 'bg-blue-50 text-blue-400'}`}>
                          {article.type === 'recipe' ? <Utensils size={28} /> : <BookOpen size={28} />}
                      </div>
                      <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-brand-subtext bg-white/50 px-2.5 py-0.5 rounded-md border border-white/60">{article.category}</span>
                              <ArrowRight size={16} className="text-brand-subtext" />
                          </div>
                          <h3 className="font-bold text-brand-text text-base mb-1 leading-snug line-clamp-2">{article.title}</h3>
                          <p className="text-xs text-brand-subtext font-medium">{article.duration}</p>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default KnowledgePage;