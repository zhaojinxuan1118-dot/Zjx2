import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CyclePhase } from '../types';
import { PHASE_COLORS } from '../constants';

const CalendarPage: React.FC = () => {
  const [currentViewDate, setCurrentViewDate] = useState(new Date(2025, 11, 1)); // 锁定到2025年12月以匹配图片
  const [periodStartDate, setPeriodStartDate] = useState<Date>(new Date(2025, 11, 5));

  const cycleLength = 28;
  const periodLength = 5;

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

  const periodEndDate = addDays(periodStartDate, periodLength - 1);
  const nextPeriodStartDate = addDays(periodStartDate, cycleLength);
  const ovulationDate = addDays(nextPeriodStartDate, -14);
  const fertileStartDate = addDays(ovulationDate, -2);
  const fertileEndDate = addDays(ovulationDate, 2);

  const daysInMonth = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), 1).getDay();

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
    const time = currentCellDate.setHours(0,0,0,0);
    const pStart = new Date(periodStartDate).setHours(0,0,0,0);
    const pEnd = new Date(periodEndDate).setHours(0,0,0,0);
    const fStart = new Date(fertileStartDate).setHours(0,0,0,0);
    const fEnd = new Date(fertileEndDate).setHours(0,0,0,0);

    if (time >= pStart && time <= pEnd) return { type: CyclePhase.Menstrual };
    if (time >= fStart && time <= fEnd) return { type: CyclePhase.Ovulation, isPeak: isSameDay(currentCellDate, ovulationDate) };
    return null;
  };

  return (
    <div className="min-h-screen pb-32 bg-brand-bg px-6 pt-10 relative overflow-hidden">
      {/* Header Area 匹配图片样式 */}
      <div className="mb-8">
        <h1 className="text-[28px] font-heading font-extrabold text-[#736357] leading-tight mb-1">日历&预测</h1>
        <p className="text-[13px] text-[#A69689] font-bold">点击日期设置经期开始时间</p>
      </div>

      {/* Month Selector 匹配图片中的白色长条框 */}
      <div className="mb-8">
        <div className="flex justify-between items-center bg-white rounded-[24px] h-[64px] px-6 shadow-[0_8px_16px_rgba(74,63,53,0.05)] border border-white/80">
            <button onClick={handlePrevMonth} className="text-[#A69689] active:scale-90 transition-transform">
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-[20px] font-extrabold text-[#736357]">
                {currentViewDate.getFullYear()}年{currentViewDate.getMonth() + 1}月
            </h2>
            <button onClick={handleNextMonth} className="text-[#A69689] active:scale-90 transition-transform">
                <ChevronRight size={24} />
            </button>
        </div>
      </div>

      {/* Calendar Grid Card 匹配图片中圆角很大的卡片 */}
      <div className="bg-[#FAF6F3] p-8 rounded-[40px] mb-10 shadow-[8px_8px_16px_#E6DFD9,-8px_-8px_16px_#FFFFFF] border border-white/50">
            <div className="grid grid-cols-7 mb-6">
                {['日','一','二','三','四','五','六'].map(d => (
                    <div key={d} className="text-center text-[13px] font-bold text-[#A69689]/70">{d}</div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 gap-y-4">
                {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const status = getDayStatus(day);
                    
                    let bgStyle = {};
                    let textClass = 'text-[#4A3F35]';

                    if (status?.type === CyclePhase.Menstrual) {
                        bgStyle = { backgroundColor: PHASE_COLORS[CyclePhase.Menstrual] };
                        textClass = 'text-white';
                    } else if (status?.type === CyclePhase.Ovulation) {
                        if (status.isPeak) {
                          bgStyle = { backgroundColor: '#FFD900' };
                          textClass = 'text-white';
                        } else {
                          bgStyle = { backgroundColor: '#FFF3B0' };
                          textClass = 'text-[#D9B500]';
                        }
                    }

                    return (
                        <div key={day} className="flex flex-col items-center justify-center aspect-square" onClick={() => handleDateClick(day)}>
                            <div 
                              className={`w-10 h-10 flex items-center justify-center text-[16px] font-extrabold rounded-full transition-all cursor-pointer ${textClass}`} 
                              style={bgStyle}
                            >
                                {day}
                            </div>
                        </div>
                    );
                })}
            </div>
      </div>

      {/* Prediction Section 匹配图片底部 */}
      <div className="space-y-4">
         <h3 className="text-[18px] font-extrabold text-[#736357] ml-1">周期预测</h3>
         
         <div className="bg-white/60 p-6 rounded-[28px] flex items-center gap-4 shadow-[4px_4px_12px_rgba(74,63,53,0.03)] border border-white/80">
             <div className="w-14 h-14 rounded-full bg-[#FFF5F5] flex items-center justify-center shrink-0">
               <div className="w-8 h-8 rounded-full bg-[#FFE8E8]"></div>
             </div>
             <div>
                 <p className="text-[12px] text-[#A69689] font-bold">本期经期结束</p>
                 <p className="text-[16px] font-extrabold text-[#736357]">
                   {formatDate(periodEndDate)} <span className="text-[#A69689] font-bold">(预测)</span>
                 </p>
             </div>
         </div>

         <div className="bg-white/60 p-6 rounded-[28px] h-24 shadow-[4px_4px_12px_rgba(74,63,53,0.03)] border border-white/80">
            {/* 占位展示图片的结构 */}
         </div>
      </div>
    </div>
  );
};

export default CalendarPage;