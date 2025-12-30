import React, { useState, useRef, useEffect } from 'react';
import { Mic, ChevronLeft, ChevronRight, Sparkles, Play, Pause, RotateCw, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MEDITATION_TRACKS = [
  {
    id: 1,
    name: '空灵颂钵',
    desc: '深度自愈 · 空灵之境',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', // 切换到一个更显空灵氛围的示例
    color: 'from-brand-mint via-brand-mintDark to-emerald-400'
  },
  {
    id: 2,
    name: '山间清泉',
    desc: '自然原声 · 恬静流淌',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // 切换示例
    color: 'from-blue-400 via-indigo-400 to-brand-pink'
  },
  {
    id: 3,
    name: '繁星入梦',
    desc: '疗愈钢琴 · 温柔陪伴',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // 切换示例
    color: 'from-brand-pink via-purple-400 to-brand-mint'
  }
];

const Experimental: React.FC = () => {
  const navigate = useNavigate();
  const [activeFunc, setActiveFunc] = useState(3); // 默认开启冥想音乐
  const [isRecording, setIsRecording] = useState(false);
  
  // 冥想音乐状态
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const functions = [
    { id: 1, name: '语音记录' },
    { id: 2, name: 'AI健康助手' },
    { id: 3, name: '冥想音乐' },
  ];

  const currentTrack = MEDITATION_TRACKS[currentTrackIndex];

  // 音频控制逻辑
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url);
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;
    audio.src = currentTrack.url;
    
    if (isPlaying) {
      audio.play().catch(e => console.log('Audio play failed:', e));
    }

    return () => {
      audio.pause();
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // 处理滚动切换音轨
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = 300; // 容器宽度
    const index = Math.round(scrollLeft / itemWidth);
    if (index !== currentTrackIndex && index >= 0 && index < MEDITATION_TRACKS.length) {
      setCurrentTrackIndex(index);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col pt-0 pb-32 overflow-hidden font-sans">
      {/* Header */}
      <div className="px-[14px] h-[44px] flex items-center mb-6 mt-2">
        <h1 className="text-[28px] font-heading font-extrabold text-brand-text leading-tight tracking-tight">
            实验功能
        </h1>
      </div>

      {/* Tabs */}
      <div className="px-[14px] mb-8">
          <div className="flex gap-6 border-b border-brand-shadowDark/20 pb-2 overflow-x-auto no-scrollbar">
              {functions.map((f) => (
                  <button 
                    key={f.id}
                    onClick={() => setActiveFunc(f.id)}
                    className={`whitespace-nowrap text-[16px] font-bold transition-all duration-300 relative ${
                        activeFunc === f.id ? 'text-brand-pinkDark scale-105' : 'text-brand-subtext'
                    }`}
                  >
                      {f.name}
                      {activeFunc === f.id && (
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-pinkDark rounded-full"></div>
                      )}
                  </button>
              ))}
          </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-[14px] relative flex flex-col">
        {activeFunc === 1 && (
            <div className="flex-1 flex flex-col justify-center fade-in pb-12">
                <div className="glass-panel w-full h-48 p-6 mb-10 bg-white/40 border-white/60">
                    <p className="text-body-text font-bold text-brand-text/50">
                        记录后文字整理...
                    </p>
                    {isRecording && (
                        <div className="mt-6 flex gap-1">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="w-1.5 bg-brand-pinkDark rounded-full animate-bounce" style={{ height: `${Math.random()*20 + 10}px`, animationDelay: `${i*0.1}s` }}></div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <button 
                        onClick={() => setIsRecording(!isRecording)}
                        className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all shadow-xl ${
                            isRecording ? 'bg-brand-pinkDark text-white scale-110 shadow-brand-pink/40' : 'bg-white/60 text-brand-text border border-white/60'
                        }`}
                    >
                        <Mic size={32} className={isRecording ? 'animate-pulse' : ''} />
                        <span className="text-[10px] font-bold mt-2 uppercase tracking-[0.2em]">麦克风</span>
                    </button>
                </div>
            </div>
        )}

        {activeFunc === 2 && (
            <div className="flex-1 flex flex-col items-center justify-center fade-in text-center">
                <div className="w-20 h-20 bg-brand-mint/20 rounded-full flex items-center justify-center text-brand-mintDark mb-6 shadow-inner border border-brand-mint/30">
                    <Sparkles size={32} />
                </div>
                <h3 className="text-body-text font-bold text-brand-text mb-2">智能助手准备就绪</h3>
                <p className="text-annotation text-brand-subtext font-bold px-6 leading-relaxed">
                    该功能正在实验室环境内进行压力测试，即将开放实时对话体验。
                </p>
            </div>
        )}

        {activeFunc === 3 && (
            <div className="flex-1 flex flex-col items-center fade-in">
                {/* 滚动选择音轨的 Orb 容器 */}
                <div 
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar py-10"
                >
                  <div className="flex px-[40px] gap-[30px]">
                    {MEDITATION_TRACKS.map((track, idx) => (
                      <div key={track.id} className="snap-center shrink-0 flex flex-col items-center w-[300px]">
                        <div className={`
                          relative w-64 h-64 flex items-center justify-center 
                          transition-all duration-700 ease-in-out
                          ${idx === currentTrackIndex ? 'scale-100 opacity-100' : 'scale-75 opacity-40 blur-[2px]'}
                        `}>
                            {/* 动态发光背景 */}
                            <div className={`
                              absolute inset-0 bg-gradient-to-tr ${track.color} rounded-full 
                              transition-all duration-1000 blur-[50px]
                              ${isPlaying && idx === currentTrackIndex ? 'opacity-40 animate-pulse' : 'opacity-20'}
                            `}></div>
                            
                            {/* 核心 Morphing Orb */}
                            <div className={`
                              w-full h-full glass-panel flex flex-col items-center justify-center p-8 text-center relative z-10 overflow-hidden 
                              transition-all duration-1000 ease-in-out
                              ${isPlaying && idx === currentTrackIndex ? 'animate-morph border-brand-pinkDark/40 scale-105 shadow-2xl bg-white/60' : 'rounded-full bg-white/30'}
                            `}>
                                <div className={`mb-3 text-brand-text/30 ${isPlaying && idx === currentTrackIndex ? 'animate-bounce' : ''}`}>
                                  <Volume2 size={28} />
                                </div>
                                <h4 className="text-[22px] font-extrabold text-brand-text mb-1.5">{track.name}</h4>
                                <p className="text-[13px] font-bold text-brand-subtext uppercase tracking-widest">{track.desc}</p>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 底部播放控制 */}
                <div className="mt-16 flex flex-col items-center">
                    <div className="flex items-center gap-10 mb-6">
                        <button className="w-12 h-12 rounded-full glass-btn text-brand-subtext active:scale-90 transition-transform">
                            <RotateCw size={22} />
                        </button>
                        <button 
                          onClick={togglePlay}
                          className="w-20 h-20 rounded-full bg-brand-text text-white shadow-xl flex items-center justify-center active:scale-90 transition-all transform hover:scale-105"
                        >
                            {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} className="ml-1" fill="currentColor" />}
                        </button>
                        <button className="w-12 h-12 rounded-full glass-btn text-brand-subtext active:scale-90 transition-transform">
                            <Volume2 size={22} />
                        </button>
                    </div>
                    <p className="text-annotation font-bold text-brand-subtext/50 italic tracking-wider">左右滑动切换不同疗愈轻音乐</p>
                </div>
            </div>
        )}
      </div>

      <style>{`
        @keyframes morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1.05); }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: scale(1.08); }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: scale(1.05); }
        }
        .animate-morph {
          animation: morph 6s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Experimental;