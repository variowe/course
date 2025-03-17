import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff } from '@mui/icons-material';
import styled from 'styled-components';

const PlayerContainer = styled(Box)`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  margin: 16px 0;
`;

const PlayButton = styled(IconButton)`
  background: #2196f3;
  color: white;
  margin-right: 16px;
  
  &:hover {
    background: #1976d2;
  }
`;

const VolumeButton = styled(IconButton)`
  color: #666;
  margin-left: 16px;
`;

const TimeDisplay = styled(Typography)`
  min-width: 100px;
  text-align: center;
  color: #666;
`;

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (audioRef.current) {
      const time = newValue as number;
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const newVolume = newValue as number;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <PlayerContainer>
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <PlayButton onClick={handlePlayPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </PlayButton>

      <Box sx={{ flex: 1, mx: 2 }}>
        {title && (
          <Typography variant="subtitle2" gutterBottom>
            {title}
          </Typography>
        )}
        <Slider
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          sx={{
            color: '#2196f3',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
            '& .MuiSlider-track': {
              height: 4,
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TimeDisplay variant="caption">
            {formatTime(currentTime)}
          </TimeDisplay>
          <TimeDisplay variant="caption">
            {formatTime(duration)}
          </TimeDisplay>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', width: 100 }}>
        <VolumeButton onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <VolumeOff /> : <VolumeUp />}
        </VolumeButton>
        <Slider
          value={isMuted ? 0 : volume}
          max={1}
          step={0.1}
          onChange={handleVolumeChange}
          sx={{
            color: '#2196f3',
            '& .MuiSlider-thumb': {
              width: 12,
              height: 12,
            },
            '& .MuiSlider-track': {
              height: 4,
            },
          }}
        />
      </Box>
    </PlayerContainer>
  );
};

export default AudioPlayer; 