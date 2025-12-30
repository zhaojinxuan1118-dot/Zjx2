import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import LoadingPage from './pages/LoadingPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CalendarPage from './pages/Calendar';
import HealthPage from './pages/Health';
import Insights from './pages/Insights';
import MoodRecord from './pages/MoodRecord';
import Knowledge from './pages/Knowledge';
import Experimental from './pages/Experimental';
import MenopauseSummary from './pages/MenopauseSummary';
import BottomNav from './components/BottomNav';

const IPhone15Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#E7E3DD] flex items-center justify-center p-4 font-sans">
      {/* 调整外边框阴影以匹配 #FAF6F3 的暖灰质感 */}
      <div className="relative w-[393px] h-[852px] bg-black rounded-[55px] shadow-[30px_30px_60px_#D1CDC8,-30px_-30px_60px_#FFFFFF] ring-8 ring-[#FAF6F3] border-[8px] border-gray-900 box-border overflow-hidden">
        <div className="w-full h-full bg-brand-bg rounded-[46px] overflow-hidden relative flex flex-col">
          {/* Status Bar */}
          <div className="w-full h-[44px] z-[100] flex justify-center pointer-events-none relative shrink-0">
            <div className="mt-2 w-[120px] h-[28px] bg-black rounded-full"></div>
            <div className="absolute inset-0 flex justify-between px-8 items-center text-brand-text text-[15px] font-bold">
               <span>9:41</span>
               <div className="flex gap-1.5 items-center">
                  <div className="w-4 h-4 rounded-sm bg-current opacity-80"></div>
                  <div className="w-6 h-3 border-2 border-current rounded-[4px] relative opacity-80">
                      <div className="absolute inset-0.5 bg-current rounded-[1px]"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Main Content Viewport */}
          <div className="flex-1 relative overflow-hidden flex flex-col bg-[#FAF6F3]">
              {children}
          </div>

          {/* Home Indicator */}
          <div className="h-[44px] w-full flex items-center justify-center relative z-[100] shrink-0 bg-transparent">
            <div className="w-[134px] h-[5px] bg-black/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Layout: React.FC = () => {
  const location = useLocation();
  const hideNavRoutes = ['/', '/auth', '/onboarding', '/loading', '/mood-record', '/menopause-summary']; 
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/mood-record" element={<MoodRecord />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/experimental" element={<Experimental />} />
          <Route path="/profile" element={<Profile />} />
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