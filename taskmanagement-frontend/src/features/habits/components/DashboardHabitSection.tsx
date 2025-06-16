import React, { useMemo, useState } from 'react';
import { useHabitContext } from '../../../contexts/HabitContext';
import {
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import { Repeat } from 'lucide-react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DashboardCard from '../../../shared/components/DashboardCard';
import '../../../shared/styles/Dashboard.css'; 

const DashboardHabitSection = () => {
  const { habits, toggleComplete, fading, today } = useHabitContext();
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly' | 'monthly'>('daily');

  const filtered = useMemo(() => {
    return habits
      .filter((h) => filter === 'all' || h.repeat === filter)
      .sort((a, b) => {
        const aDone = a.completedDates.includes(today);
        const bDone = b.completedDates.includes(today);
        return Number(aDone) - Number(bDone);
      });
  }, [habits, filter, today]);

  const formatRightText = (repeat: string): string => {
    switch (repeat) {
      case 'daily': return 'Today';
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      default: return '';
    }
  };

  const habitItems = filtered.map((h) => {
    const isCompleted = h.completedDates.includes(today);
    return (
      <Box
        key={h.id}
        className={`shared-list-item ${isCompleted ? 'completed' : ''} ${fading.includes(h.id) ? 'fade-out' : ''}`}
        onClick={() => toggleComplete(h.id)}
      >
        <Box className="checkbox-icon">
          {isCompleted ? (
            <CheckCircleIcon sx={{ color: '#22c55e' }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ color: '#999' }} />
          )}
        </Box>
        <Typography className={`shared-list-item-title ${isCompleted ? 'completed' : ''}`} noWrap>
          {h.title}
        </Typography>
        <Typography className="shared-list-item-meta">
          {formatRightText(h.repeat)}
        </Typography>
      </Box>
    );
  });

  return (
    <DashboardCard
      key={filter}
      title="Habits"
      icon={<Repeat size={18} />}
      action={
        <Select
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      }
      items={habitItems}
      maxVisible={5}
      pagination
    />
  );
};

export default DashboardHabitSection;
