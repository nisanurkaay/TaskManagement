import axios from 'axios';
import { Task } from '../types/Task';

const BASE_URL = process.env.REACT_APP_API_URL + '/tasks';

const normalizeTask = (t: any): Task => ({
  ...t,
  id: t.id || t._id,
});

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(BASE_URL);
  return res.data.map(normalizeTask);
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const res = await axios.post(BASE_URL, task);
  return normalizeTask(res.data);
};

export const updateTask = async (id: string, updatedTask: Partial<Task>): Promise<Task> => {
  const res = await axios.put(`${BASE_URL}/${id}`, updatedTask);
  return res.data;
};


export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};


export const updateTaskStatus = async (id: string, status: string): Promise<Task> => {
  const res = await axios.patch(`${BASE_URL}/${id}/status`, null, {
    params: { status }
  });
  return res.data;
};

type FilterOptions = {
  status?: string;
  priority?: string;
  range?: string;        
  sortBy?: string;    
  order?: 'asc' | 'desc';
};

export const filterTasks = async (filters: FilterOptions): Promise<Task[]> => {
  const res = await axios.get(`${BASE_URL}/filter`, {
    params: filters
  });
  return res.data;
};
