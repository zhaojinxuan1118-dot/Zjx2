import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { MOCK_SLEEP_DATA, EXERCISE_DATA } from '../constants';
import { 
  Moon, HeartPulse, Dumbbell, Wind, Utensils, 
  ChevronRight, Sparkles, Activity, Edit3, 
  Plus, Ruler, Droplets, Footprints, Bell, Shield, 
  Thermometer, CheckCircle2, X, Trash2, Save, Clock, Coffee
} from 'lucide-react';
import { ExerciseItem, MetricCard, MealPlan } from '../types';

const Insights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'body' | 'exercise' | 'diet'>('ai');
  
  // 身体指标编辑状态
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState<MetricCard | null>(null);
  const [editValue, setEditValue] = useState('');

  // 运动计划编辑状态
  const [isExerciseEditOpen, setIsExerciseEditOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<ExerciseItem | null>(null);
  const [exerciseForm, setExerciseForm] = useState({ title: '', calories: 0, duration: '' });

  // 饮食计划编辑状态
  const [isDietEditOpen, setIsDietEditOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MealPlan | null>(null);
  const [mealForm, setMealForm] = useState({ name: '', cal: '', status: '' });

  // 数据状态
  const [metrics, setMetrics] = useState<MetricCard[]>([
      { id: 'weight', label: '体重', value: '50.2', unit: 'kg', icon: <Ruler size={18}/>, color: 'text-brand-pinkDark', subText: '比上周 -0.5' },
      { id: 'water', label: '饮水', value: '1200', unit: 'ml', icon: <Droplets size={18}/>, color: 'text-brand-mintDark', subText: '目标 2000' },
      { id: 'steps', label: '步数', value: '6432', unit: '步', icon: <Footprints size={18}/>, color: 'text-orange-400', subText: '完成 64%' },
      { id: 'temp', label: '体温', value: '36.5', unit: '°C', icon: <Thermometer size={18}/>, color: 'text-brand-pink', subText: '基础体温平稳' },
      { id: 'sleep', label: '睡眠', value: '7.5', unit: 'h', icon: <Moon size={18}/>, color: 'text-brand-subtext', subText: '深度 2.4h' },
  ]);

  const [dailyExercises, setDailyExercises] = useState<ExerciseItem[]>(
    EXERCISE_DATA.yoga.concat(EXERCISE_DATA.aerobic)
  );

  const [dietMeals, setDietMeals] = useState<MealPlan[]>([
    { id: '1', time: '早餐', name: '红枣小米粥', cal: '240', status: '已打卡' },
    { id: '2', time: '午餐', name: '菠菜猪肝面', cal: '480', status: '进行中' },
    { id: '3', time: '加餐', name: '温热红豆汤', cal: '120', status: '待开始' },
    { id: '4', time: '晚餐', name: '清蒸鲈鱼', cal: '320', status: '待开始' }
  ]);

  const openEdit = (metric: MetricCard) => {
    setEditingMetric(metric);
    setEditValue(metric.value);
    setIsEditPanelOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingMetric) {
      setMetrics(prev => prev.map(m => m.id === editingMetric.id ? { ...m, value: editValue } : m));
    }
    setIsEditPanelOpen(false);
  };

  const openExerciseEdit = (item: ExerciseItem) => {
    setEditingExercise(item);
    setExerciseForm({ title: item.title, calories: item.calories, duration: item.duration });
    setIsExerciseEditOpen(true);
  };

  const handleSaveExercise = () => {
    if (editingExercise) {
      setDailyExercises(prev => prev.map(ex => 
        ex.id === editingExercise.id ? { ...ex, ...exerciseForm } : ex
      ));
    }
    setIsExerciseEditOpen(false);
  };

  const openDietEdit = (meal: MealPlan) => {
    setEditingMeal(meal);
    setMealForm({ name: meal.name, cal: meal.cal, status: meal.status });
    setIsDietEditOpen(true);
  };

  const handleSaveMeal = () => {
    if (editingMeal) {
      setDietMeals(prev => prev.map(m => 
        m.id === editingMeal.id ? { ...m, ...mealForm } : m
      ));
    }
    setIsDietEditOpen(false);
  };

  const PIE_DATA = [
    { name: '蛋白质', value: 30, color: '#E6B5A6' },
    { name: '碳水', value: 50, color: '#A2D149' }, 
    { name: '脂肪', value: 20, color: '#F2D388' },
  ];

  return (
    <div className="min-h-screen px-0 pt-16 pb-32 bg-brand-bg relative overflow-hidden">
       {/* Decorative Background Orbs */}
       <div className="absolute top-20 right-[-10%] w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl pointer-events-none"></div>
       <div className="absolute bottom-40 left-[-10%] w-80 h-80 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none"></div>

       <div className="px-6 relative z-10">
            <h1 className="text-main-title font-heading font-extrabold text-brand-text mb-1">洞察报告</h1>
            <p className="text-annotation font-bold text-brand-subtext mb-6 uppercase tracking-widest">LUNAFLOW 智能健康分析系统</p>
       </div>

       {/* Horizontal Tab Switcher */}
       <div className="px-6 mb-8 overflow-x-auto no-scrollbar relative z-10">
            <div className="glass-panel p-1 flex bg-white/40 min-w-[340px]">
                {['ai', 'body', 'exercise', 'diet'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-3 rounded-xl text-annotation font-bold transition-all uppercase tracking-tighter ${
                            activeTab === tab ? 'bg-white shadow-sm text-brand-text scale-105' : 'text-brand-subtext'
                        }`}
                    >
                        {tab === 'ai' ? 'AI报告' : tab === 'body' ? '身体指标' : tab === 'exercise' ? '运动方案' : '饮食建议'}
                    </button>
                ))}
            </div>
       </div>

       <div className="fade-in relative z-10">
         {/* AI REPORT TAB */}
         {activeTab === 'ai' && (
            <div className="px-6 space-y-6 pb-6">
                <div className="glass-panel p-6 bg-gradient-to-br from-white/95 to-brand-pink/10 border border-brand-pink/20 shadow-xl shadow-brand-pink/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-brand-pinkDark/10 flex items-center justify-center text-brand-pinkDark">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="text-sub-title font-bold text-brand-text">今日身体评分: 88</h3>
                    </div>
                    <p className="text-body-text text-brand-text/80 leading-relaxed mb-6 font-medium">
                        Luna，你现在的身体状况非常棒！昨晚的深度睡眠较前日增加了20分钟，今天的代谢效率较高。
                    </p>
                    <div className="bg-white/40 p-5 rounded-2xl border border-white/60">
                        <h4 className="text-annotation font-bold text-brand-subtext uppercase mb-2">黄金周期建议</h4>
                        <p className="text-body-text font-bold text-brand-text leading-relaxed">
                            处于卵泡期的你，多巴胺分泌旺盛，适合挑战更高难度的学习或创意工作。
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <h3 className="text-annotation font-bold text-brand-subtext uppercase tracking-[0.2em] px-2">AI 智能提醒</h3>
                    <div className="glass-card p-5 border-l-4 border-orange-400 flex items-start gap-4">
                        <div className="p-2 bg-orange-100/50 rounded-lg text-orange-500"><Utensils size={18}/></div>
                        <div>
                            <p className="text-body-text font-bold text-brand-text">补铁计划</p>
                            <p className="text-annotation text-brand-subtext font-medium mt-1">检测到经期即将来临，午餐建议增加红肉或菠菜摄入。</p>
                        </div>
                    </div>
                    <div className="glass-card p-5 border-l-4 border-brand-mint flex items-start gap-4">
                        <div className="p-2 bg-brand-mint/20 rounded-lg text-brand-mintDark"><Activity size={18}/></div>
                        <div>
                            <p className="text-body-text font-bold text-brand-text">有氧窗口</p>
                            <p className="text-annotation text-brand-subtext font-medium mt-1">下午4点到6点是你的体温高峰，此刻运动燃脂效果最佳。</p>
                        </div>
                    </div>
                </div>
            </div>
         )}

         {/* BODY METRICS TAB */}
         {activeTab === 'body' && (
             <div className="space-y-6">
                <div className="px-6 grid grid-cols-2 gap-4">
                    <div className="glass-card p-5 flex flex-col justify-between h-32 bg-gradient-to-br from-white to-brand-pink/10">
                        <p className="text-annotation font-bold text-brand-subtext uppercase">今日平均心率</p>
                        <p className="text-main-title font-heading font-extrabold text-brand-text">72<span className="text-annotation font-normal ml-1">BPM</span></p>
                        <div className="flex items-center gap-1 text-annotation text-brand-mintDark font-bold">
                            <Activity size={14}/> 状态极佳
                        </div>
                    </div>
                    <div className="glass-card p-5 flex flex-col justify-between h-32 bg-gradient-to-br from-white to-brand-mint/10">
                        <p className="text-annotation font-bold text-brand-subtext uppercase">活跃时长</p>
                        <p className="text-main-title font-heading font-extrabold text-brand-text">45<span className="text-annotation font-normal ml-1">MIN</span></p>
                        <div className="flex items-center gap-1 text-annotation text-brand-pinkDark font-bold">
                            <Activity size={14}/> 超过50%用户
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                    {metrics.map(metric => (
                        <div 
                            key={metric.id} 
                            onClick={() => openEdit(metric)}
                            className="min-w-[150px] glass-card p-5 flex flex-col relative group cursor-pointer active:scale-95 transition-all"
                        >
                            <div className="absolute top-4 right-4 text-brand-subtext/30 group-hover:text-brand-pinkDark transition-colors">
                                <Edit3 size={12} />
                            </div>
                            <div className={`w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center mb-4 ${metric.color} shadow-inner`}>
                                {metric.icon}
                            </div>
                            <p className="text-annotation font-bold text-brand-subtext mb-1 uppercase">{metric.label}</p>
                            <p className="text-body-text font-extrabold text-brand-text mb-1">
                                {metric.value} <span className="text-annotation font-bold text-brand-subtext">{metric.unit}</span>
                            </p>
                            <p className="text-annotation font-bold text-brand-subtext/60 truncate">{metric.subText}</p>
                        </div>
                    ))}
                    <div className="min-w-[150px] border-2 border-dashed border-brand-subtext/20 rounded-[24px] flex flex-col items-center justify-center text-brand-subtext hover:border-brand-pink/40 hover:text-brand-pinkDark transition-all cursor-pointer bg-white/10">
                        <Plus size={20} className="mb-1"/>
                        <span className="text-annotation font-bold uppercase tracking-widest">新增指标</span>
                    </div>
                </div>

                <div className="px-6 pb-6">
                    <div className="glass-card p-6 bg-white/60">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-brand-text text-body-text flex items-center gap-2">
                                <Activity size={16} className="text-brand-pinkDark" /> 周期体温曲线
                            </h3>
                            <span className="text-annotation font-bold text-brand-subtext">30天视图</span>
                        </div>
                        <div className="h-40 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={MOCK_SLEEP_DATA}>
                                    <Line type="monotone" dataKey="value" stroke="#E6B5A6" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
             </div>
         )}

         {/* EXERCISE TAB */}
         {activeTab === 'exercise' && (
             <div className="space-y-6">
                <div className="px-6">
                    <div className="glass-panel p-6 flex items-center justify-between bg-white/60">
                        <div>
                            <p className="text-annotation font-bold text-brand-subtext uppercase mb-1">本周目标完成度</p>
                            <h3 className="text-main-title font-heading font-extrabold text-brand-text">75%</h3>
                        </div>
                        <div className="w-16 h-16 rounded-full border-4 border-brand-mint/30 flex items-center justify-center relative">
                            <div className="absolute inset-0 border-4 border-brand-mint border-t-transparent rounded-full rotate-45"></div>
                            <span className="text-annotation font-bold text-brand-mintDark">3/4</span>
                        </div>
                    </div>
                </div>

                <div className="px-6"><h3 className="text-annotation font-bold text-brand-subtext uppercase tracking-widest">今日推荐计划</h3></div>
                
                <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                    {dailyExercises.map((item, idx) => (
                        <div 
                            key={item.id} 
                            onClick={() => openExerciseEdit(item)}
                            className="min-w-[220px] glass-card p-6 flex flex-col justify-between relative overflow-hidden group cursor-pointer active:scale-95 transition-all"
                        >
                            <div className="absolute top-0 right-0 p-3 flex gap-2">
                                {idx === 0 && <CheckCircle2 size={18} className="text-brand-mintDark" />}
                            </div>
                            <div>
                                <h4 className="font-extrabold text-brand-text text-body-text mb-1">{item.title}</h4>
                                <div className="flex gap-2 mb-4">
                                    <span className="text-annotation px-2 py-0.5 rounded bg-brand-pink/10 text-brand-pinkDark font-bold"># {item.tags[0]}</span>
                                    <span className="text-annotation px-2 py-0.5 rounded bg-brand-bg text-brand-subtext font-bold">时长 {item.duration}</span>
                                </div>
                            </div>
                            <div className="flex items-end justify-between mt-4">
                                <div>
                                    <p className="text-annotation font-bold text-brand-subtext uppercase">预计消耗</p>
                                    <p className="text-body-text font-bold text-brand-text">{item.calories} KCAL</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-brand-text text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                  <Edit3 size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="min-w-[140px] border-2 border-dashed border-brand-subtext/20 rounded-[24px] flex flex-col items-center justify-center text-brand-subtext cursor-pointer hover:bg-white/10 transition-colors">
                        <Plus size={24}/>
                        <span className="text-annotation font-bold mt-2 uppercase tracking-tighter">自定义计划</span>
                    </div>
                </div>
             </div>
         )}
         
         {/* DIET TAB */}
         {activeTab === 'diet' && (
             <div className="space-y-6">
                <div className="px-6 flex gap-4">
                    <div className="flex-1 glass-card p-5 bg-white/60">
                         <p className="text-annotation font-bold text-brand-subtext uppercase mb-3">营养摄入比例</p>
                         <div className="h-24 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={PIE_DATA} innerRadius={25} outerRadius={40} paddingAngle={5} dataKey="value">
                                        {PIE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                         </div>
                    </div>
                    <div className="flex-1 glass-card p-5 flex flex-col justify-center gap-3">
                        {PIE_DATA.map(item => (
                            <div key={item.name} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                                <span className="text-annotation font-extrabold text-brand-text">{item.name} {item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-6"><h3 className="text-annotation font-bold text-brand-subtext uppercase tracking-widest">全天食谱安排</h3></div>
                
                <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
                    {dietMeals.map((meal, idx) => (
                        <div 
                            key={meal.id} 
                            onClick={() => openDietEdit(meal)}
                            className="min-w-[180px] glass-panel p-6 flex flex-col items-center text-center relative overflow-hidden active:scale-95 transition-transform cursor-pointer group"
                        >
                            <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-white/60 text-annotation font-extrabold text-brand-subtext uppercase">{meal.status}</div>
                            <div className="w-12 h-12 rounded-full bg-brand-bg flex items-center justify-center text-brand-text/30 mb-4 shadow-inner group-hover:text-brand-pinkDark transition-colors">
                                <Utensils size={20}/>
                            </div>
                            <span className="text-annotation font-bold text-brand-pinkDark mb-1 tracking-tighter">{meal.time}</span>
                            <h4 className="text-body-text font-extrabold text-brand-text mb-3 leading-tight">{meal.name}</h4>
                            <div className="w-full flex justify-between items-center mt-auto pt-4 border-t border-white/40">
                                <span className="text-annotation font-bold text-brand-subtext">{meal.cal} kcal</span>
                                <Edit3 size={14} className="text-brand-subtext group-hover:text-brand-pinkDark"/>
                            </div>
                        </div>
                    ))}
                    <div className="min-w-[140px] border-2 border-dashed border-brand-subtext/20 rounded-[30px] flex items-center justify-center text-brand-subtext cursor-pointer hover:bg-white/10 hover:text-brand-pinkDark">
                        <Plus size={24}/>
                    </div>
                </div>
             </div>
         )}
       </div>

       {/* BODY METRIC EDIT PANEL */}
       {isEditPanelOpen && (
           <div className="absolute inset-0 z-[100] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[#4A3F35]/30 backdrop-blur-sm" onClick={() => setIsEditPanelOpen(false)}></div>
                <div className="relative glass-panel bg-white/95 rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-sub-title font-heading font-extrabold text-brand-text">修改 {editingMetric?.label}</h2>
                            <p className="text-annotation text-brand-subtext font-bold mt-1 uppercase">请输入当前数值 ({editingMetric?.unit})</p>
                        </div>
                        <button onClick={() => setIsEditPanelOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-subtext active:scale-90"><X size={20}/></button>
                    </div>
                    <div className="flex items-center gap-4 mb-10">
                        <input 
                            autoFocus
                            type="number" 
                            step="0.1"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 bg-brand-bg rounded-2xl px-6 py-5 text-main-title font-heading font-extrabold text-brand-text outline-none border-2 border-transparent focus:border-brand-pink/30 transition-all"
                        />
                        <span className="text-sub-title font-bold text-brand-subtext">{editingMetric?.unit}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setIsEditPanelOpen(false)} className="py-4 rounded-2xl bg-gray-100 text-brand-subtext font-bold text-body-text active:scale-95 transition-all">取消</button>
                        <button onClick={handleSaveEdit} className="py-4 rounded-2xl bg-brand-text text-white font-bold text-body-text shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                           <Save size={18}/> 保存更改
                        </button>
                    </div>
                </div>
           </div>
       )}

       {/* EXERCISE EDIT PANEL */}
       {isExerciseEditOpen && (
           <div className="absolute inset-0 z-[100] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[#4A3F35]/30 backdrop-blur-sm" onClick={() => setIsExerciseEditOpen(false)}></div>
                <div className="relative glass-panel bg-white/95 rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-sub-title font-heading font-extrabold text-brand-text">编辑运动计划</h2>
                            <p className="text-annotation text-brand-subtext font-bold mt-1 uppercase">调整运动参数</p>
                        </div>
                        <button onClick={() => setIsExerciseEditOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-subtext active:scale-90"><X size={20}/></button>
                    </div>
                    <div className="space-y-6 mb-10">
                        <div className="space-y-2">
                            <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">计划名称</label>
                            <input 
                                value={exerciseForm.title}
                                onChange={(e) => setExerciseForm({...exerciseForm, title: e.target.value})}
                                className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none border-2 border-transparent focus:border-brand-pink/20 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">预计消耗 (kcal)</label>
                                <input 
                                    type="number"
                                    value={exerciseForm.calories}
                                    onChange={(e) => setExerciseForm({...exerciseForm, calories: Number(e.target.value)})}
                                    className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none border-2 border-transparent focus:border-brand-pink/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">持续时间</label>
                                <input 
                                    value={exerciseForm.duration}
                                    onChange={(e) => setExerciseForm({...exerciseForm, duration: e.target.value})}
                                    className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none border-2 border-transparent focus:border-brand-pink/20 transition-all"
                                    placeholder="例如 30分钟"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setIsExerciseEditOpen(false)} className="py-4 rounded-2xl bg-gray-100 text-brand-subtext font-bold text-body-text active:scale-95 transition-all">取消</button>
                        <button onClick={handleSaveExercise} className="py-4 rounded-2xl bg-brand-text text-white font-bold text-body-text shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                           <Save size={18}/> 保存更改
                        </button>
                    </div>
                </div>
           </div>
       )}

       {/* DIET EDIT PANEL */}
       {isDietEditOpen && (
           <div className="absolute inset-0 z-[100] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[#4A3F35]/30 backdrop-blur-sm" onClick={() => setIsDietEditOpen(false)}></div>
                <div className="relative glass-panel bg-white/95 rounded-t-[40px] p-8 animate-in slide-in-from-bottom duration-300">
                    <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-sub-title font-heading font-extrabold text-brand-text">调整饮食计划</h2>
                            <p className="text-annotation text-brand-subtext font-bold mt-1 uppercase">{editingMeal?.time}食谱</p>
                        </div>
                        <button onClick={() => setIsDietEditOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-subtext active:scale-90"><X size={20}/></button>
                    </div>
                    <div className="space-y-6 mb-10">
                        <div className="space-y-2">
                            <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">餐点名称</label>
                            <input 
                                value={mealForm.name}
                                onChange={(e) => setMealForm({...mealForm, name: e.target.value})}
                                className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none border-2 border-transparent focus:border-brand-pink/20 transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">热量 (kcal)</label>
                                <input 
                                    type="number"
                                    value={mealForm.cal}
                                    onChange={(e) => setMealForm({...mealForm, cal: e.target.value})}
                                    className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none border-2 border-transparent focus:border-brand-pink/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-annotation font-bold text-brand-subtext uppercase ml-2">打卡状态</label>
                                <select 
                                    value={mealForm.status}
                                    onChange={(e) => setMealForm({...mealForm, status: e.target.value})}
                                    className="w-full bg-brand-bg/50 rounded-2xl px-6 py-4 text-body-text font-bold text-brand-text outline-none border-2 border-transparent focus:border-brand-pink/20 transition-all appearance-none"
                                >
                                    <option value="已打卡">已打卡</option>
                                    <option value="进行中">进行中</option>
                                    <option value="待开始">待开始</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setIsDietEditOpen(false)} className="py-4 rounded-2xl bg-gray-100 text-brand-subtext font-bold text-body-text active:scale-95 transition-all">取消</button>
                        <button onClick={handleSaveMeal} className="py-4 rounded-2xl bg-brand-text text-white font-bold text-body-text shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
                           <Save size={18}/> 保存更改
                        </button>
                    </div>
                </div>
           </div>
       )}
    </div>
  );
};

export default Insights;