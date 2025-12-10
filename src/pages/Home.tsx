
import React from 'react';
import { Typography, Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to the Music Player
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                The ultimate music visualizer
            </Typography>
            <Button component={Link} to="/player" variant="contained" sx={{ mt: 4 }}>
                Get Started
            </Button>
        </Box>
    </Container>
  );
};

export default Home;
