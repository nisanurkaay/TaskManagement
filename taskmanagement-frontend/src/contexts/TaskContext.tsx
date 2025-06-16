import React, { createContext, useContext } from 'react';
import { useTaskList } from '../hooks/useTaskList';

const TaskContext = createContext<ReturnType<typeof useTaskList> | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const taskState = useTaskList();
  return <TaskContext.Provider value={taskState}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('no TaskProvider');
  return ctx;
};
