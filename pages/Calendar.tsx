import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Droplets, Baby, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
import { CyclePhase } from '../types';
import { PHASE_COLORS } from '../constants';

const CalendarPage: React.FC = () => {
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  // Default period start date (e.g., 5th of current month)
  const [periodStartDate, setPeriodStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 5)
  );

  const cycleLength = 28;
  const periodLength = 5;

  // --- Date Helpers ---
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // --- Cycle Calculations ---
  const periodEndDate = addDays(periodStartDate, periodLength - 1);
  const nextPeriodStartDate = addDays(periodStartDate, cycleLength);
  const ovulationDate = addDays(nextPeriodStartDate, -14);
  const fertileStartDate = addDays(ovulationDate, -2);
  const fertileEndDate = addDays(ovulationDate, 2);

  // --- Calendar View Logic ---
  const daysInMonth = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), 1).getDay();

  const currentMonthZH = currentViewDate.toLocaleString('zh-CN', { month: 'long', year: 'numeric' });

  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), day);
    setPeriodStartDate(selectedDate);
  };

  const getDayStatus = (day: number) => {
    const currentCellDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), day);
    
    // Normalize times for comparison
    const time = currentCellDate.setHours(0,0,0,0);
    const pStart = new Date(periodStartDate).setHours(0,0,0,0);
    const pEnd = new Date(periodEndDate).setHours(0,0,0,0);
    const fStart = new Date(fertileStartDate).setHours(0,0,0,0);
    const fEnd = new Date(fertileEndDate).setHours(0,0,0,0);
    const nStart = new Date(nextPeriodStartDate).setHours(0,0,0,0);

    // Menstrual
    if (time >= pStart && time <= pEnd) return { type: CyclePhase.Menstrual, isStart: time === pStart };
    
    // Fertile / Ovulation
    if (time >= fStart && time <= fEnd) return { type: CyclePhase.Ovulation, isOvulationDay: isSameDay(currentCellDate, ovulationDate) };
    
    // Next Period Start Prediction
    if (time === nStart) return { type: 'NextPeriod' };

    return null;
  };

  return (
    <div className="min-h-screen pb-32 bg-[#F5F7FA] px-6 pt-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[10%] right-[-10%] w-[200px] h-[200px] bg-brand-pink/20 rounded-full blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[250px] h-[250px] bg-brand-mint/20 rounded-full blur-[60px] pointer-events-none"></div>

      <div className="mb-6 relative z-10">
        <h1 className="text-3xl font-heading font-extrabold text-brand-text">日历 & 预测</h1>
        <p className="text-sm text-brand-subtext font-bold mt-2">点击日期设置经期开始时间</p>
        
        {/* Month Navigator - Glass Panel */}
        <div className="flex justify-between items-center mt-6 glass-panel p-4 rounded-2xl bg-white/40">
            <button onClick={handlePrevMonth} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors">
                <ChevronLeft size={20} />
            </button>
            <h2 className="font-bold text-xl text-brand-text">
                {currentMonthZH}
            </h2>
            <button onClick={handleNextMonth} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors">
                <ChevronRight size={20} />
            </button>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-[30px] mb-8 bg-white/30 border-white/60 relative z-10">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-6">
                {['日','一','二','三','四','五','六'].map(d => (
                    <div key={d} className="text-center text-sm font-bold text-brand-subtext/70">{d}</div>
                ))}
            </div>
            
            {/* Days */}
            <div className="grid grid-cols-7 gap-y-3 gap-x-1">
                {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
                
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const status = getDayStatus(day);
                    const isToday = isSameDay(new Date(), new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), day));
                    
                    let bgStyle = {};
                    let textClass = 'text-brand-text';
                    let containerClass = '';

                    if (status?.type === CyclePhase.Menstrual) {
                        bgStyle = { backgroundColor: PHASE_COLORS[CyclePhase.Menstrual], boxShadow: '0 4px 10px rgba(228, 174, 197, 0.4)' };
                        textClass = 'text-white';
                        if (status.isStart) containerClass = 'ring-2 ring-white ring-offset-2 ring-offset-[#F0F2F5]';
                    } else if (status?.type === CyclePhase.Ovulation) {
                        bgStyle = { backgroundColor: status.isOvulationDay ? '#FFCC80' : 'rgba(255, 204, 128, 0.3)' };
                        textClass = status.isOvulationDay ? 'text-white' : 'text-orange-400';
                        if (status.isOvulationDay) {
                           containerClass = 'ring-2 ring-white ring-offset-2 ring-offset-[#F0F2F5] shadow-md shadow-orange-200';
                        }
                    } else if (status?.type === 'NextPeriod') {
                        containerClass = 'border-2 border-dashed border-brand-pink';
                        textClass = 'text-brand-pinkDark';
                    } else if (isToday) {
                        containerClass = 'bg-brand-text text-white shadow-md';
                        textClass = 'text-white';
                    }

                    return (
                        <div key={day} className="flex flex-col items-center justify-center aspect-square" onClick={() => handleDateClick(day)}>
                            <div 
                                className={`
                                    w-9 h-9 flex items-center justify-center text-sm font-bold rounded-full transition-all cursor-pointer relative
                                    ${textClass} ${containerClass}
                                `}
                                style={bgStyle}
                            >
                                {day}
                                {status?.isStart && <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"></div>}
                            </div>
                        </div>
                    );
                })}
            </div>
      </div>

      {/* Prediction Panel */}
      <div className="space-y-5 fade-in relative z-10">
         <h3 className="text-base font-bold text-brand-text ml-1">周期预测</h3>
         
         <div className="glass-card p-5 rounded-[24px] flex items-center justify-between bg-white/40">
             <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-full bg-pink-50 text-brand-pinkDark flex items-center justify-center border border-pink-100">
                     <RotateCcw size={22} />
                 </div>
                 <div>
                     <p className="text-xs text-brand-subtext font-bold uppercase">本期经期结束</p>
                     <p className="text-base font-bold text-brand-text mt-0.5">{formatDate(periodEndDate)} <span className="text-xs text-brand-subtext font-normal">(预测)</span></p>
                 </div>
             </div>
         </div>

         <div className="glass-card p-5 rounded-[24px] flex items-center justify-between bg-white/40">
             <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center border border-orange-100">
                     <Baby size={22} />
                 </div>
                 <div>
                     <p className="text-xs text-brand-subtext font-bold uppercase">排卵日</p>
                     <p className="text-base font-bold text-brand-text mt-0.5">{formatDate(ovulationDate)} <span className="text-xs text-brand-subtext font-normal">(易孕)</span></p>
                 </div>
             </div>
         </div>

         <div className="glass-card p-5 rounded-[24px] flex items-center justify-between bg-white/40">
             <div className="flex items-center gap-5">
                 <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-400 flex items-center justify-center border border-purple-100">
                     <CalendarIcon size={22} />
                 </div>
                 <div>
                     <p className="text-xs text-brand-subtext font-bold uppercase">下一次经期</p>
                     <p className="text-base font-bold text-brand-text mt-0.5">{formatDate(nextPeriodStartDate)}</p>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default CalendarPage;