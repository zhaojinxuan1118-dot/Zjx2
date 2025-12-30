import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BarChart2, BookOpen, Plus, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 px-[14px] pb-2">
      <div className="glass-panel h-[50px] px-2 rounded-full flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60 bg-white/40 backdrop-blur-xl">
        <NavLink to="/home" className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60'}`}>
          <Home size={20} />
        </NavLink>
        
        <NavLink to="/insights" className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60'}`}>
          <BarChart2 size={20} />
        </NavLink>
        
        <NavLink to="/mood-record" className="relative -top-4">
           <div className="w-14 h-14 bg-brand-text rounded-full flex items-center justify-center text-white shadow-lg border-4 border-[#F5F7FA] active:scale-95 transition-transform">
             <Plus size={28} />
           </div>
        </NavLink>

        <NavLink to="/knowledge" className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60'}`}>
          <BookOpen size={20} />
        </NavLink>
        
        <NavLink to="/profile" className={({ isActive }) => `w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-white text-brand-pinkDark shadow-sm' : 'text-brand-text/60'}`}>
          <User size={20} />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;