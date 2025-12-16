import React, { useEffect, useState } from 'react';
import { X, ChevronRight, FileText, Activity } from 'lucide-react';
import { generateCycleReportAnalysis } from '../services/geminiService';

interface ReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportDrawer: React.FC<ReportDrawerProps> = ({ isOpen, onClose }) => {
  const [analysis, setAnalysis] = useState<string>('正在加载AI分析...');

  useEffect(() => {
    if (isOpen) {
        generateCycleReportAnalysis(28, ['痛经', '头痛']).then(setAnalysis);
    }
  }, [isOpen]);

  return (
    <>
      <div 
        className={`absolute inset-0 z-[60] bg-[#EFEEEE]/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 right-0 z-[70] w-80 bg-brand-bg shadow-[-10px_0_20px_rgba(209,217,230,0.5)] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-8 pt-12">
            <h2 className="text-2xl font-heading font-extrabold text-brand-text">周期报告</h2>
            <button onClick={onClose} className="neu-icon-btn w-12 h-12">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">
            
            <div className="neu-pressed p-6 rounded-[24px]">
                <div className="flex items-center gap-3 mb-4 text-brand-mintDark">
                    <Activity size={20} />
                    <span className="font-bold text-base">AI 周期分析</span>
                </div>
                <p className="text-base text-brand-text/80 leading-relaxed font-medium">
                    {analysis}
                </p>
            </div>

            <div className="text-sm font-bold text-brand-subtext uppercase tracking-wider mt-4">历史记录</div>
            
            {[1, 2, 3].map((i) => (
              <div key={i} className="neu-flat p-5 rounded-[20px] flex items-center justify-between cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full neu-pressed flex items-center justify-center text-brand-pinkDark">
                        <FileText size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-brand-text text-base">周期 #{12 - i}</h3>
                        <p className="text-xs font-bold text-brand-subtext mt-1">2023年10月{10 - i}日</p>
                    </div>
                </div>
                <ChevronRight size={20} className="text-brand-subtext" />
              </div>
            ))}
          </div>
          
          <div className="p-8 pb-12">
            <button className="neu-btn w-full py-5 text-base font-bold text-brand-text">
                导出健康数据
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportDrawer;