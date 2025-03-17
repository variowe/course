import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#f8f9fa',
}));

const CoursePage = () => {
  const { courseId } = useParams();

  const courseData = {
    id: courseId,
    title: 'Beginner English',
    description: 'Start your English learning journey with this comprehensive course for beginners.',
    instructor: 'John Doe',
    level: 'Beginner',
    duration: '8 weeks',
    lessons: [
      { id: 1, title: 'Introduction to English', type: 'video', duration: '15 min' },
      { id: 2, title: 'Basic Grammar', type: 'video', duration: '20 min' },
      { id: 3, title: 'Vocabulary Practice', type: 'homework', duration: '30 min' },
      { id: 4, title: 'Speaking Practice', type: 'video', duration: '25 min' },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Заголовок курса */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {courseData.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {courseData.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Instructor: {courseData.instructor}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Level: {courseData.level}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {courseData.duration}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Список уроков */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Content
              </Typography>
              <List>
                {courseData.lessons.map((lesson, index) => (
                  <React.Fragment key={lesson.id}>
                    <ListItem button>
                      <ListItemIcon>
                        {lesson.type === 'video' ? (
                          <PlayCircleOutlineIcon color="primary" />
                        ) : (
                          <AssignmentIcon color="secondary" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={lesson.duration}
                      />
                    </ListItem>
                    {index < courseData.lessons.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Информация о курсе */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Information
              </Typography>
              <Typography variant="body2" paragraph>
                This course is designed for beginners who want to start learning English.
                You will learn basic grammar, vocabulary, and speaking skills.
              </Typography>
              <Typography variant="body2" paragraph>
                Each lesson includes:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="• Video lectures" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Practice exercises" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="• Homework assignments" />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CoursePage; 