import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Grid, IconButton } from '@mui/material';
import { CloudUpload, Mic, Send } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeworkContainer = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const UploadArea = styled(Box)`
  border: 2px dashed #2196f3;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin: 16px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(33, 150, 243, 0.1);
  }
`;

const VoiceRecordButton = styled(IconButton)`
  background: #f50057;
  color: white;
  margin: 8px;
  
  &:hover {
    background: #c51162;
  }
`;

const Homework = () => {
  const [textAnswer, setTextAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const homeworkTasks = [
    {
      id: 1,
      title: 'Упражнение 1: Present Simple',
      description: 'Напишите 5 предложений о своих ежедневных действиях в Present Simple.',
      deadline: 'До 25 марта 2024',
      type: 'text'
    },
    {
      id: 2,
      title: 'Упражнение 2: Произношение',
      description: 'Запишите аудио, прочитав следующий текст: "I wake up early every morning and start my day with a cup of coffee."',
      deadline: 'До 26 марта 2024',
      type: 'voice'
    }
  ];

  const handleTextSubmit = (taskId: number) => {
    // Здесь будет логика отправки текстового ответа
    console.log('Отправка текстового ответа:', textAnswer);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Здесь будет логика записи голоса
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Здесь будет логика загрузки файла
      console.log('Загрузка файла:', file.name);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Домашние задания
      </Typography>

      {homeworkTasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HomeworkContainer>
            <Typography variant="h5" gutterBottom>
              {task.title}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {task.description}
            </Typography>
            
            <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
              {task.deadline}
            </Typography>

            {task.type === 'text' ? (
              <Box>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  placeholder="Введите ваш ответ здесь..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Send />}
                  onClick={() => handleTextSubmit(task.id)}
                >
                  Отправить ответ
                </Button>
              </Box>
            ) : (
              <Box>
                <UploadArea>
                  <input
                    type="file"
                    accept="audio/*"
                    style={{ display: 'none' }}
                    id="audio-upload"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="audio-upload">
                    <CloudUpload sx={{ fontSize: 48, color: '#2196f3' }} />
                    <Typography variant="body1" color="primary">
                      Загрузить аудио файл
                    </Typography>
                  </label>
                </UploadArea>
                
                <Box sx={{ textAlign: 'center' }}>
                  <VoiceRecordButton
                    onClick={handleVoiceRecord}
                    color={isRecording ? 'secondary' : 'default'}
                  >
                    <Mic />
                  </VoiceRecordButton>
                  <Typography variant="body2" color="textSecondary">
                    {isRecording ? 'Запись...' : 'Нажмите для записи'}
                  </Typography>
                </Box>
              </Box>
            )}
          </HomeworkContainer>
        </motion.div>
      ))}
    </Box>
  );
};

export default Homework; 