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
  hasStartedWithAudio: boolean;
  togglePlay: () => void;
  startExperienceWithAudio: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  handleSeek: (time: number) => void;
  setVolume: (vol: number) => void;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  selectTrack: (index: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const STORAGE_KEYS = {
  volume: 'audio:volume',
  trackIndex: 'audio:trackIndex'
} as const;

const readStoredNumber = (key: string, fallback: number): number => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const stored = readStoredNumber(STORAGE_KEYS.trackIndex, 0);
    return stored >= 0 && stored < playlist.length ? stored : 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(() => readStoredNumber(STORAGE_KEYS.volume, 0.15));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStartedWithAudio, setHasStartedWithAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack: Track = playlist[currentTrackIndex] || playlist[0];

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

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

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
    // Re-criar listeners apenas na troca de faixa; volume/mute/play têm efeitos próprios abaixo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.volume, String(volume));
    } catch {
      /* storage indisponível (ex.: modo privado) — ignora */
    }
  }, [volume]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.trackIndex, String(currentTrackIndex));
    } catch {
      /* storage indisponível (ex.: modo privado) — ignora */
    }
  }, [currentTrackIndex]);

  const startExperienceWithAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedWithAudio(true);
        })
        .catch((err) => console.log('Audio playback allowed via user click:', err));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedWithAudio(true);
        })
        .catch((err) => console.log(err));
    }
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
    setHasStartedWithAudio(true);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrackIndex,
        currentTrack,
        isPlaying,
        isMuted,
        volume,
        currentTime,
        duration,
        hasStartedWithAudio,
        togglePlay,
        startExperienceWithAudio,
        handleNext,
        handlePrev,
        handleSeek,
        setVolume,
        setIsMuted,
        selectTrack
      }}
    >
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
