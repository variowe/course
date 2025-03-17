import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#f8f9fa',
}));

const HomeworkPage = () => {
  const homeworkData = {
    currentCourse: {
      id: 1,
      title: 'Business English',
      progress: 60,
    },
    assignments: [
      {
        id: 1,
        title: 'Vocabulary Practice',
        description: 'Complete the exercises on business vocabulary',
        dueDate: '2024-03-15',
        status: 'completed',
        timeEstimate: '30 min',
      },
      {
        id: 2,
        title: 'Writing Task',
        description: 'Write a business email using the learned phrases',
        dueDate: '2024-03-17',
        status: 'pending',
        timeEstimate: '45 min',
      },
      {
        id: 3,
        title: 'Speaking Practice',
        description: 'Record a video presentation about your company',
        dueDate: '2024-03-20',
        status: 'pending',
        timeEstimate: '20 min',
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      {/* Заголовок и информация о курсе */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Homework
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Course: {homeworkData.currentCourse.title}
          </Typography>
          <Chip
            label={`Progress: ${homeworkData.currentCourse.progress}%`}
            color="primary"
            size="small"
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Список домашних заданий */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Assignments
              </Typography>
              <List>
                {homeworkData.assignments.map((assignment, index) => (
                  <React.Fragment key={assignment.id}>
                    <ListItem>
                      <ListItemIcon>
                        {assignment.status === 'completed' ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <RadioButtonUncheckedIcon color="action" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={assignment.title}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {assignment.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                              <Chip
                                icon={<AccessTimeIcon />}
                                label={assignment.timeEstimate}
                                size="small"
                              />
                              <Chip
                                label={`Due: ${assignment.dueDate}`}
                                size="small"
                                color={assignment.status === 'pending' ? 'warning' : 'default'}
                              />
                            </Box>
                          </Box>
                        }
                      />
                      {assignment.status === 'pending' && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Start
                        </Button>
                      )}
                    </ListItem>
                    {index < homeworkData.assignments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Статистика */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Completed Assignments"
                    secondary="1 of 3"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Average Time Spent"
                    secondary="30 minutes"
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Next Due Date"
                    secondary="March 17, 2024"
                  />
                </ListItem>
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeworkPage; 