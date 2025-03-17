import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import CoursePage from './components/CoursePage';
import CoursesPage from './components/CoursesPage';
import ProfilePage from './components/ProfilePage';
import HomeworkPage from './components/HomeworkPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e60023', // Pinterest red
    },
    secondary: {
      main: '#666666',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/homework" element={<HomeworkPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 