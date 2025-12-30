import React, { useState } from 'react';
import { X, Droplets, Smile, Activity, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOOD_OPTIONS, SYMPTOM_OPTIONS } from '../constants';

const MoodRecord: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'mood' | 'symptoms' | 'flow'>('mood');
  
  // 状态管理
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // 切换逻辑
  const toggleMood = (id: string) => {
    setSelectedMoods(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    // 模拟保存延迟
    setTimeout(() => {
      setIsSaving(false);
      navigate('/home');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col pt-16 relative">
      {/* 顶部导航 */}
      <div className="px-6 pb-6 flex justify-between items-center z-10">
        <button 
          onClick={() => navigate('/home')} 
          className="w-10 h-10 rounded-full flex items-center justify-center glass-btn active:scale-90 transition-transform"
        >
          <X size={20} />
        </button>
        <span className="font-bold text-sub-title text-brand-text">感受记录</span>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-6 py-2.5 rounded-full bg-brand-text text-white text-annotation font-bold shadow-lg shadow-brand-text/20 active:scale-95 transition-all flex items-center gap-2 ${isSaving ? 'opacity-70' : ''}`}
        >
          {isSaving ? '正在保存...' : '保存'}
        </button>
      </div>

      {/* 标签切换 */}
      <div className="px-6 mb-8 z-10">
        <div className="glass-panel p-1 flex bg-white/40 border-white/60">
            <button 
              onClick={() => setActiveTab('mood')} 
              className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-annotation font-bold transition-all ${activeTab === 'mood' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext'}`}
            >
              <Smile size={16}/> 心情
            </button>
            <button 
              onClick={() => setActiveTab('symptoms')} 
              className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-annotation font-bold transition-all ${activeTab === 'symptoms' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext'}`}
            >
              <Activity size={16}/> 身体
            </button>
            <button 
              onClick={() => setActiveTab('flow')} 
              className={`flex-1 py-3 flex items-center justify-center gap-2 rounded-xl text-annotation font-bold transition-all ${activeTab === 'flow' ? 'bg-white shadow-sm text-brand-text' : 'text-brand-subtext'}`}
            >
              <Droplets size={16}/> 流量
            </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 px-6 pb-10 overflow-y-auto no-scrollbar z-10">
         {activeTab === 'mood' && (
             <div className="grid grid-cols-3 gap-4 fade-in">
                {MOOD_OPTIONS.map((mood) => {
                  const isSelected = selectedMoods.includes(mood.id);
                  return (
                    <div 
                      key={mood.id} 
                      onClick={() => toggleMood(mood.id)}
                      className={`aspect-square glass-card flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 ${
                        isSelected 
                          ? 'bg-white border-brand-pinkDark shadow-lg scale-105' 
                          : 'bg-white/30 border-transparent hover:bg-white/60'
                      }`}
                    >
                        <span className="text-3xl mb-2">{mood.icon}</span>
                        <span className={`text-annotation font-bold ${isSelected ? 'text-brand-pinkDark' : 'text-brand-text'}`}>
                          {mood.label}
                        </span>
                    </div>
                  );
                })}
             </div>
         )}

         {activeTab === 'symptoms' && (
            <div className="grid grid-cols-2 gap-4 fade-in">
                {SYMPTOM_OPTIONS.map((s) => {
                  const isSelected = selectedSymptoms.includes(s.id);
                  return (
                    <div 
                      key={s.id} 
                      onClick={() => toggleSymptom(s.id)}
                      className={`glass-card p-5 flex flex-col items-center text-center cursor-pointer transition-all duration-300 border-2 ${
                        isSelected 
                          ? 'bg-white border-brand-mint shadow-lg' 
                          : 'bg-white/30 border-transparent hover:bg-white/60'
                      }`}
                    >
                        <span className="text-2xl mb-2">{s.icon}</span>
                        <span className={`text-body-text font-bold ${isSelected ? 'text-brand-mintDark' : 'text-brand-text'}`}>
                          {s.label}
                        </span>
                    </div>
                  );
                })}
            </div>
         )}

         {activeTab === 'flow' && (
             <div className="space-y-6 fade-in">
                {['少量', '中等', '大量'].map((level) => {
                  const isSelected = selectedFlow === level;
                  return (
                    <div 
                      key={level} 
                      onClick={() => setSelectedFlow(level)}
                      className={`glass-card p-6 flex items-center justify-between cursor-pointer group transition-all duration-300 border-2 ${
                        isSelected ? 'bg-white border-brand-pink shadow-md' : 'bg-white/30 border-transparent hover:bg-white/60'
                      }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-brand-pink text-white' : 'bg-brand-pink/10 text-brand-pinkDark'
                            }`}>
                              <Droplets size={20}/>
                            </div>
                            <span className={`text-body-text font-bold ${isSelected ? 'text-brand-pinkDark' : 'text-brand-text'}`}>
                              {level}
                            </span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                          isSelected 
                            ? 'border-brand-pinkDark bg-brand-pinkDark text-white' 
                            : 'border-brand-subtext/20 group-hover:border-brand-pink'
                        }`}>
                          {isSelected && <Check size={14} />}
                        </div>
                    </div>
                  );
                })}
             </div>
         )}
      </div>

      {/* 背景装饰 */}
      <div className="absolute top-[10%] left-[-10%] w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-80 h-80 bg-brand-mint/5 rounded-full blur-[80px] pointer-events-none"></div>
    </div>
  );
};

export default MoodRecord;