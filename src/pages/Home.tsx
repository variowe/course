import React from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledCard = styled(motion(Card))`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProgressContainer = styled(Box)`
  margin: 20px 0;
`;

const ProgressLabel = styled(Typography)`
  margin-bottom: 8px;
  color: #666;
`;

const Home = () => {
  const progress = 65; // Пример прогресса

  const lessons = [
    {
      id: 1,
      title: 'Present Simple',
      description: 'Изучите базовое время английского языка',
      progress: 80,
      image: '/images/present-simple.jpg'
    },
    {
      id: 2,
      title: 'Past Simple',
      description: 'Научитесь говорить о прошлом',
      progress: 45,
      image: '/images/past-simple.jpg'
    },
    {
      id: 3,
      title: 'Future Simple',
      description: 'Планируйте будущее на английском',
      progress: 30,
      image: '/images/future-simple.jpg'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в курс английского языка!
      </Typography>
      
      <ProgressContainer>
        <ProgressLabel variant="subtitle1">
          Общий прогресс курса
        </ProgressLabel>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              background: 'linear-gradient(90deg, #2196f3 0%, #64b5f6 100%)'
            }
          }}
        />
      </ProgressContainer>

      <Grid container spacing={3}>
        {lessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson.id}>
            <StyledCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {lesson.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {lesson.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Прогресс: {lesson.progress}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={lesson.progress}
                    sx={{ 
                      height: 6, 
                      borderRadius: 3,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 3,
                        background: 'linear-gradient(90deg, #2196f3 0%, #64b5f6 100%)'
                      }
                    }}
                  />
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 