
import React from 'react';
import { List, ListItem, ListItemText, Typography, ListItemButton } from '@mui/material';

interface PlaylistProps {
  tracks: File[];
  currentTrack: number;
  onTrackSelect: (index: number) => void;
}

const Playlist: React.FC<PlaylistProps> = ({ tracks, currentTrack, onTrackSelect }) => {
  return (
    <div>
      <Typography variant="h6">Playlist</Typography>
      <List>
        {tracks.map((track, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={index === currentTrack}
              onClick={() => onTrackSelect(index)}
            >
              <ListItemText primary={track.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Playlist;
