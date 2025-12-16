import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    // In a real app, validate and authenticate here.
    if (isLogin) {
      navigate('/home');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center px-8 relative overflow-hidden">
      
      {/* 
        Glassmorphism Background Elements 
        Using large blurred circles to create depth behind the glass
      */}
      <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-brand-pink rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-pulse"></div>
      <div className="absolute top-[20%] left-[-20%] w-[250px] h-[250px] bg-brand-mint rounded-full mix-blend-multiply filter blur-[80px] opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-50"></div>

      {/* Main Glass Panel */}
      <div className="glass-panel w-full max-w-sm p-8 z-10 flex flex-col items-center fade-in">
          
          {/* Logo Area */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/80 to-white/20 flex items-center justify-center mb-4 text-brand-pinkDark shadow-lg border border-white/50">
                <Heart size={36} fill="currentColor" />
            </div>
            <h1 className="text-3xl font-heading font-extrabold text-brand-text">LunaFlow</h1>
            <p className="text-sm font-bold text-brand-subtext tracking-[0.2em] uppercase mt-2">
                {isLogin ? '欢迎回来' : '开启旅程'}
            </p>
          </div>

          {/* Form Container */}
          <div className="w-full space-y-5">
              
              {!isLogin && (
                  <div className="glass-input px-5 py-4 flex items-center gap-3 animate-in slide-in-from-bottom-2">
                      <User size={20} className="text-brand-subtext" />
                      <input 
                        type="text" 
                        placeholder="您的昵称"
                        className="bg-transparent outline-none border-none flex-1 text-base font-bold text-brand-text placeholder-brand-subtext/60"
                      />
                  </div>
              )}

              <div className="glass-input px-5 py-4 flex items-center gap-3">
                  <Mail size={20} className="text-brand-subtext" />
                  <input 
                    type="email" 
                    placeholder="电子邮箱"
                    className="bg-transparent outline-none border-none flex-1 text-base font-bold text-brand-text placeholder-brand-subtext/60"
                  />
              </div>

              <div className="glass-input px-5 py-4 flex items-center gap-3">
                  <Lock size={20} className="text-brand-subtext" />
                  <input 
                    type="password" 
                    placeholder="密码"
                    className="bg-transparent outline-none border-none flex-1 text-base font-bold text-brand-text placeholder-brand-subtext/60"
                  />
              </div>

              <button 
                onClick={handleAuth}
                className="w-full py-4 rounded-full bg-brand-pinkDark text-white text-lg font-bold shadow-lg shadow-brand-pink/30 hover:shadow-brand-pink/50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6"
              >
                  {isLogin ? '登录' : '创建账号'}
                  <ArrowRight size={20} />
              </button>

              <div className="flex justify-center mt-4">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm font-bold text-brand-subtext hover:text-brand-pinkDark transition-colors"
                  >
                      {isLogin ? '还没有账号？ 去注册' : '已有账号？ 去登录'}
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Auth;