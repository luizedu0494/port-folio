import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { playlist, Track } from '../data/playlistData';

interface AudioContextType {
  currentTrackIndex: number;
  currentTrack: Track;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  togglePlay: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSeek: (time: number) => void;
  setVolume: (vol: number) => void;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  selectTrack: (index: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack: Track = playlist[currentTrackIndex] || playlist[0];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
      audioRef.current.volume = volume;
    } else {
      audioRef.current.src = currentTrack.src;
    }

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Try immediate autoplay
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // If blocked by browser autoplay policy, start on first mouse movement, touch, key or scroll
      const triggerPlay = () => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(e => console.log('Autoplay play error:', e));
        }
      };

      const options = { once: true, capture: true };
      window.addEventListener('pointerdown', triggerPlay, options);
      window.addEventListener('touchstart', triggerPlay, options);
      window.addEventListener('mousemove', triggerPlay, options);
      window.addEventListener('scroll', triggerPlay, options);
      window.addEventListener('keydown', triggerPlay, options);
      window.addEventListener('click', triggerPlay, options);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log(err));
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    setIsMuted(false);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <AudioContext.Provider value={{
      currentTrackIndex,
      currentTrack,
      isPlaying,
      isMuted,
      volume,
      currentTime,
      duration,
      togglePlay,
      handleNext,
      handlePrev,
      handleSeek,
      setVolume,
      setIsMuted,
      selectTrack
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
