import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import Routes from './routes';

import { TaskProvider } from './contexts/TaskContext';
import { HabitProvider } from './contexts/HabitContext';
import { CategoryProvider } from './contexts/CategoryContext';

function App() {
  return (
    <BrowserRouter>
      <CategoryProvider>
        <HabitProvider>
          <TaskProvider>
            <Layout>
              <Routes />
            </Layout>
          </TaskProvider>
        </HabitProvider>
      </CategoryProvider>
    </BrowserRouter>
  );
}

export default App;
