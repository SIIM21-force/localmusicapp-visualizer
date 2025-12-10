
import React, { type ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, CssBaseline, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home, MusicNote } from '@mui/icons-material';

const drawerWidth = 240;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Music Player
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                    <Home sx={{ mr: 2}}/>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/player">
                    <MusicNote sx={{ mr: 2}}/>
                    <ListItemText primary="Player" />
                </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
        <Box sx={{ position: 'fixed', bottom: 0, width: '100%', bgcolor: 'background.paper', p: 2 }}>
            <Typography variant="body2" color="text.secondary" align="center">
                Music Player © 2024
            </Typography>
        </Box>
    </Box>
  );
};

export default Layout;
