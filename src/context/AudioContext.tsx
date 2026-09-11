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
  const [volume, setVolumeState] = useState(0.15); // Volume padrão suave (15%)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack: Track = playlist[currentTrackIndex] || playlist[0];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.src);
    } else {
      audioRef.current.src = currentTrack.src;
    }

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Tenta reprodução imediata com o volume suave de 15%
    const attemptPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Caso o navegador bloqueie áudio não solicitado, inicia silenciado e desmuta na 1ª ação
        audio.muted = true;
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});

        const unlockAudio = () => {
          if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.volume = volume;
            audioRef.current.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {});
          }
        };

        const opts = { once: true, capture: true };
        window.addEventListener('pointerdown', unlockAudio, opts);
        window.addEventListener('touchstart', unlockAudio, opts);
        window.addEventListener('mousemove', unlockAudio, opts);
        window.addEventListener('scroll', unlockAudio, opts);
        window.addEventListener('keydown', unlockAudio, opts);
        window.addEventListener('click', unlockAudio, opts);
      });
    };

    attemptPlay();

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
