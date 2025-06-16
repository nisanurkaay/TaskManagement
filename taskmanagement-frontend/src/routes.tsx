import React from 'react';
import { Routes, Route } from 'react-router-dom';

import OverviewPage from './features/overview/DashboardPage';
import HabitsPage from './features/habits/pages/HabitsPage';
import TasksPage from './features/tasks/pages/TasksPage';
import CategoriesPage from './features/categories/pages/CategoriesPage';
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<OverviewPage />} />
    <Route path="/habits" element={<HabitsPage />} />
    <Route path="/tasks" element={<TasksPage />} />
<Route path="/categories" element={<CategoriesPage />} />

  </Routes>
);

export default AppRoutes;
