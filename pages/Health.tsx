import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { MOCK_SLEEP_DATA, MOCK_BP_DATA, EXERCISE_DATA } from '../constants';
import { Moon, HeartPulse, Dumbbell, Wind, Activity, Utensils, ChevronLeft, ChevronRight, Leaf, Thermometer, Droplets } from 'lucide-react';
import { generateDietPlan } from '../services/geminiService';
import { Recipe } from '../types';

const HealthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'exercise' | 'diet'>('monitor');
  const [exerciseCategory, setExerciseCategory] = useState<'aerobic' | 'anaerobic' | 'yoga'>('aerobic');
  
  // Diet State
  const [dietSeason, setDietSeason] = useState<string>('秋季');
  const [dietSymptom, setDietSymptom] = useState<string>('手脚冰凉');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [loadingDiet, setLoadingDiet] = useState(false);

  useEffect(() => {
    if (activeTab === 'diet') {
        loadDietPlan();
    }
  }, [activeTab, dietSeason, dietSymptom]);

  const loadDietPlan = async () => {
      setLoadingDiet(true);
      const plan = await generateDietPlan(dietSeason, '月经期', [dietSymptom]);
      setRecipes(plan);
      setCurrentRecipeIndex(0); // Reset to breakfast
      setLoadingDiet(false);
  };

  const handleNextRecipe = () => {
      setCurrentRecipeIndex(prev => (prev + 1) % recipes.length);
  };

  const handlePrevRecipe = () => {
      setCurrentRecipeIndex(prev => (prev - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="min-h-screen px-6 pb-32 pt-10 bg-brand-bg relative overflow-hidden">
       {/* Background Orbs with Brand Colors */}
       <div className="absolute top-[20%] right-[-20%] w-[350px] h-[350px] bg-brand-mint/10 rounded-full blur-[80px] pointer-events-none"></div>
       <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-brand-pink/10 rounded-full blur-[80px] pointer-events-none"></div>

       <div className="flex justify-between items-end mb-8 relative z-10">
         <div>
            <h1 className="text-main-title font-heading font-extrabold text-brand-text">健康管理</h1>
            <p className="text-annotation text-brand-subtext font-bold mt-2">
                {activeTab === 'diet' ? '经期饮食调理与营养' : '身体数据与运动建议'}
            </p>
         </div>
       </div>

       {/* Glass Toggle */}
       <div className="glass-panel p-1.5 rounded-2xl flex mb-8 bg-white/40 relative z-10">
            <button 
                onClick={() => setActiveTab('monitor')}
                className={`flex-1 py-3 rounded-xl text-body-text font-bold transition-all duration-300 ${
                    activeTab === 'monitor' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext hover:text-brand-text/70'
                }`}
            >
                身体
            </button>
            <button 
                onClick={() => setActiveTab('exercise')}
                className={`flex-1 py-3 rounded-xl text-body-text font-bold transition-all duration-300 ${
                    activeTab === 'exercise' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext hover:text-brand-text/70'
                }`}
            >
                运动
            </button>
            <button 
                onClick={() => setActiveTab('diet')}
                className={`flex-1 py-3 rounded-xl text-body-text font-bold transition-all duration-300 ${
                    activeTab === 'diet' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext hover:text-brand-text/70'
                }`}
            >
                饮食
            </button>
       </div>

       <div className="fade-in relative z-10">
         {activeTab === 'monitor' && (
             <div className="space-y-6">
                {/* Sleep Chart Card */}
                <div className="glass-card p-6 rounded-[30px] bg-white/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-mint/20 text-brand-mintDark flex items-center justify-center border border-brand-mint/30">
                                <Moon size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-text text-sub-title">睡眠时长</h3>
                                <p className="text-annotation text-brand-subtext font-bold uppercase">过去7天</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <span className="text-main-title font-bold text-brand-text">7.5</span>
                             <span className="text-body-text text-brand-subtext ml-1">小时</span>
                        </div>
                    </div>
                    <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={MOCK_SLEEP_DATA}>
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ 
                                        borderRadius: '16px', 
                                        background: 'rgba(255, 255, 255, 0.9)', 
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.5)',
                                        boxShadow: '0 4px 20px rgba(74, 63, 53, 0.1)',
                                        color: '#4A3F35'
                                    }} 
                                />
                                {/* 将柱状图颜色从 #BEC9A6 修改为 #A2D149 */}
                                <Bar dataKey="value" fill="#A2D149" radius={[4, 4, 4, 4]} barSize={14} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* BP Chart Card */}
                <div className="glass-card p-6 rounded-[30px] bg-white/50">
                    <div className="flex items-center justify-between mb-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-pink/20 text-brand-pinkDark flex items-center justify-center border border-brand-pink/30">
                                <HeartPulse size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-text text-sub-title">血压趋势</h3>
                                <p className="text-annotation text-brand-subtext font-bold uppercase">每日监测</p>
                            </div>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20">
                            <span className="text-annotation font-bold text-brand-pinkDark">正常</span>
                        </div>
                    </div>
                    <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOCK_BP_DATA}>
                                <Tooltip 
                                    contentStyle={{ 
                                        borderRadius: '16px', 
                                        background: 'rgba(255, 255, 255, 0.9)', 
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.5)',
                                        boxShadow: '0 4px 20px rgba(74, 63, 53, 0.1)',
                                        color: '#4A3F35'
                                    }} 
                                />
                                <Line type="monotone" dataKey="systolic" stroke="#E6B5A6" strokeWidth={3} dot={{r: 0}} activeDot={{r: 6, fill:'#E6B5A6', stroke: '#fff', strokeWidth: 2}} />
                                {/* 将折线图辅助线颜色从 #BEC9A6 修改为 #A2D149 */}
                                <Line type="monotone" dataKey="diastolic" stroke="#A2D149" strokeWidth={3} dot={{r: 0}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
             </div>
         )}

         {activeTab === 'exercise' && (
             <div className="space-y-6">
                 {/* Category Selector */}
                 <div className="flex justify-between gap-4">
                    {[
                        { id: 'aerobic', label: '有氧', icon: <Wind size={20}/> },
                        { id: 'anaerobic', label: '无氧', icon: <Dumbbell size={20}/> },
                        { id: 'yoga', label: '瑜伽', icon: <Activity size={20}/> }
                    ].map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setExerciseCategory(cat.id as any)}
                            className={`flex flex-col items-center justify-center flex-1 h-28 rounded-[24px] transition-all duration-300 border ${
                                exerciseCategory === cat.id 
                                ? 'bg-white text-brand-pinkDark border-brand-pink/30 shadow-md' 
                                : 'bg-white/30 text-brand-subtext border-white/50 hover:bg-white/50'
                            }`}
                        >
                            <div className="mb-2">{cat.icon}</div>
                            <span className="text-body-text font-bold">{cat.label}</span>
                        </button>
                    ))}
                 </div>

                 {/* List */}
                 <div className="space-y-4">
                    {EXERCISE_DATA[exerciseCategory].map((item) => (
                        <div key={item.id} className="glass-card p-6 flex justify-between items-center rounded-[24px] bg-white/50">
                            <div>
                                <h3 className="font-bold text-brand-text text-sub-title mb-1">{item.title}</h3>
                                <div className="flex items-center gap-3 text-body-text text-brand-subtext font-bold">
                                    <span className="bg-white/50 px-3 py-1 rounded-md border border-white/60">{item.duration}</span>
                                    <span>{item.calories} Kcal</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-brand-text/30 border border-white/60">
                                <Activity size={20} />
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
         )}
         
         {activeTab === 'diet' && (
             <div className="space-y-6">
                 {/* Settings: Season & Symptom */}
                 <div className="glass-panel p-5 rounded-[24px] flex justify-between items-center bg-white/40">
                     <div className="flex items-center gap-3" onClick={() => setDietSeason(prev => prev === '秋季' ? '冬季' : '秋季')}>
                        <div className="w-10 h-10 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pinkDark border border-brand-pink/20">
                            <Leaf size={18} />
                        </div>
                        <div>
                             <p className="text-annotation text-brand-subtext font-bold uppercase">季节</p>
                             <p className="text-body-text font-bold text-brand-text">{dietSeason}</p>
                        </div>
                     </div>
                     
                     <div className="h-10 w-[1px] bg-brand-subtext/20"></div>
                     
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-mint/10 flex items-center justify-center text-brand-mintDark border border-brand-mint/20">
                            <Droplets size={18} />
                        </div>
                        <div>
                             <p className="text-annotation text-brand-subtext font-bold uppercase">阶段</p>
                             <p className="text-body-text font-bold text-brand-text">月经期</p>
                        </div>
                     </div>
                     
                     <div className="h-10 w-[1px] bg-brand-subtext/20"></div>

                     <div className="flex items-center gap-3" onClick={() => setDietSymptom(prev => prev === '手脚冰凉' ? '痛经' : prev === '痛经' ? '腹胀' : '手脚冰凉')}>
                        <div className="w-10 h-10 rounded-full bg-brand-shadowDark/20 flex items-center justify-center text-brand-subtext border border-brand-shadowDark/30">
                            <Thermometer size={18} />
                        </div>
                        <div>
                             <p className="text-annotation text-brand-subtext font-bold uppercase">症状</p>
                             <p className="text-body-text font-bold text-brand-text">{dietSymptom}</p>
                        </div>
                     </div>
                 </div>

                 {/* Recipe Card with Pagination */}
                 {loadingDiet ? (
                     <div className="glass-card aspect-[3/4] rounded-[30px] flex items-center justify-center bg-white/50">
                         <div className="text-brand-subtext text-body-text font-bold animate-pulse">
                             AI 正在生成食谱...
                         </div>
                     </div>
                 ) : (
                     currentRecipe && (
                         <div className="relative fade-in">
                             {/* Meal Type Tabs */}
                             <div className="flex justify-center gap-2 mb-6">
                                {recipes.map((r, idx) => (
                                    <div 
                                        key={idx}
                                        onClick={() => setCurrentRecipeIndex(idx)}
                                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentRecipeIndex ? 'w-10 bg-brand-pinkDark' : 'w-3 bg-brand-subtext/30'}`}
                                    />
                                ))}
                             </div>

                             <div className="glass-panel p-8 rounded-[32px] relative overflow-hidden min-h-[460px] flex flex-col bg-white/60 border border-white/80">
                                 {/* Pagination Controls */}
                                 <button onClick={handlePrevRecipe} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/50 text-brand-text/60 hover:bg-white z-10 active:scale-90 shadow-sm">
                                     <ChevronLeft size={24} />
                                 </button>
                                 <button onClick={handleNextRecipe} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/50 text-brand-text/60 hover:bg-white z-10 active:scale-90 shadow-sm">
                                     <ChevronRight size={24} />
                                 </button>

                                 <div className="flex flex-col items-center flex-1">
                                     <span className="px-5 py-2 rounded-full text-body-text font-bold text-brand-pinkDark mb-8 bg-brand-pink/10 border border-brand-pink/20">
                                         {currentRecipe.mealType}
                                     </span>
                                     
                                     <div className="w-36 h-36 rounded-full flex items-center justify-center mb-8 text-brand-text/20 bg-white border-4 border-white/50 shadow-inner">
                                         <Utensils size={56} />
                                     </div>

                                     <h2 className="text-main-title font-heading font-extrabold text-brand-text mb-3 text-center">
                                         {currentRecipe.name}
                                     </h2>
                                     
                                     <div className="flex items-center gap-3 mb-8">
                                         <span className="text-body-text font-bold text-brand-subtext">{currentRecipe.calories} Kcal</span>
                                         <span className="w-1.5 h-1.5 bg-brand-subtext rounded-full"></span>
                                         <span className="text-body-text font-bold text-brand-mintDark">{currentRecipe.ingredients.length} 种食材</span>
                                     </div>

                                     <div className="w-full space-y-5 px-2">
                                         <div className="bg-white/40 p-5 rounded-2xl border border-white/60">
                                             <h4 className="text-annotation font-bold text-brand-subtext uppercase tracking-wider mb-3">食材</h4>
                                             <div className="flex flex-wrap gap-2">
                                                 {currentRecipe.ingredients.map(ing => (
                                                     <span key={ing} className="px-3 py-1.5 rounded-lg text-body-text text-brand-text font-bold bg-white/70 shadow-sm">
                                                         {ing}
                                                     </span>
                                                 ))}
                                             </div>
                                         </div>

                                         <div className="bg-brand-pink/10 p-5 rounded-2xl border border-brand-pink/20">
                                             <h4 className="text-annotation font-bold text-brand-pinkDark uppercase tracking-wider mb-2">功效</h4>
                                             <p className="text-body-text text-brand-text font-medium leading-relaxed">
                                                 {currentRecipe.benefit}
                                             </p>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     )
                 )}
                 
                 <div className="glass-card p-5 rounded-[20px] flex items-center gap-4 bg-white/50">
                     <div className="w-12 h-12 rounded-full bg-brand-mint/20 flex items-center justify-center text-brand-mintDark shrink-0 border border-brand-mint/30">
                         <Leaf size={22} />
                     </div>
                     <p className="text-body-text text-brand-text font-medium leading-relaxed">
                         {dietSeason}月经期饮食重点：<span className="font-bold text-brand-mintDark">温补、忌生冷、多铁质</span>。
                     </p>
                 </div>
             </div>
         )}
       </div>
    </div>
  );
};

export default HealthPage;