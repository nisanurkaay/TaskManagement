import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import { IconButton, Typography, CircularProgress, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddNewTaskModal from "../modals/NewTaskModal";
import { useTaskContext } from "../../../contexts/TaskContext"; 
import { useCategoryList } from "../../../hooks/useCategoryList";
import "../../../shared/styles/Shared-List.css";

const TasksPage = () => {
  const { tasks, toggleComplete, loading, deleteTask } = useTaskContext(); 
  const { categories } = useCategoryList();

  const [filter, setFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");
  const [sort, setSort] = useState<"priority" | "recent" | "deadline">("priority");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  const tasksWithCategoryNames = useMemo(() => {
    return tasks.map((task) => {
      const category = categories.find((c) => c.id === task.category);
      return {
        ...task,
        categoryName: category?.name || "Uncategorized",
      };
    });
  }, [tasks, categories]);

  const filtered = useMemo(() => {
    let list = [...tasksWithCategoryNames];
    if (filter !== "all") list = list.filter((t) => t.status === filter);

    if (sort === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort === "recent") {
      list.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
    } else if (sort === "deadline") {
      list.sort((a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix());
    }

    return list;
  }, [tasksWithCategoryNames, filter, sort]);

  return (
    <div className="dashboard-row">
      <div className="dashboard-card">
        <div className="card-header">
          <h6>Görevler</h6>
          <div className="header-actions">
            <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
              <option value="priority">Priority</option>
              <option value="recent">Recently Added</option>
              <option value="deadline">Deadline Close</option>
            </select>
            <button className="add-btn" onClick={() => setModalOpen(true)}>
              + Add New Task
            </button>
          </div>
        </div>

        <div className="card-body">
          {loading ? (
            <CircularProgress />
          ) : filtered.length === 0 ? (
            <p className="empty-message">No content here.</p>
          ) : (
            filtered.map((task) => {
              const isCompleted = task.status === "completed";
              return (
                <Box
                  key={task.id}
                  className={`shared-list-item ${isCompleted ? "completed" : ""}`}
                  onClick={() => toggleComplete(task.id)}
                >
                  <Box className="checkbox-icon">
                    {isCompleted ? (
                      <CheckCircleIcon sx={{ color: "#22c55e" }} />
                    ) : (
                      <RadioButtonUncheckedIcon sx={{ color: "#999" }} />
                    )}
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography className={`shared-list-item-title ${isCompleted ? "completed" : ""}`}>
                      {task.title}
                    </Typography>
                    <Typography className="shared-list-item-meta">{task.description}</Typography>
                  </Box>

                  <Box className="shared-list-item-right" onClick={(e) => e.stopPropagation()}>
                    <Box className="shared-list-item-badges">
                      <span className="badge">{task.categoryName}</span>
                      <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                    </Box>
                    <Typography className="shared-list-item-meta">
                      {dayjs(task.dueDate).format("MMM D")}
                    </Typography>
                    <IconButton size="small" className="delete-btn" onClick={() => setEditData(task)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" className="delete-btn" onClick={() => deleteTask(task.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })
          )}
        </div>
      </div>

      <AddNewTaskModal
        open={Boolean(modalOpen || editData)}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        initialData={editData || undefined}
      />
    </div>
  );
};

export default TasksPage;
