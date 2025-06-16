import { useEffect, useState } from "react";
import { Habit } from "../types/Habit";
import dayjs from "dayjs";
import {
  getAllHabits,
  createHabit,
  markHabitComplete,
  deleteHabit,
  updateHabit,
} from "../api/HabitApi";



export const useHabitList = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [fading, setFading] = useState<string[]>([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await getAllHabits();
      setHabits(res.data);
    } catch (err) {
      console.error("Alışkanlıklar getirilemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id: string) => {
    if (fading.includes(id)) return;
    setFading((prev) => [...prev, id]);

    try {
      await markHabitComplete(id, today);
      setHabits((prev) =>
        prev.map((h) =>
          h.id === id
            ? {
                ...h,
                completedDates: h.completedDates.includes(today)
                  ? h.completedDates.filter((d) => d !== today)
                  : [...h.completedDates, today],
              }
            : h
        )
      );
    } finally {
      setFading((prev) => prev.filter((fid) => fid !== id));
    }
  };

  const create = async (data: {
    title: string;
    description: string;
    repeat: "daily" | "weekly" | "monthly" | "custom";
    category: string;
  }) => {
    try {
      const res = await createHabit(data);
      setHabits((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Yeni alışkanlık eklenemedi:", err);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error("Alışkanlık silinemedi:", err);
    }
  };

  const update = async (
    id: string,
    updatedData: {
      title: string;
      description: string;
      repeat: "daily" | "weekly" | "monthly" | "custom";
      category: string;
    }
  ) => {
    try {
      const res = await updateHabit(id, updatedData);
      setHabits((prev) => prev.map((h) => (h.id === id ? res.data : h)));
    } catch (err) {
      console.error("Alışkanlık güncellenemedi:", err);
    }
  };

  return {
    habits,
    fetchHabits,
    toggleComplete,
    create,
    remove,
    update,
    today,
    loading,
    fading,
  };
};
