import axios from 'axios';

export type SummaryResponse = {
  type: 'task' | 'habit';
  scope: 'daily' | 'weekly' | 'monthly';
  category?: string;
  total: number;
  completed: number;
  pending: number;
  completionRate: number; 
};

const BASE_URL = process.env.REACT_APP_API_URL + '/summary'; 

export const getSummary = (
  type: 'task' | 'habit',
  scope: 'daily' | 'weekly' | 'monthly',
  category?: string
) =>
  axios.get<SummaryResponse>(BASE_URL, {
    params: { type, scope, category }
  }).then(res => res.data);