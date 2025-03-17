import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  TextField,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  objectFit: 'cover',
});

const CoursesPage = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: 'Beginner English',
      image: 'https://source.unsplash.com/random/400x300?english',
      description: 'Start your English journey with basic grammar and vocabulary',
      level: 'Beginner',
      duration: '8 weeks',
      price: 'Free',
    },
    {
      id: 2,
      title: 'Business English',
      image: 'https://source.unsplash.com/random/400x300?business',
      description: 'Professional communication skills for the workplace',
      level: 'Intermediate',
      duration: '10 weeks',
      price: '$49.99',
    },
    {
      id: 3,
      title: 'IELTS Preparation',
      image: 'https://source.unsplash.com/random/400x300?exam',
      description: 'Comprehensive preparation for IELTS exam',
      level: 'Advanced',
      duration: '12 weeks',
      price: '$79.99',
    },
    {
      id: 4,
      title: 'Conversational English',
      image: 'https://source.unsplash.com/random/400x300?conversation',
      description: 'Improve your speaking and listening skills',
      level: 'Intermediate',
      duration: '8 weeks',
      price: '$39.99',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Заголовок и поиск */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Courses
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Список курсов */}
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <StyledCard onClick={() => navigate(`/courses/${course.id}`)}>
              <StyledCardMedia
                image={course.image}
                title={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip label={course.level} size="small" color="primary" />
                  <Chip label={course.duration} size="small" />
                </Box>
                <Typography variant="h6" color="primary">
                  {course.price}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CoursesPage; 