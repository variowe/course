import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
  position: 'fixed',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: '#666',
  '&.active': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <StyledAppBar>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <StyledIconButton
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => navigate('/')}
            size="large"
          >
            <HomeIcon />
          </StyledIconButton>
          <StyledIconButton
            className={location.pathname === '/courses' ? 'active' : ''}
            onClick={() => navigate('/courses')}
            size="large"
          >
            <SchoolIcon />
          </StyledIconButton>
          <StyledIconButton
            className={location.pathname === '/homework' ? 'active' : ''}
            onClick={() => navigate('/homework')}
            size="large"
          >
            <AssignmentIcon />
          </StyledIconButton>
          <StyledIconButton
            className={location.pathname === '/profile' ? 'active' : ''}
            onClick={() => navigate('/profile')}
            size="large"
          >
            <PersonIcon />
          </StyledIconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navigation; 