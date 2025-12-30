import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to Auth page instead of Home directly
      navigate('/auth');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-bg">
      <div className="neu-flat w-24 h-24 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <Heart className="text-brand-pinkDark w-10 h-10 fill-current" />
      </div>
      <h1 className="text-main-title font-heading font-extrabold text-brand-text fade-in">
        LunaFlow
      </h1>
      <p className="text-brand-subtext text-annotation font-bold mt-3 tracking-[0.3em] uppercase fade-in">
        呵护 · 陪伴 · 成长
      </p>
    </div>
  );
};

export default Splash;