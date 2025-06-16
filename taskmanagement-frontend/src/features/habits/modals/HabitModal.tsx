import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Stack, Typography } from '@mui/material';
import Modal from '../../../shared/components/Modal';
import { Habit } from '../../../types/Habit';
import { useCategoryContext } from '../../../contexts/CategoryContext';
import '../../../shared/styles/Shared-List.css';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (habit: Partial<Habit>) => void;
  initialData?: Partial<Habit>;
};

const AddNewHabitModal: React.FC<Props> = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState({ title: '', description: '', repeat: 'daily', category: '' });
  const { categories, createCategory } = useCategoryContext();

  const handleNewCategory = async () => {
    const name = prompt('Yeni kategori adı:');
    if (!name) return;
    const newCat = await createCategory(name, 'habit');
    if (newCat) setForm((f) => ({ ...f, category: newCat.id }));
  };

  const handleSubmit = () => {
    onSave({ ...form, repeat: form.repeat as 'daily' | 'weekly' | 'monthly' | 'custom' });
    handleClose();
  };

  const handleClose = () => {
    setForm({ title: '', description: '', repeat: 'daily', category: '' });
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        repeat: initialData.repeat || 'daily',
        category: initialData.category || ''
      });
    } else {
      setForm({ title: '', description: '', repeat: 'daily', category: '' });
    }
  }, [initialData, open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Typography className="modal-header">{initialData ? 'Edit Habit' : 'Add New Habit'}</Typography>
      <Stack spacing={2}>
        <TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth />
        <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth />
        <TextField label="Repeat" select value={form.repeat} onChange={(e) => setForm({ ...form, repeat: e.target.value })} fullWidth>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </TextField>
        <TextField label="Kategori" select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))}
          <MenuItem value="__new__" onClick={handleNewCategory}>+ Add New Category</MenuItem>
        </TextField>
        <Stack className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={handleClose}>Cancel</button>
          <button className="modal-btn save-btn" onClick={handleSubmit}>{initialData ? 'Edit' : 'Add'}</button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default AddNewHabitModal;
