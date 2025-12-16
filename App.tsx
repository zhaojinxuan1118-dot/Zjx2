import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CalendarPage from './pages/Calendar';
import HealthPage from './pages/Health';
import MoodPage from './pages/Mood';
import KnowledgePage from './pages/Knowledge';
import MenopauseSummary from './pages/MenopauseSummary';
import BottomNav from './components/BottomNav';

// iPhone 15 Frame Component
const IPhone15Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#E0E5EC] flex items-center justify-center p-4 font-sans">
      {/* Phone Body */}
      <div className="relative w-[393px] h-[852px] bg-black rounded-[55px] shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_#ffffff] ring-8 ring-[#d1d9e6] border-[8px] border-gray-800 box-border overflow-hidden">
        
        {/* Hardware Buttons */}
        <div className="absolute top-28 -left-[14px] h-10 w-[6px] bg-gray-600 rounded-l-md"></div>
        <div className="absolute top-44 -left-[14px] h-16 w-[6px] bg-gray-600 rounded-l-md"></div>
        <div className="absolute top-36 -right-[14px] h-24 w-[6px] bg-gray-600 rounded-r-md"></div>

        {/* Screen */}
        <div className="w-full h-full bg-brand-bg rounded-[46px] overflow-hidden relative flex flex-col">
          
          {/* Dynamic Island / Status Bar Area */}
          <div className="absolute top-0 w-full h-[54px] z-[100] flex justify-center pointer-events-none">
            {/* Dynamic Island */}
            <div className="mt-3 w-[120px] h-[36px] bg-black rounded-full flex items-center justify-center relative">
               <div className="w-20 h-full"></div> 
            </div>
            
            {/* Simulated Status Bar Text */}
            <div className="absolute top-0 w-full h-full flex justify-between px-8 items-center pt-3 text-brand-text text-[15px] font-bold mix-blend-multiply">
               <span className="ml-2">9:41</span>
               <div className="flex gap-1.5 mr-2">
                  <div className="w-4 h-4 rounded-sm bg-current opacity-60"></div>
                  <div className="w-4 h-4 rounded-sm bg-current opacity-60"></div>
                  <div className="w-6 h-3 border-2 border-current rounded-[4px] relative opacity-60">
                      <div className="absolute inset-0.5 bg-current rounded-[1px]"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Main App Content Area */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
              {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black/20 rounded-full z-[100] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC = () => {
  const location = useLocation();
  // Routes where BottomNav should be hidden
  const hideNavRoutes = ['/', '/auth', '/onboarding', '/mood', '/menopause-summary', '/profile']; 
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28 pt-8">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/menopause-summary" element={<MenopauseSummary />} />
        </Routes>
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <IPhone15Frame>
        <Layout />
      </IPhone15Frame>
    </HashRouter>
  );
};

export default App;