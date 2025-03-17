import React, { useState, useRef } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { CloudUpload, Mic, Send } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const UploadContainer = styled(Box)`
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

const RecordButton = styled(motion(Button))`
  background: #f50057;
  color: white;
  margin: 8px;
  
  &:hover {
    background: #c51162;
  }
`;

const ProgressContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

interface HomeworkSubmissionProps {
  type: 'text' | 'voice';
  onSubmit: (data: string | File) => void;
  isSubmitting?: boolean;
}

const HomeworkSubmission: React.FC<HomeworkSubmissionProps> = ({
  type,
  onSubmit,
  isSubmitting = false
}) => {
  const [textAnswer, setTextAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = () => {
    if (textAnswer.trim()) {
      onSubmit(textAnswer);
      setTextAnswer('');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onSubmit(file);
    }
  };

  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    // Здесь будет логика записи голоса
  };

  return (
    <Box>
      {type === 'text' ? (
        <Box>
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Введите ваш ответ здесь..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              marginBottom: '16px',
              fontFamily: 'inherit',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Send />}
            onClick={handleTextSubmit}
            disabled={!textAnswer.trim() || isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить ответ'}
          </Button>
        </Box>
      ) : (
        <Box>
          <input
            type="file"
            accept="audio/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          
          <UploadContainer onClick={() => fileInputRef.current?.click()}>
            <CloudUpload sx={{ fontSize: 48, color: '#2196f3' }} />
            <Typography variant="body1" color="primary">
              {selectedFile ? selectedFile.name : 'Загрузить аудио файл'}
            </Typography>
          </UploadContainer>

          <Box sx={{ textAlign: 'center' }}>
            <RecordButton
              onClick={handleRecordToggle}
              variant="contained"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mic sx={{ mr: 1 }} />
              {isRecording ? 'Остановить запись' : 'Начать запись'}
            </RecordButton>
          </Box>

          {isSubmitting && (
            <ProgressContainer>
              <CircularProgress size={24} sx={{ mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                Загрузка...
              </Typography>
            </ProgressContainer>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HomeworkSubmission; 