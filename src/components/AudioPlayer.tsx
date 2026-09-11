import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { playlist, Track } from '../data/playlistData';

interface AudioPlayerProps {
  variant?: 'navbar' | 'expanded';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ variant = 'navbar' }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
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

    if (isPlaying) {
      audio.play().catch(err => console.log('Audio autoplay prevented:', err));
    }

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (variant === 'navbar') {
    return (
      <div className="nav-audio-pill">
        <button 
          onClick={togglePlay} 
          className="audio-pill-toggle"
          title={isPlaying ? 'Pausar Músicas Dev' : 'Tocar Trilha Sonora Dev'}
        >
          {isPlaying ? <Pause size={14} color="#ff4d6d" /> : <Play size={14} color="#dc143c" />}
          
          <span className="audio-pill-track">
            {currentTrack.title}
          </span>

          {/* Animating Sound Equalizer Bars */}
          <div className={`equalizer-bars ${isPlaying ? 'playing' : ''}`}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </button>

        <button onClick={handleNext} className="audio-pill-next" title="Próxima Faixa">
          <SkipForward size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="expanded-audio-player">
      <div className="player-header">
        <div className="player-badge font-display">
          <Music size={16} color="#dc143c" /> Dev Focus & Study Vibe
        </div>
        <span className="track-genre-tag">{currentTrack.genre}</span>
      </div>

      <div className="player-body">
        <div className="track-info">
          <h4 className="track-title font-subtitle">{currentTrack.title}</h4>
          <p className="track-artist">{currentTrack.artist}</p>
        </div>

        {/* Scrubber Progress Bar */}
        <div className="scrubber-container">
          <span className="time-text">{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleSeek}
            className="audio-scrubber"
          />
          <span className="time-text">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="player-controls">
          <div className="control-buttons">
            <button onClick={handlePrev} className="ctrl-btn" title="Anterior">
              <SkipBack size={18} />
            </button>
            <button onClick={togglePlay} className="ctrl-btn main-play" title={isPlaying ? 'Pausar' : 'Tocar'}>
              {isPlaying ? <Pause size={20} color="#fff" /> : <Play size={20} color="#fff" style={{ marginLeft: 2 }} />}
            </button>
            <button onClick={handleNext} className="ctrl-btn" title="Próxima">
              <SkipForward size={18} />
            </button>
          </div>

          <div className="volume-control">
            <button onClick={() => setIsMuted(!isMuted)} className="ctrl-btn">
              {isMuted || volume === 0 ? <VolumeX size={16} color="#ff4d6d" /> : <Volume2 size={16} />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={isMuted ? 0 : volume} 
              onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
              className="volume-slider"
            />
          </div>
        </div>

        {/* Track Selection List */}
        <div className="playlist-tracks-list">
          {playlist.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx);
                setIsPlaying(true);
              }}
              className={`track-item-row ${idx === currentTrackIndex ? 'active' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="track-number">{idx + 1}.</span>
                <span className="track-item-title">{track.title}</span>
              </div>
              <span className="track-item-artist">{track.artist}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
