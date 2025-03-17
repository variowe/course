import React from 'react';
import { Box, Typography, Paper, Avatar, Grid, LinearProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { EmojiEvents, Star, Timeline, School } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProfileContainer = styled(Paper)`
  padding: 24px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border: 4px solid #2196f3;
`;

const AchievementCard = styled(motion(Paper))`
  padding: 16px;
  text-align: center;
  background: linear-gradient(135deg, #2196f3 0%, #64b5f6 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const Profile = () => {
  const userStats = {
    name: 'Анна Петрова',
    level: 5,
    experience: 750,
    nextLevel: 1000,
    completedLessons: 12,
    totalLessons: 20,
    streak: 7,
    achievements: [
      { id: 1, title: 'Первая неделя', description: '7 дней подряд', icon: <Star /> },
      { id: 2, title: 'Успешный ученик', description: '10 уроков завершено', icon: <School /> },
      { id: 3, title: 'Отличник', description: 'Все задания выполнены', icon: <EmojiEvents /> }
    ]
  };

  const progress = (userStats.experience / userStats.nextLevel) * 100;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Профиль
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileContainer>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <StyledAvatar>
                {userStats.name.charAt(0)}
              </StyledAvatar>
              <Typography variant="h5" gutterBottom>
                {userStats.name}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Уровень {userStats.level}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Опыт: {userStats.experience} / {userStats.nextLevel}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progress}
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #2196f3 0%, #64b5f6 100%)'
                  }
                }}
              />
            </Box>

            <List>
              <ListItem>
                <ListItemIcon>
                  <Timeline color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Прогресс курса"
                  secondary={`${userStats.completedLessons} из ${userStats.totalLessons} уроков`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Star color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Серия занятий"
                  secondary={`${userStats.streak} дней подряд`}
                />
              </ListItem>
            </List>
          </ProfileContainer>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Достижения
          </Typography>
          
          <Grid container spacing={2}>
            {userStats.achievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                <AchievementCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ mb: 1 }}>
                    {React.cloneElement(achievement.icon, { sx: { fontSize: 40 } })}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {achievement.title}
                  </Typography>
                  <Typography variant="body2">
                    {achievement.description}
                  </Typography>
                </AchievementCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 