import React from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
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
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#f8f9fa',
}));

const ProfilePage = () => {
  const userData = {
    name: 'John Doe',
    avatar: 'https://source.unsplash.com/random/100x100?avatar',
    level: 'Intermediate',
    coursesCompleted: 3,
    totalHours: 45,
    achievements: [
      { title: 'First Course Completed', date: '2024-02-15' },
      { title: 'Perfect Attendance', date: '2024-02-20' },
      { title: 'Advanced Level Reached', date: '2024-03-01' },
    ],
    currentCourses: [
      { id: 1, title: 'Business English', progress: 60 },
      { id: 2, title: 'IELTS Preparation', progress: 30 },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Профиль пользователя */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          src={userData.avatar}
          sx={{ width: 100, height: 100, mr: 3 }}
        />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            {userData.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Level: {userData.level}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                {userData.coursesCompleted} courses completed
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body2">
                {userData.totalHours} hours spent
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Текущие курсы */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Courses
              </Typography>
              <List>
                {userData.currentCourses.map((course, index) => (
                  <React.Fragment key={course.id}>
                    <ListItem>
                      <ListItemText
                        primary={course.title}
                        secondary={`Progress: ${course.progress}%`}
                      />
                    </ListItem>
                    {index < userData.currentCourses.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Достижения */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Achievements
              </Typography>
              <List>
                {userData.achievements.map((achievement, index) => (
                  <React.Fragment key={achievement.title}>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEventsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={achievement.title}
                        secondary={achievement.date}
                      />
                    </ListItem>
                    {index < userData.achievements.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage; 