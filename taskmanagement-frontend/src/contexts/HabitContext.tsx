import React, { createContext, useContext } from 'react';
import { useHabitList } from '../hooks/useHabitList';

const HabitContext = createContext<ReturnType<typeof useHabitList> | null>(null);

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
  const habitState = useHabitList();
  return <HabitContext.Provider value={habitState}>{children}</HabitContext.Provider>;
};

export const useHabitContext = () => {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('no HabitProvider');
  return ctx;
};
