
import React, { useState, useRef, type ChangeEvent, useEffect, useCallback } from 'react';
import { Typography, Container, Button, Box, Card, CardContent, ButtonGroup } from '@mui/material';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import Playlist from '../components/Playlist';

const Player: React.FC = () => {
  const [playlist, setPlaylist] = useState<File[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [visualizationType, setVisualizationType] = useState('bar');
  const audioRef = useRef<HTMLAudioElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const audioMotionRef = useRef<AudioMotionAnalyzer | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPlaylist(Array.from(event.target.files));
    }
  };

  const setVisualizerMode = useCallback(() => {
    const audioMotion = audioMotionRef.current;
    if (audioMotion) {
      if (visualizationType === 'monstercat') {
        audioMotion.setOptions({
          mode: 10,              // Area graph mode for smooth fills
          gradient: 'prism',      // Colorful gradient (or create custom)
          radial: true,           // Circular layout
          spinSpeed: 0,           // No rotation (or slow: 1)
          reflexRatio: 0,         // No reflection at bottom
          barSpace: 0.1,          // Small gap between bars
          ledBars: false,         // Smooth bars, not LED style
          lumiBars: false,        // Consistent coloring
          showPeaks: false,       // Clean look without peaks
          channelLayout: 'dual-combined', // Stereo effect
          fftSize: 8192,          // High resolution
          minFreq: 30,            // Cut low rumble
          maxFreq: 16000,         // Focus on musical range
          minDecibels: -85,       // Better dynamic range
          maxDecibels: -25,
          smoothing: 0.7,         // Smooth transitions
        });
      } else if (visualizationType === 'bar') {
        audioMotion.setOptions({
          mode: 5,                // Bars mode with better response
          ledBars: false,
          fftSize: 4096,          // Higher resolution
          barSpace: 0.25,
          radial: false,
          minFreq: 20,
          maxFreq: 20000,
          minDecibels: -90,
          maxDecibels: -20,
          smoothing: 0.5,
        });
      }
    }
  }, [visualizationType]);

  const handlePlay = useCallback(() => {
    if (audioRef.current && playlist.length > 0) {
      if (!audioMotionRef.current) {
        const container = visualizerRef.current;
        if (container) {
          const audioMotion = new AudioMotionAnalyzer(container, {
            source: audioRef.current,
            height: 300,
          });
          audioMotionRef.current = audioMotion;
        }
      }

      setVisualizerMode();
      audioRef.current.play();
    }
  }, [playlist.length, setVisualizerMode]);

  const handleVisualizationChange = (type: string) => {
    setVisualizationType(type);
    if (audioMotionRef.current) {
      setVisualizerMode();
    }
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
  };

  const handleNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack + 1) % playlist.length);
  };

  useEffect(() => {
    if (audioRef.current && playlist.length > 0) {
      audioRef.current.src = URL.createObjectURL(playlist[currentTrack]);
      handlePlay();
    }
  }, [currentTrack, playlist, handlePlay]);

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Player
          </Typography>
          <Box sx={{ mb: 2 }}>
            <input type="file" accept="audio/*" multiple onChange={handleFileChange} />
          </Box>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => handleVisualizationChange('bar')} disabled={visualizationType === 'bar'}>
              Bar
            </Button>
            <Button onClick={() => handleVisualizationChange('radial')} disabled={visualizationType === 'radial'}>
              Radial
            </Button>
          </ButtonGroup>
          <Button variant="contained" onClick={handlePlay} disabled={playlist.length === 0} sx={{ ml: 2 }}>
            Play
          </Button>
          <audio ref={audioRef} controls onEnded={handleNextTrack} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <div ref={visualizerRef}></div>
          </Box>
          {playlist.length > 0 && (
            <Playlist tracks={playlist} currentTrack={currentTrack} onTrackSelect={handleTrackSelect} />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Player;
