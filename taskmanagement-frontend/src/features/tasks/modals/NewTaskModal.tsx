import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Stack, Typography } from "@mui/material";
import Modal from "../../../shared/components/Modal";
import dayjs from "dayjs";
import { useCategoryList } from "../../../hooks/useCategoryList";
import { useTaskContext } from "../../../contexts/TaskContext";
import "../../../shared/styles/Shared-List.css";
import { Task } from "../../../types/Task";

type Props = {
  open: boolean;
  onClose: () => void;
  initialData?: Partial<Task>;
};

const AddNewTask: React.FC<Props> = ({ open, onClose, initialData }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [category, setCategory] = useState("");

  const { categories, createCategory } = useCategoryList("task");
  const { addTask, updateTask, fetchTasks } = useTaskContext();

  const isEditMode = !!initialData?.id;

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setPriority("medium");
    setDueDate(dayjs().format("YYYY-MM-DD"));
    setCategory("");
  };

  const handleSave = async () => {
    const taskData: Partial<Task> = {
      ...initialData,
      title,
      description: desc,
      priority,
      status: initialData?.status || "pending",
      createdAt: initialData?.createdAt || new Date().toISOString(),
      dueDate: dayjs(dueDate).hour(0).minute(0).second(0).toISOString(),
      category,
    };

    if (isEditMode && initialData?.id) {
      await updateTask(initialData.id, taskData);
    } else {
      await addTask(taskData);
      await fetchTasks();
    }

    resetForm();
    onClose();
  };

  const handleNewCategory = async () => {
    const name = prompt("Yeni kategori adı:");
    if (!name) return;
    const newCat = await createCategory(name, "task");
    if (newCat) setCategory(newCat.id);
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDesc(initialData.description || "");
      setPriority(initialData.priority || "medium");
      setDueDate(
        initialData.dueDate?.slice(0, 10) || dayjs().format("YYYY-MM-DD")
      );
      setCategory(initialData.category || "");
    } else {
      resetForm();
    }
  }, [initialData, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Typography className="modal-header">
        {isEditMode ? "Edit Task" : "+ Add New Task"}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Açıklama"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          fullWidth
        />
        <TextField
          label="Öncelik"
          select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          fullWidth
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <TextField
          label="Bitiş Tarihi"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Kategori"
          select
          value={category}
          onChange={(e) => {
            if (e.target.value === "__new__") {
              handleNewCategory();
            } else {
              setCategory(e.target.value);
            }
          }}
          fullWidth
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
          <MenuItem value="__new__">+ Add New Category</MenuItem>
        </TextField>

        <Stack className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn save-btn" onClick={handleSave}>
            {isEditMode ? "Edit" : "Add"}
          </button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default AddNewTask;
