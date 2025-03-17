import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Avatar, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: 'cover',
});

const HomePage = () => {
  const popularCourses = [
    {
      id: 1,
      title: 'Beginner English',
      image: 'https://source.unsplash.com/random/400x300?english',
      description: 'Start your English journey',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Business English',
      image: 'https://source.unsplash.com/random/400x300?business',
      description: 'Professional communication skills',
      level: 'Intermediate',
    },
    {
      id: 3,
      title: 'IELTS Preparation',
      image: 'https://source.unsplash.com/random/400x300?exam',
      description: 'Prepare for IELTS exam',
      level: 'Advanced',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Приветствие и профиль */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          src="https://source.unsplash.com/random/100x100?avatar"
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, User!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Continue your English learning journey
          </Typography>
        </Box>
      </Box>

      {/* Популярные курсы */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Popular Courses
      </Typography>
      <Grid container spacing={3}>
        {popularCourses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <StyledCard>
              <StyledCardMedia
                image={course.image}
                title={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.description}
                </Typography>
                <Typography variant="caption" color="primary">
                  {course.level}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage; 