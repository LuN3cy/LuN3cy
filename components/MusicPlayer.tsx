import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Music, ChevronDown, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ExternalLink } from 'lucide-react';
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
  const playerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !isClosing && playerRef.current && !playerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen && !isClosing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400); // Slightly longer for morphing
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

  const handleVolumeSliderChange = useCallback((newVal: number) => {
    // newVal is 0-1000 from ElasticSlider
    // Human perception of loudness is logarithmic (Fechner's Law).
    // Using an exponential mapping for volume makes the slider feel linear to the ear.
    // volume = sliderValue^2 is a common approximation for audio apps.
    const normalizedVal = newVal / 1000;
    const exponentialVolume = Math.pow(normalizedVal, 2);
    setVolume(exponentialVolume);
    if (newVal > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

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
    // Encode URI to handle spaces and special characters
    return encodeURI(`${base}${normalizedPath}`);
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
      <div className="pointer-events-auto relative" ref={playerRef}>
        <div className={`relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isOpen && !isClosing ? 'w-[320px] h-[385px] opacity-100' : 'w-12 h-12 opacity-100'}`}>
          {!isOpen || isClosing ? (
            <button
              onClick={() => setIsOpen(true)}
              className={`absolute inset-0 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-zinc-700/50 rounded-full shadow-lg flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group z-20 ${isClosing ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
              title={language === 'zh' ? '打开播放器' : 'Open Music Player'}
            >
              <Music className={`w-5 h-5 ${isPlaying ? 'animate-spin-slow' : 'group-hover:animate-spin-slow'}`} />
            </button>
          ) : null}

          {isOpen && (
            <div className={`absolute bottom-0 right-0 backdrop-blur-3xl bg-black/10 shadow-2xl rounded-3xl p-5 w-full h-full origin-bottom-right overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isClosing ? 'scale-[0.15] translate-x-2 translate-y-2 rounded-[100px] opacity-0' : 'scale-100 translate-x-0 translate-y-0 opacity-100'}`}>
              
              {/* Full Cover Background Layer */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <div 
                  key={currentSong.cover}
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-110 blur-[2px] animate-cover-fade"
                  style={{ backgroundImage: `url("${resolveAssetPath(currentSong.cover)}")` }}
                />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest drop-shadow-md">
                    {language === 'zh' ? '正在播放' : 'Now Playing'}
                  </span>
                </div>
                <button 
                  onClick={handleClose}
                  className="text-white/60 hover:text-white transition-colors drop-shadow-md"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Song Info (No separate cover image, just text) */}
              <div className="mb-6 relative z-10">
                <h3 className="font-bold text-2xl text-white truncate leading-tight mb-1 drop-shadow-lg">
                  {currentSong.title}
                </h3>
                <p className="text-sm text-white/80 truncate font-medium drop-shadow-md">
                  {currentSong.artist}
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-3 relative z-10 mb-5">
                {/* Progress Bar & Time */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-end items-center px-0.5">
                    <span className="text-[10px] font-bold text-white/90 tabular-nums drop-shadow-md">
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
                        background: `linear-gradient(to right, rgba(255,255,255,0.9) ${(progress / (duration || 1)) * 100}%, rgba(255,255,255,0.2) ${(progress / (duration || 1)) * 100}%)`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <ElasticSlider 
                      leftIcon={
                        <button onClick={() => setIsMuted(!isMuted)} className="text-white/70 hover:text-white transition-colors">
                          {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      }
                      value={(isMuted ? 0 : Math.sqrt(volume)) * 1000}
                      maxValue={1000}
                      isStepped
                      stepSize={10}
                      onChange={handleVolumeSliderChange}
                    />
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <button onClick={handlePrev} className="text-white/80 hover:text-white transition-colors hover:scale-110 transform drop-shadow-md">
                      <SkipBack className="w-5 h-5 fill-current" />
                    </button>
                    <button 
                      onClick={handlePlayPause}
                      className="w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl backdrop-blur-xl border border-white/30"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                    <button onClick={handleNext} className="text-white/80 hover:text-white transition-colors hover:scale-110 transform drop-shadow-md">
                      <SkipForward className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Playlist Promo - Floating at Bottom */}
              <div className="relative z-10">
                <a 
                  href="https://music.163.com/playlist?id=74188173&uct2=U2FsdGVkX1+9hSmPKFKOu99/rqUgKMjig48CSYAF4Zs=" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <div className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-3 flex items-center justify-between group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white/90 mb-0.5 drop-shadow-md">
                        {language === 'zh' ? '品味不错？' : 'Nice taste?'}
                      </span>
                      <span className="text-[10px] text-white/70 font-medium group-hover:text-white/90 transition-colors">
                        {language === 'zh' ? '我的歌单有更多好听的哦' : 'Check out my full playlist for more'}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-4 h-4 text-white/80" />
                    </div>
                  </div>
                </a>
              </div>

            </div>
          )}
        </div>
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
        @keyframes cover-fade {
          0% { opacity: 0; filter: blur(20px); transform: scale(1.2); }
          100% { opacity: 1; filter: blur(2px); transform: scale(1.1); }
        }
        .animate-cover-fade {
          animation: cover-fade 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        /* Fix range input thumb alignment */
        .music-progress-range::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid rgba(0,0,0,0.1);
          box-shadow: 0 0 8px rgba(0,0,0,0.2);
          transition: all 0.2s ease;
        }
        .music-progress-range::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid rgba(0,0,0,0.1);
          box-shadow: 0 0 8px rgba(0,0,0,0.2);
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
