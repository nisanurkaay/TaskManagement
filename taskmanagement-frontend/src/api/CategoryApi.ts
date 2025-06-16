import axios from 'axios';

export type Category = {
  id: string;
  name: string;
  type: 'task' | 'habit' | 'both';
};

export type CategoryRequest = {
  name: string;
  type: 'task' | 'habit' | 'both';
};

const BASE_URL = `${process.env.REACT_APP_API_URL}/categories`;

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await axios.get<Category[]>(BASE_URL);
  return res.data;
};

export const createCategory = async (data: CategoryRequest): Promise<Category> => {
  const res = await axios.post<Category>(BASE_URL, data);
  return res.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
