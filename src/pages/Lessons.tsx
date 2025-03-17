import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Grid, IconButton } from '@mui/material';
import { PlayArrow, Pause, VolumeUp } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LessonContainer = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const AudioPlayer = styled(Box)`
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

const Lessons = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(1);

  const lessons = [
    {
      id: 1,
      title: 'Present Simple - Основы',
      content: `Present Simple используется для:
      • Регулярных действий
      • Фактов и общих истин
      • Расписаний и графиков
      
      Примеры:
      I work every day.
      The sun rises in the east.
      The train leaves at 9 AM.`,
      audioUrl: '/audio/present-simple.mp3'
    },
    {
      id: 2,
      title: 'Present Simple - Отрицания и вопросы',
      content: `Отрицания:
      I don't work on weekends.
      She doesn't speak French.
      
      Вопросы:
      Do you like coffee?
      Does he play tennis?`,
      audioUrl: '/audio/present-simple-questions.mp3'
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Здесь будет логика воспроизведения аудио
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Уроки английского языка
      </Typography>

      {lessons.map((lesson) => (
        <motion.div
          key={lesson.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LessonContainer>
            <Typography variant="h5" gutterBottom>
              {lesson.title}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {lesson.content}
            </Typography>

            <AudioPlayer>
              <PlayButton onClick={handlePlayPause}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </PlayButton>
              <Typography variant="body2" color="textSecondary">
                Прослушать произношение
              </Typography>
              <VolumeButton>
                <VolumeUp />
              </VolumeButton>
            </AudioPlayer>

            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary">
                  Следующий урок
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Практические упражнения
                </Button>
              </Grid>
            </Grid>
          </LessonContainer>
        </motion.div>
      ))}
    </Box>
  );
};

export default Lessons; 