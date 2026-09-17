import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { playlist } from '../data/playlistData';
import { useAudio } from '../context/AudioContext';

interface AudioPlayerProps {
  variant?: 'navbar' | 'expanded';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ variant = 'navbar' }) => {
  const {
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
  } = useAudio();

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
          aria-label={isPlaying ? 'Pausar reprodução de áudio' : 'Tocar reprodução de áudio'}
        >
          {isPlaying ? <Pause size={14} color="var(--accent-soft)" /> : <Play size={14} color="var(--accent-crimson)" />}
          
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

        <button onClick={handleNext} className="audio-pill-next" title="Próxima Faixa" aria-label="Ir para a próxima faixa de áudio">
          <SkipForward size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="expanded-audio-player">
      <div className="player-header">
        <div className="player-badge font-display">
          <Music size={16} color="var(--accent-crimson)" /> Dev Focus & Study Vibe
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
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="audio-scrubber"
            aria-label="Posição da música em reprodução"
          />
          <span className="time-text">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="player-controls">
          <div className="control-buttons">
            <button onClick={handlePrev} className="ctrl-btn" title="Anterior" aria-label="Faixa anterior">
              <SkipBack size={18} />
            </button>
            <button onClick={togglePlay} className="ctrl-btn main-play" title={isPlaying ? 'Pausar' : 'Tocar'} aria-label={isPlaying ? 'Pausar áudio' : 'Tocar áudio'}>
              {isPlaying ? <Pause size={20} color="#fff" /> : <Play size={20} color="#fff" style={{ marginLeft: 2 }} />}
            </button>
            <button onClick={handleNext} className="ctrl-btn" title="Próxima" aria-label="Próxima faixa">
              <SkipForward size={18} />
            </button>
          </div>

          <div className="volume-control">
            <button onClick={() => setIsMuted(!isMuted)} className="ctrl-btn" aria-label={isMuted ? 'Ativar som' : 'Mutar som'}>
              {isMuted || volume === 0 ? <VolumeX size={16} color="var(--accent-soft)" /> : <Volume2 size={16} />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={isMuted ? 0 : volume} 
              onChange={(e) => setVolume(Number(e.target.value))}
              className="volume-slider"
              aria-label="Controle de volume do áudio"
            />
          </div>
        </div>

        {/* Track Selection List */}
        <div className="playlist-tracks-list">
          {playlist.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => selectTrack(idx)}
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
