import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const LoadingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center px-10 text-center">
      <div className="w-24 h-24 rounded-full bg-white/80 shadow-xl flex items-center justify-center mb-8 animate-pulse border border-white">
        <Sparkles className="text-brand-pinkDark w-12 h-12" />
      </div>
      <h2 className="text-main-title font-heading font-extrabold text-brand-text mb-4">LunaFlow 正在为你定制</h2>
      <p className="text-body-text text-brand-subtext leading-relaxed font-bold">
        AI 正在根据你的身体数据<br/>生成专属的健康洞察与经期方案...
      </p>
      
      <div className="mt-12 w-48 h-1.5 bg-brand-shadowDark/30 rounded-full overflow-hidden">
        <div className="h-full bg-brand-pinkDark animate-[loading_3s_ease-in-out]"></div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;