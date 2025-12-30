import React, { useState } from 'react';
import { X, Check, Plus, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOOD_OPTIONS, SYMPTOM_OPTIONS } from '../constants';

const MoodPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'mood' | 'symptoms' | 'flow'>('mood');
  
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, number>>({});
  const [customSymptoms, setCustomSymptoms] = useState<{id: string, label: string}[]>([]);
  const [flowLevel, setFlowLevel] = useState<string | null>(null);
  
  const [isAddingSymptom, setIsAddingSymptom] = useState(false);
  const [newSymptomText, setNewSymptomText] = useState('');

  const toggleMood = (id: string) => {
    setSelectedMoods(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleSymptom = (id: string) => {
      setSelectedSymptoms(prev => {
          const next = { ...prev };
          if (next[id]) {
              delete next[id];
          } else {
              next[id] = 1; 
          }
          return next;
      });
  };

  const setSymptomSeverity = (id: string, severity: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedSymptoms(prev => ({ ...prev, [id]: severity }));
  };

  const addCustomSymptom = () => {
      if (newSymptomText.trim()) {
          const id = `custom_${Date.now()}`;
          setCustomSymptoms([...customSymptoms, { id, label: newSymptomText.trim() }]);
          setNewSymptomText('');
          setIsAddingSymptom(false);
          toggleSymptom(id);
      }
  };

  const handleSave = () => {
      navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col font-sans relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[0%] left-[20%] w-[400px] h-[400px] bg-brand-pink/10 rounded-full blur-[90px] pointer-events-none"></div>

      {/* Header */}
      <div className="px-6 pt-10 pb-6 flex justify-between items-center sticky top-0 z-50 bg-[#F5F7FA]/80 backdrop-blur-md">
        <button onClick={() => navigate('/home')} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 border border-white/60">
            <X size={20} />
        </button>
        <span className="font-bold text-sub-title text-brand-text">记录今日</span>
        <button 
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-brand-text text-white text-body-text font-bold shadow-lg shadow-brand-text/20"
        >
            保存
        </button>
      </div>

      {/* Date */}
      <div className="px-6 text-center mb-8 relative z-10">
        <h2 className="text-main-title font-heading font-extrabold text-brand-text">感觉如何？</h2>
        <p className="text-brand-subtext text-annotation font-bold mt-2 uppercase tracking-widest">10月12日 • 卵泡期</p>
      </div>

      {/* Glass Tabs */}
      <div className="px-6 mb-8 relative z-10">
        <div className="glass-panel p-1.5 rounded-2xl flex bg-white/40">
            {[
                { id: 'mood', label: '心情' },
                { id: 'symptoms', label: '身体' },
                { id: 'flow', label: '流量' }
            ].map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-3 rounded-xl text-body-text font-bold transition-all duration-300 ${
                        activeTab === tab.id 
                        ? 'bg-white shadow-sm text-brand-text' 
                        : 'text-brand-subtext hover:text-brand-text/70'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-10 overflow-y-auto relative z-10">
         
         {/* MOOD TAB */}
         {activeTab === 'mood' && (
             <div className="grid grid-cols-3 gap-6 fade-in">
                {MOOD_OPTIONS.map((mood) => {
                    const isSelected = selectedMoods.includes(mood.id);
                    return (
                        <div 
                            key={mood.id}
                            onClick={() => toggleMood(mood.id)}
                            className={`
                                aspect-square rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border
                                ${isSelected 
                                    ? 'bg-white border-brand-pinkDark/30 text-brand-pinkDark shadow-lg shadow-brand-pink/10' 
                                    : 'bg-white/30 border-white/50 text-brand-subtext hover:bg-white/50'
                                }
                            `}
                        >
                            <span className="text-4xl mb-3 filter drop-shadow-sm">{mood.icon}</span>
                            <span className="text-body-text font-bold">{mood.label}</span>
                        </div>
                    )
                })}
             </div>
         )}

         {/* SYMPTOMS TAB */}
         {activeTab === 'symptoms' && (
            <div className="space-y-4 fade-in">
                {[...SYMPTOM_OPTIONS, ...customSymptoms.map(c => ({...c, icon: '✏️'}))].map((symptom) => {
                    const severity = selectedSymptoms[symptom.id];
                    const isSelected = severity !== undefined;

                    return (
                        <div 
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className={`
                                p-5 rounded-[24px] transition-all cursor-pointer border
                                ${isSelected 
                                    ? 'bg-white border-brand-pink/20 shadow-md shadow-brand-pink/5' 
                                    : 'bg-white/30 border-white/50 hover:bg-white/50'
                                }
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <span className="text-2xl">{symptom.icon}</span>
                                    <span className={`text-body-text font-bold ${isSelected ? 'text-brand-text' : 'text-brand-subtext'}`}>
                                        {symptom.label}
                                    </span>
                                </div>
                                {isSelected && (
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((level) => (
                                            <button 
                                                key={level}
                                                onClick={(e) => setSymptomSeverity(symptom.id, level, e)}
                                                className={`w-6 h-6 rounded-full transition-all border
                                                    ${severity >= level 
                                                        ? 'bg-brand-pinkDark border-brand-pinkDark text-white' 
                                                        : 'bg-transparent border-brand-subtext/30'
                                                    }
                                                `}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {isAddingSymptom ? (
                    <div className="glass-card p-2 rounded-[24px] flex items-center gap-3 bg-white">
                        <input 
                            autoFocus
                            type="text" 
                            value={newSymptomText}
                            onChange={(e) => setNewSymptomText(e.target.value)}
                            placeholder="输入症状..."
                            className="flex-1 bg-transparent border-none outline-none px-4 text-body-text font-bold text-brand-text"
                        />
                        <button onClick={addCustomSymptom} className="w-12 h-12 rounded-full flex items-center justify-center bg-brand-mint text-white">
                            <Check size={20} />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsAddingSymptom(true)}
                        className="w-full py-4 rounded-[24px] border-2 border-dashed border-brand-subtext/20 text-brand-subtext font-bold text-body-text uppercase tracking-wider flex items-center justify-center gap-2 hover:border-brand-pinkDark hover:text-brand-pinkDark transition-colors bg-white/20"
                    >
                        <Plus size={20} /> 添加自定义
                    </button>
                )}
            </div>
         )}

         {/* FLOW TAB */}
         {activeTab === 'flow' && (
             <div className="fade-in space-y-8">
                <div className="glass-panel p-8 rounded-[32px] flex flex-col items-center text-center bg-white/40">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-brand-pinkDark mb-8 bg-pink-50 border border-pink-100 shadow-inner">
                        <Droplets size={40} />
                    </div>
                    <h3 className="font-bold text-sub-title text-brand-text mb-8">经期流量</h3>
                    
                    <div className="flex gap-4 w-full">
                        {['少量', '中等', '大量'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setFlowLevel(level)}
                                className={`flex-1 py-4 rounded-2xl text-body-text font-bold transition-all border ${
                                    flowLevel === level 
                                    ? 'bg-brand-text text-white border-brand-text shadow-lg' 
                                    : 'bg-white/50 text-brand-subtext border-white/60 hover:bg-white'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
             </div>
         )}
      </div>
    </div>
  );
};

export default MoodPage;