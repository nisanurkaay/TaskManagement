import React, { useMemo, useState } from "react";
import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { ClipboardList } from "lucide-react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import DashboardCard from "../../../shared/components/DashboardCard";
import { useTaskContext } from "../../../contexts/TaskContext";
import { useCategoryList } from "../../../hooks/useCategoryList";
import "../../../shared/styles/Dashboard.css";

type SortType = "priority" | "recent" | "deadline";

const TaskListSection = ({
  maxVisible = 3,
  fixedHeight = true,
  pagination = true,
}) => {
  const { tasks, toggleComplete, deleteTask } = useTaskContext(); 
  const { categories } = useCategoryList();
  const [sortBy, setSortBy] = useState<SortType>("priority");

  const tasksWithCategoryNames = useMemo(() => {
    return tasks.map((task) => {
      const category = categories.find((c) => c.id === task.category);
      return {
        ...task,
        categoryName: category?.name || "Uncategorized",
      };
    });
  }, [tasks, categories]);

  const sorted = useMemo(() => {
    return [...tasksWithCategoryNames].sort((a, b) => {
      if (sortBy === "priority") {
        const order = { high: 1, medium: 2, low: 3 };
        return order[a.priority] - order[b.priority];
      }
      if (sortBy === "recent") {
        return dayjs(b.createdAt).diff(dayjs(a.createdAt));
      }
      if (sortBy === "deadline") {
        return dayjs(a.dueDate).diff(dayjs(b.dueDate));
      }
      return 0;
    });
  }, [tasksWithCategoryNames, sortBy]);

  const taskItems = sorted.map((t) => {
    const isCompleted = t.status === "completed";
    return (
      <Box
        key={t.id}
        className={`shared-list-item ${isCompleted ? "completed" : ""}`}
        onClick={() => toggleComplete(t.id)}
      >
        <Box className="checkbox-icon">
          {isCompleted ? (
            <CheckCircleIcon sx={{ color: "#22c55e" }} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ color: "#999" }} />
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            className={`shared-list-item-title ${
              isCompleted ? "completed" : ""
            }`}
            noWrap
          >
            {t.title}
          </Typography>
        </Box>

        <Box className="shared-list-item-right">
          <Box className="shared-list-item-badges">
            <span className="badge">{t.categoryName}</span>
            <span className={`badge priority-${t.priority}`}>{t.priority}</span>
          </Box>
          <Typography className="shared-list-item-meta">
            {dayjs(t.dueDate).format("MMM D")}
          </Typography>
          <IconButton
            className="delete-btn"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(t.id);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    );
  });

  return (
    <DashboardCard
      title="Tasks"
      icon={<ClipboardList size={18} />}
      action={
        <Select
          size="small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortType)}
        >
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="recent">Recently Added</MenuItem>
          <MenuItem value="deadline">Deadline Close</MenuItem>
        </Select>
      }
      items={taskItems}
      maxVisible={maxVisible}
      fixedHeight={fixedHeight}
      pagination={pagination}
    />
  );
};

export default TaskListSection;
