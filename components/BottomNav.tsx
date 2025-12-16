import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Activity, BookOpen, Plus } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-6 right-6 z-50">
      {/* Glassmorphism Capsule Navigation */}
      <div className="glass-panel px-2 py-3 rounded-full flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60 bg-white/40 backdrop-blur-xl">
        <NavLink to="/home" className={({ isActive }) => `w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60 hover:text-brand-text'}`}>
          {({ isActive }) => (
            <Home size={22} strokeWidth={isActive ? 2.5 : 2} />
          )}
        </NavLink>
        
        <NavLink to="/calendar" className={({ isActive }) => `w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60 hover:text-brand-text'}`}>
          {({ isActive }) => (
            <Calendar size={22} strokeWidth={isActive ? 2.5 : 2} />
          )}
        </NavLink>
        
        {/* Floating Action Button - Dark Contrast like reference */}
        <NavLink to="/mood" className="relative -top-6">
           <div className="w-16 h-16 bg-brand-text rounded-full flex items-center justify-center text-white transition-transform active:scale-95 shadow-lg shadow-brand-text/30 border-4 border-[#F5F7FA]">
             <Plus size={32} />
           </div>
        </NavLink>

        <NavLink to="/health" className={({ isActive }) => `w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60 hover:text-brand-text'}`}>
          {({ isActive }) => (
            <Activity size={22} strokeWidth={isActive ? 2.5 : 2} />
          )}
        </NavLink>
        
        <NavLink to="/knowledge" className={({ isActive }) => `w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60 hover:text-brand-text'}`}>
          {({ isActive }) => (
            <BookOpen size={22} strokeWidth={isActive ? 2.5 : 2} />
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;