export type Habit = {
  id: string;
  title: string;
  description: string;
  repeat: "daily" | "weekly" | "monthly" | "custom";
  createdAt: string;
  completedDates: string[];
  category: string;
};