import React, { createContext, useContext } from 'react';
import { useCategoryList } from '../hooks/useCategoryList';

const CategoryContext = createContext<ReturnType<typeof useCategoryList> | null>(null);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const categoryState = useCategoryList();
  return (
    <CategoryContext.Provider value={categoryState}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error('no CategoryProvider');
  return ctx;
};
