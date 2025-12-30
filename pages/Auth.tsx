import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ChevronRight } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    // 模拟登录/注册成功后的跳转
    if (isLogin) {
      navigate('/home');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-8 relative overflow-hidden">
      {/* 核心新拟态卡片容器 - 匹配参考图比例 */}
      <div className="neu-flat w-full max-w-[320px] rounded-[48px] py-14 px-8 flex flex-col items-center animate-in fade-in zoom-in duration-700">
          
          {/* 头像区域 - 对应参考图中的褐色圆环标识 */}
          <div className="mb-6">
              <div className="w-[88px] h-[88px] rounded-full neu-flat flex items-center justify-center p-1 border border-white/40">
                  <div className="w-full h-full rounded-full border-[3px] border-[#4A3F35] flex items-center justify-center text-[#4A3F35]">
                      <User size={42} strokeWidth={1.5} />
                  </div>
              </div>
          </div>

          {/* 标题区域 - 匹配参考图字体粗细与颜色 */}
          <div className="mb-12 text-center">
            <h1 className="text-[28px] font-heading font-extrabold text-[#4A3F35] tracking-tight leading-tight">
                LunaFlow
            </h1>
            <p className="text-[14px] font-bold text-[#A69689] mt-1 opacity-80">
                {isLogin ? '欢迎回来' : '新用户注册'}
            </p>
          </div>

          {/* 表单输入区域 */}
          <div className="w-full space-y-5">
              
              {!isLogin && (
                  <div className="neu-pressed h-[58px] rounded-full px-6 flex items-center gap-4 transition-all">
                      <User size={20} className="text-[#4A3F35] shrink-0" strokeWidth={1.5} />
                      <input 
                        type="text" 
                        placeholder="用户名"
                        className="bg-transparent outline-none border-none flex-1 text-body-text font-bold text-[#4A3F35] placeholder-[#A69689]/60"
                      />
                  </div>
              )}

              <div className="neu-pressed h-[58px] rounded-full px-6 flex items-center gap-4 transition-all">
                  <Mail size={20} className="text-[#4A3F35] shrink-0" strokeWidth={1.5} />
                  <input 
                    type="email" 
                    placeholder="电子邮箱"
                    className="bg-transparent outline-none border-none flex-1 text-body-text font-bold text-[#4A3F35] placeholder-[#A69689]/60"
                  />
              </div>

              <div className="neu-pressed h-[58px] rounded-full px-6 flex items-center gap-4 transition-all">
                  <Lock size={20} className="text-[#4A3F35] shrink-0" strokeWidth={1.5} />
                  <input 
                    type="password" 
                    placeholder="密码"
                    className="bg-transparent outline-none border-none flex-1 text-body-text font-bold text-[#4A3F35] placeholder-[#A69689]/60"
                  />
              </div>

              {/* 登录按钮 - 匹配参考图样式 */}
              <button 
                onClick={handleAuth}
                className="w-full h-[58px] mt-10 neu-btn rounded-full flex items-center justify-center gap-2 group active:scale-[0.97] transition-all bg-white/40"
              >
                  <span className="text-[17px] font-extrabold text-[#4A3F35]">
                      {isLogin ? '登录' : '注册'}
                  </span>
                  <ChevronRight size={18} className="text-[#4A3F35] group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>

              {/* 切换模式链接 */}
              <div className="flex justify-center mt-6">
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[12px] font-bold text-[#A69689] hover:text-[#4A3F35] transition-colors"
                  >
                      {isLogin ? '没有账号？去注册' : '已有账号？去登录'}
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Auth;