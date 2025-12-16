import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Ruler, Weight, CalendarClock } from 'lucide-react';

// --- Components ---

const ScrollWheel: React.FC<{
  items: number[];
  selected: number;
  onSelect: (val: number) => void;
}> = ({ items, selected, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 48; // Height of each item in px

  // Handle Scroll to find center item
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollPos = container.scrollTop;
    
    // Calculate index based on scroll position
    const index = Math.round(scrollPos / itemHeight);
    
    if (index >= 0 && index < items.length) {
        if (items[index] !== selected) {
             onSelect(items[index]);
        }
    }
  };
  
  // Snap effect when scrolling ends
  const handleScrollEnd = () => {
       if (!containerRef.current) return;
       const index = items.indexOf(selected);
       if (index !== -1) {
           containerRef.current.scrollTo({
               top: index * itemHeight,
               behavior: 'smooth'
           });
       }
  };

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {/* Gradient Masks for glass effect */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F5F7FA] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F7FA] to-transparent z-10 pointer-events-none"></div>
      
      {/* Center Highlight Indicator - Glass Style */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-12 rounded-xl bg-white/40 border border-white/60 shadow-sm backdrop-blur-sm z-0"></div>

      {/* Scroll Container */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-scroll no-scrollbar snap-y snap-mandatory relative z-20 py-[104px]" // padding top/bottom = (h-64 - itemHeight)/2
        onScroll={handleScroll}
        onTouchEnd={handleScrollEnd}
        onMouseUp={handleScrollEnd}
      >
        {items.map((num) => {
            const isSelected = num === selected;
            return (
                <div 
                    key={num} 
                    className={`
                        h-[48px] flex items-center justify-center snap-center transition-all duration-300
                        ${isSelected ? 'text-3xl font-heading font-extrabold text-brand-pinkDark scale-110' : 'text-lg font-bold text-brand-subtext scale-90 opacity-40'}
                    `}
                >
                    {num}
                </div>
            )
        })}
      </div>
    </div>
  );
};

// --- Main Page ---

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [age, setAge] = useState(25);
  
  // Data State
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('50');
  const [cycleLength, setCycleLength] = useState('28');

  const ageRange = Array.from({ length: 49 }, (_, i) => i + 12); // 12 to 60

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Save data logic here if needed
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-6 pt-10 pb-10 flex flex-col relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-[-5%] left-[-10%] w-[300px] h-[300px] bg-orange-100/60 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[250px] h-[250px] bg-brand-pink/20 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 relative z-10">
          <div 
            className="h-full bg-brand-text rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(74,85,104,0.3)]"
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
      </div>

      <div className="flex-1 flex flex-col items-center relative z-10">
        
        {step === 1 && (
            <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-right duration-500">
                <h2 className="text-3xl font-heading font-extrabold text-brand-text mb-2">你的年龄</h2>
                <p className="text-sm font-bold text-brand-subtext mb-12">帮助我们提供更精准的周期建议</p>
                
                <ScrollWheel 
                    items={ageRange} 
                    selected={age} 
                    onSelect={setAge} 
                />
                
                <div className="mt-8 text-center glass-card px-6 py-3">
                    <p className="text-sm font-bold text-brand-text">
                        已选择: <span className="text-brand-pinkDark text-xl ml-2">{age}</span> 岁
                    </p>
                </div>
            </div>
        )}

        {step === 2 && (
            <div className="w-full animate-in fade-in slide-in-from-right duration-500">
                <h2 className="text-3xl font-heading font-extrabold text-brand-text mb-2 text-center">基础数据</h2>
                <p className="text-sm font-bold text-brand-subtext mb-10 text-center">完善身体信息，开启个性化体验</p>
                
                <div className="space-y-5">
                    {/* Height */}
                    <div className="glass-card p-5 flex items-center gap-4 bg-white/40">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100">
                            <Ruler size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-brand-subtext uppercase">身高 (cm)</p>
                            <input 
                                type="number" 
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full bg-transparent border-none outline-none font-heading font-extrabold text-xl text-brand-text"
                            />
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="glass-card p-5 flex items-center gap-4 bg-white/40">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100">
                            <Weight size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-brand-subtext uppercase">体重 (kg)</p>
                            <input 
                                type="number" 
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full bg-transparent border-none outline-none font-heading font-extrabold text-xl text-brand-text"
                            />
                        </div>
                    </div>

                    {/* Cycle */}
                    <div className="glass-card p-5 flex items-center gap-4 bg-white/40">
                        <div className="w-10 h-10 rounded-full bg-pink-50 text-brand-pinkDark flex items-center justify-center shrink-0 border border-pink-100">
                            <CalendarClock size={18} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-bold text-brand-subtext uppercase">平均周期长度 (天)</p>
                            <input 
                                type="number" 
                                value={cycleLength}
                                onChange={(e) => setCycleLength(e.target.value)}
                                className="w-full bg-transparent border-none outline-none font-heading font-extrabold text-xl text-brand-text"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>

      <button 
        onClick={handleNext}
        className="w-full py-4 rounded-full bg-brand-text text-white font-extrabold text-base flex items-center justify-center gap-2 mt-8 active:scale-[0.98] transition-transform shadow-lg shadow-brand-text/20 relative z-10"
      >
          {step === 1 ? '下一步' : '开启主页'}
          <ChevronRight size={20} />
      </button>

    </div>
  );
};

export default Onboarding;