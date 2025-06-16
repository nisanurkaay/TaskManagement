import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../../shared/components/DashboardCard';
import { Box, Typography, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../../../shared/styles/Dashboard.css';
import { useCategoryContext } from '../../../contexts/CategoryContext';
import { useTaskContext } from '../../../contexts/TaskContext';
import { useHabitContext } from '../../../contexts/HabitContext';
import dayjs from 'dayjs';

const DashboardCategoriesCard = () => {
  const navigate = useNavigate();
  const { categories } = useCategoryContext();
  const { tasks } = useTaskContext();
  const { habits, today } = useHabitContext();

  const data = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.category === cat.id);
    const catHabits = habits.filter((h) => h.category === cat.id);

    const taskCompleted = catTasks.filter((t) => t.status === 'completed').length;
    const habitCompleted = catHabits.filter((h) => h.completedDates.includes(today)).length;
    const total = catTasks.length + catHabits.length;
    const completed = taskCompleted + habitCompleted;

    return {
      id: cat.id,
      name: cat.name,
      completed,
      total,
    };
  });

  const items = data.map((cat) => (
    <Box
      key={cat.id}
      className="shared-list-item"
      onClick={() => navigate(`/categories?focus=${cat.id}`)}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography className="shared-list-item-title" noWrap>
          {cat.name}
        </Typography>
        <Typography className="shared-list-item-meta">
          {cat.completed} / {cat.total} completed
        </Typography>
      </Box>
      <Box className="shared-list-item-right">
        <IconButton
          size="small"
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/categories?focus=${cat.id}`);
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  ));

  return (
    <DashboardCard
      title="Categories"
      items={items}
      maxVisible={5}
      pagination
    />
  );
};

export default DashboardCategoriesCard;
