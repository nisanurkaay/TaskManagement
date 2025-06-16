import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

import { useCategoryContext } from '../../../contexts/CategoryContext';
import { useTaskContext } from '../../../contexts/TaskContext';
import { useHabitContext } from '../../../contexts/HabitContext';

import '../../../shared/styles/Shared-List.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const CategoriesPage = () => {
  const { categories, createCategory, deleteCategory } = useCategoryContext();
  const { tasks, toggleComplete: toggleTaskComplete } = useTaskContext();
  const { habits, toggleComplete: toggleHabitComplete, today } = useHabitContext();

  const [filter, setFilter] = useState<'all' | 'task' | 'habit' | 'both'>('all');
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [openMap, setOpenMap] = useState<{ [id: string]: boolean }>({});

  const { search } = useLocation();
  const focusId = new URLSearchParams(search).get('focus');

  useEffect(() => {
    if (focusId) {
      const el = document.getElementById(`cat-${focusId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setOpenMap((prev) => ({ ...prev, [focusId]: true }));
    }
  }, [categories, focusId]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createCategory(newName);
    setNewName('');
    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    await deleteCategory(id);
  };

  const toggleOpen = (id: string) => {
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = categories.filter((c) =>
    filter === 'all' ? true : c.type === filter
  );

  return (
    <div className="dashboard-row">
      <div className="dashboard-card auto-height">
        <div className="card-header">
          <h6>Categories</h6>
          <div className="header-actions">
            <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
              <option value="all">All</option>
              <option value="task">Tasks Only</option>
              <option value="habit">Habits Only</option>
            </select>
            <button className="btn" onClick={() => setCreating(true)}>+ Add New Category</button>
          </div>
        </div>

        <div className="card-body">
          {creating && (
            <div className="create-form">
              <input
                type="text"
                placeholder="Category Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <button className="btn" onClick={handleCreate}>Add</button>
              <button className="btn cancel" onClick={() => setCreating(false)}>Cancel</button>
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="empty-message">No content here</p>
          ) : (
            filtered.map((cat) => {
              const isOpen = openMap[cat.id] || false;
              const catTasks = tasks.filter((t) => t.category === cat.id);
              const catHabits = habits.filter((h) => h.category === cat.id);

              return (
                <div key={cat.id} id={`cat-${cat.id}`} className="category-box">
                  <div className="shared-list-item">
                    <span className="shared-list-item-title">{cat.name}</span>
                    <button className="toggle-btn" onClick={() => toggleOpen(cat.id)}>
                      {isOpen ? '−' : '+'}
                    </button>
                    <div className="shared-list-item-right">
                      <span className="shared-list-item-meta">{catTasks.length} tasks</span>
                      <span className="shared-list-item-meta">{catHabits.length} habits</span>
                      <button className="delete-btn" onClick={() => handleDelete(cat.id)}>🗑️</button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="category-content">
                      {filter !== 'habit' &&
                        catTasks.map((task) => {
                          const isDone = task.status === 'completed';
                          return (
                            <div
                              key={task.id}
                              className={`shared-list-item ${isDone ? 'completed' : ''}`}
                              onClick={() => toggleTaskComplete(task.id)}
                            >
                              <div className="checkbox-icon">
                                {isDone ? (
                                  <CheckCircleIcon sx={{ color: '#22c55e' }} />
                                ) : (
                                  <RadioButtonUncheckedIcon sx={{ color: '#999' }} />
                                )}
                              </div>
                              <div style={{ flexGrow: 1 }}>
                                <span className={`shared-list-item-title ${isDone ? 'completed' : ''}`}>
                                  {task.title}
                                </span>
                              </div>
                              <div className="shared-list-item-right">
                                <div className="shared-list-item-badges">
                                  <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                                </div>
                                <span className="shared-list-item-meta">
                                  {dayjs(task.dueDate).format('MMM D')}
                                </span>
                              </div>
                            </div>
                          );
                        })}

                      {filter !== 'task' &&
                        catHabits.map((habit) => {
                          const isDone = habit.completedDates.includes(today);
                          return (
                            <div
                              key={habit.id}
                              className={`shared-list-item ${isDone ? 'completed' : ''}`}
                              onClick={() => toggleHabitComplete(habit.id)}
                            >
                              <div className="checkbox-icon">
                                {isDone ? (
                                  <CheckCircleIcon sx={{ color: '#22c55e' }} />
                                ) : (
                                  <RadioButtonUncheckedIcon sx={{ color: '#999' }} />
                                )}
                              </div>
                              <div style={{ flexGrow: 1 }}>
                                <span className={`shared-list-item-title ${isDone ? 'completed' : ''}`}>
                                  {habit.title}
                                </span>
                              </div>
                              <div className="shared-list-item-right">
                                <span className="shared-list-item-meta">🔁 {habit.repeat}</span>
                              </div>
                            </div>
                          );
                        })}

                      {catTasks.length === 0 && catHabits.length === 0 && (
                        <p className="empty-message">No content here.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
