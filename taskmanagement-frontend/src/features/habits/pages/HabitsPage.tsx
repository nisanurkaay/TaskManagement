import React, { useState, useMemo } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddNewHabitModal from "../modals/HabitModal";
import { Habit } from "../../../types/Habit";
import { useHabitContext } from "../../../contexts/HabitContext";
import "../../../shared/styles/Shared-List.css";

const HabitsPage = () => {
  const {
    habits,
    toggleComplete,
    create,
    remove,
    update,
    fading,
    today,
    loading,
  } = useHabitContext();

  const [filter, setFilter] = useState<"all" | "daily" | "weekly" | "monthly">(
    "daily"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Partial<Habit> | null>(null);

  const filtered = useMemo(() => {
    return habits
      .filter((h) => filter === "all" || h.repeat === filter)
      .sort((a, b) => {
        const aDone = a.completedDates.includes(today);
        const bDone = b.completedDates.includes(today);
        return Number(aDone) - Number(bDone);
      });
  }, [habits, filter, today]);

  return (
    <div className="dashboard-row">
      <div className="dashboard-card">
        <div className="card-header">
          <h6>Habits</h6>
          <div className="header-actions">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <button onClick={() => setModalOpen(true)}> + Add New Habit</button>
          </div>
        </div>

        <div className="card-body">
          {loading ? (
            <CircularProgress />
          ) : filtered.length === 0 ? (
            <p className="empty-message">No content here.</p>
          ) : (
            filtered.map((habit) => {
              const isCompleted = habit.completedDates.includes(today);
              return (
                <Box
                  key={habit.id}
                  className={`shared-list-item ${
                    isCompleted ? "completed" : ""
                  } ${fading.includes(habit.id) ? "fade-out" : ""}`}
                  onClick={() => toggleComplete(habit.id)}
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
                      {habit.title}
                    </Typography>
                    <Typography className="shared-list-item-meta">
                      {habit.description}
                    </Typography>
                    <Typography
                      className="shared-list-item-meta"
                      sx={{ fontStyle: "italic" }}
                    >
                      Repeat: {habit.repeat}
                    </Typography>
                  </Box>

                  <Box
                    className="shared-list-item-right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconButton
                      size="small"
                      className="delete-btn"
                      onClick={() => setEditData(habit)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      className="delete-btn"
                      onClick={() => remove(habit.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })
          )}
        </div>
      </div>

      <AddNewHabitModal
        open={Boolean(modalOpen || editData)}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSave={(habit: Partial<Habit>) => {
          if (editData) {
            update(editData.id!, habit as any);
          } else {
            create(habit as any);
          }
        }}
        initialData={editData || undefined}
      />
    </div>
  );
};

export default HabitsPage;
