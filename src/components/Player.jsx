import React, { useState, useEffect, useRef } from "react";

const Player = ({ currentTrack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(50);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current && currentTrack.preview) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => {
            console.warn("Autoplay blocked:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrack]);
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = event.target.value / 100;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (event) => {
    const newTime = event.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // Format time in mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="player bg-dark text-white p-4">
      {/* Audio tag */}
      <audio
        ref={audioRef}
        src={currentTrack.preview}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />

      <div className="d-flex justify-content-between align-items-center">
        {/* Track Info */}
        <div className="d-flex align-items-center">
          <img
            src={currentTrack.album.cover_medium}
            alt={currentTrack.title}
            className="rounded-circle"
            style={{ width: "50px", height: "50px", marginRight: "15px" }}
          />
          <div>
            <h6 className="mb-0">{currentTrack.title}</h6>
            <small>{currentTrack.artist.name}</small>
          </div>
        </div>

        {/* Controls */}
        <div className="d-flex align-items-center">
          <button className="btn btn-dark" onClick={() => setIsPlaying(false)}>
            <i className="bi bi-skip-backward-fill"></i>
          </button>
          <button className="btn btn-dark mx-3" onClick={togglePlayPause}>
            <i
              className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}
            ></i>
          </button>
          <button className="btn btn-dark" onClick={() => setIsPlaying(true)}>
            <i className="bi bi-skip-forward-fill"></i>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="d-flex justify-content-between">
          <small>{formatTime(progress)}</small>
          <small>{formatTime(duration)}</small>
        </div>
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          className="form-range"
          onChange={handleSeek}
        />
      </div>

      {/* Volume control */}
      <div className="mt-2">
        <label htmlFor="volume" className="form-label">
          Volume
        </label>
        <input
          type="range"
          id="volume"
          className="form-range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default Player;
