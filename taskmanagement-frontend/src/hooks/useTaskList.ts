import { useEffect, useState } from 'react';
import { getTasks, updateTaskStatus, createTask, deleteTask as apiDeleteTask} from '../api/TaskApi';
import { updateTask as apiUpdateTask } from '../api/TaskApi';
import { Task } from '../types/Task';

export const useTaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Görevler alınamadı:', err);
    } finally {
      setLoading(false);
    }
  };

const toggleComplete = async (id: string) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const newStatus = task.status === 'completed' ? 'pending' : 'completed';

  try {
    await updateTaskStatus(id, newStatus); 
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  } catch (err) {
    console.error('Görev durumu güncellenemedi:', err);
  }
};


const updateTask = async (id: string, updated: Partial<Task>) => {
  try {
    const updatedTask = await apiUpdateTask(id, updated);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updatedTask : t))
    );
  } catch (err) {
    console.error('Görev güncellenemedi:', err);
  }
};


const addTask = async (task: Partial<Task>) => {
  try {
    await createTask(task);
    await fetchTasks(); 
  } catch (err) {
    console.error('Görev eklenemedi:', err);
  }
};


const deleteTask = async (id: string) => {
  try {
    await apiDeleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  } catch (err) {
    console.error('Görev silinemedi:', err);
  }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, toggleComplete, loading, addTask, deleteTask, updateTask, fetchTasks  };

};
