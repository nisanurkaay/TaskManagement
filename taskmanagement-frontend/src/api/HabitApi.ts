import axios from 'axios';
import { Habit } from '../types/Habit';
const BASE_URL = process.env.REACT_APP_API_URL + '/habits'; 

export const getAllHabits = () => axios.get<Habit[]>(BASE_URL);

export const createHabit = (data: {
  title: string;
  description: string;
  repeat: 'daily' | 'weekly' | 'monthly' | 'custom';
  category: string;
}) => axios.post<Habit>(BASE_URL, data);

export const updateHabit = (id: string, data: {
  title: string;
  description: string;
  repeat: 'daily' | 'weekly' | 'monthly' | 'custom';
  category: string;
}) => axios.put<Habit>(`${BASE_URL}/${id}`, data);

export const markHabitComplete = (id: string, date: string) =>
  axios.patch(`${BASE_URL}/${id}/complete`, null, { params: { date } });


export const deleteHabit = (id: string) => axios.delete(`${BASE_URL}/${id}`);
