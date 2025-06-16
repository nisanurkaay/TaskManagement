import React, { useState } from 'react';
import {
  CircularProgress,
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper
} from '@mui/material';
import { useSummary } from '../../hooks/useSummary';
import { useCategoryList } from '../../hooks/useCategoryList';

type Props = {
  type?: 'task' | 'habit';
};

const SummaryCard: React.FC<Props> = ({ type = 'task' }) => {
  const [scope, setScope] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { categories } = useCategoryList(type);
  const { data, loading } = useSummary(type, scope, selectedCategory);

  if (loading || !data)
    return (
      <Paper
        sx={{
          height: 260,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>Loading...</Typography>
      </Paper>
    );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: 260,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
  <Box display="flex" gap={1} mt={1} flexDirection={{ xs: 'column', sm: 'row' }}>
  <FormControl size="small" fullWidth>
    <InputLabel>Scope</InputLabel>
    <Select
      value={scope}
      label="Scope"
      onChange={(e) => setScope(e.target.value as any)}
    >
      <MenuItem value="daily">Today</MenuItem>
      <MenuItem value="weekly">This Week</MenuItem>
      <MenuItem value="monthly">This Month</MenuItem>
    </Select>
  </FormControl>

  <FormControl size="small" fullWidth>
    <InputLabel>Category</InputLabel>
    <Select
      value={selectedCategory || ''}
      label="Category"
      onChange={(e) =>
        setSelectedCategory(e.target.value === '' ? undefined : e.target.value)
      }
    >
      <MenuItem value="">All</MenuItem>
      {categories.map((cat) => (
        <MenuItem key={cat.id} value={cat.id}>
          {cat.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>


      <Box mt={2} textAlign="center">
        <Box position="relative" display="inline-flex">
          <CircularProgress
            variant="determinate"
            value={data.completionRate}
            size={80}
            thickness={4}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" fontWeight={600} color="text.secondary">
              {Math.round(data.completionRate)}%
            </Typography>
          </Box>
        </Box>
        <Stack spacing={0.3} mt={1}>
          <Typography variant="caption" color="text.secondary">
            Total: {data.total}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Completed: {data.completed}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Pending: {data.pending}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default SummaryCard;
