import React, { useState, useRef, useEffect } from 'react';
import { Music, X, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { MUSIC_PLAYLIST, Song } from '../src/data/music';
import ElasticSlider from './ElasticSlider';

import { Language } from '../types';

interface MusicPlayerProps {
  initialVisible?: boolean;
  language?: Language;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ initialVisible = false, language = 'zh' }) => {
  const [isSeeking, setIsSeeking] = useState(false);
  const [isOpen, setIsOpen] = useState(initialVisible);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = MUSIC_PLAYLIST[currentSongIndex];

  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Auto-show prompt after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasInteracted) {
        setShowPrompt(true);
      }
    }, 3000); // Show prompt after 3 seconds
    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) {
        // Need to handle autoplay restrictions
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex, isMuted, volume]);

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (initialVisible) {
      setIsOpen(true);
    }
  }, [initialVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % MUSIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + MUSIC_PLAYLIST.length) % MUSIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  const handlePromptResponse = (accept: boolean) => {
    setShowPrompt(false);
    setHasInteracted(true);
    if (accept) {
      setIsOpen(true);
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleVolumeSliderChange = (newVal: number) => {
    const newVolume = newVal / 1000;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeekEnd = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setIsSeeking(false);
    const target = e.currentTarget;
    const newTime = parseFloat(target.value);
    if (audioRef.current) {
        audioRef.current.currentTime = newTime;
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Playback failed after seek:", error);
                    setIsPlaying(false);
                });
            }
        }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
  };

  // Format time in seconds to M:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get absolute URL for assets (handles GitHub Pages base path)
  const resolveAssetPath = (path: string) => {
    if (path.startsWith('http')) return path;
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
  };

  // Get audio source URL
  const getSongUrl = (song: Song) => {
    return resolveAssetPath(song.audio);
  };

  // Ensure audio is properly disposed only when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Hidden Audio Element - Always mounted */}
      <audio 
        ref={audioRef}
        src={getSongUrl(currentSong)}
        crossOrigin="anonymous"
        onTimeUpdate={(e) => {
            if (!isSeeking) {
                setProgress(e.currentTarget.currentTime);
            }
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleNext}
        onError={() => {
          console.error("Audio load failed for song:", currentSong.title);
          setIsPlaying(false);
        }}
      />

      {/* Floating Prompt Bubble */}
      {showPrompt && !isOpen && (
        <div className="pointer-events-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-2xl p-4 animate-bounce-subtle max-w-[220px]">
          <p className="text-sm font-medium mb-3 text-zinc-800 dark:text-zinc-200">
            {language === 'zh' ? '👋 来点氛围音乐？' : '👋 How about some ambient music?'}
          </p>
          <div className="flex gap-2 justify-end">
            <button 
              onClick={() => handlePromptResponse(false)}
              className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              {language === 'zh' ? '不了' : 'No thanks'}
            </button>
            <button 
              onClick={() => handlePromptResponse(true)}
              className="px-3 py-1.5 text-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              {language === 'zh' ? '阔以' : 'Sure'}
            </button>
          </div>
        </div>
      )}

      {/* Main Player or Floating Icon */}
      <div className="pointer-events-auto">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/20 dark:border-zinc-700/50 rounded-full shadow-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:scale-110 transition-transform duration-200 group"
            title={language === 'zh' ? '打开播放器' : 'Open Music Player'}
          >
            <Music className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow' : 'group-hover:animate-spin-slow'}`} />
          </button>
        ) : (
          <div className={`backdrop-blur-xl bg-white/70 dark:bg-black/60 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-5 w-[300px] origin-bottom-right overflow-hidden ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}>
            
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl -z-10 pointer-events-none translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-10 translate-y-10"></div>

            {/* Header */}
            <div className="flex items-center justify-between mb-5 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)] animate-pulse"></span>
                <span className="text-[10px] font-bold text-zinc-500/80 dark:text-zinc-400/80 uppercase tracking-widest">
                  {language === 'zh' ? '正在播放' : 'Now Playing'}
                </span>
              </div>
              <button 
                onClick={handleClose}
                className="text-zinc-400/80 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cover & Info */}
            <div className="flex gap-4 mb-5 relative z-10">
              <div className={`w-20 h-20 rounded-xl overflow-hidden shadow-lg shrink-0 border border-black/5 dark:border-white/5 ${isPlaying ? 'animate-pulse-slow' : ''}`}>
                <img 
                  src={resolveAssetPath(currentSong.cover)} 
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h3 className="font-bold text-lg text-zinc-800 dark:text-white truncate leading-tight mb-1">
                  {currentSong.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate font-medium">
                  {currentSong.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 relative z-10">
              {/* Progress Bar & Time */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-end items-center px-0.5">
                  <span className="text-[10px] font-medium text-zinc-500/80 dark:text-zinc-400/80 tabular-nums">
                    {formatTime(progress)} / {formatTime(duration)}
                  </span>
                </div>
                <div className="relative group h-4 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={progress}
                    onMouseDown={handleSeekStart}
                    onTouchStart={handleSeekStart}
                    onChange={handleSeek}
                    onMouseUp={handleSeekEnd}
                    onTouchEnd={handleSeekEnd}
                    className="music-progress-range w-full h-1.5 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full appearance-none cursor-pointer focus:outline-none relative z-10"
                    style={{
                      background: `linear-gradient(to right, ${document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.9)' : 'rgba(24,24,27,0.8)'} ${(progress / (duration || 1)) * 100}%, transparent ${(progress / (duration || 1)) * 100}%)`
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1">
                  <ElasticSlider 
                    leftIcon={
                      <button onClick={() => setIsMuted(!isMuted)} className="hover:text-zinc-800 dark:hover:text-white transition-colors">
                        {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    }
                    value={(isMuted ? 0 : volume) * 1000}
                    maxValue={1000}
                    isStepped
                    stepSize={10}
                    onChange={handleVolumeSliderChange}
                  />
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <button onClick={handlePrev} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors hover:scale-110 transform">
                    <SkipBack className="w-5 h-5 fill-current" />
                  </button>
                  <button 
                    onClick={handlePlayPause}
                    className="w-12 h-12 bg-zinc-900/90 dark:bg-white/90 text-white dark:text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg backdrop-blur-sm"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <button onClick={handleNext} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors hover:scale-110 transform">
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes scale-out {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        .animate-scale-out {
          animation: scale-out 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        /* Fix range input thumb alignment */
        .music-progress-range::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: #18181b; /* zinc-900 */
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        .music-progress-range::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: #18181b;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
          transition: all 0.2s ease;
        }
        .music-progress-range:hover::-webkit-slider-thumb {
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }
        .dark .music-progress-range::-webkit-slider-thumb {
          background: white;
          border-color: #18181b;
        }
        .dark .music-progress-range::-moz-range-thumb {
          background: white;
          border-color: #18181b;
        }
      `}</style>
    </div>
  );
};
