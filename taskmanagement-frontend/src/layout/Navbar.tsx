import React, { useState } from 'react';
import './styles/Layout.css';
import NewTaskModal from '../features/tasks/modals/NewTaskModal';
import { Task } from '../types/Task';

type Props = {
  isCollapsed: boolean;
  sidebarWidth: number;
  onToggleSidebar: () => void;
  isMobile: boolean;
  onAddTask: (task: Partial<Task>) => void; 
};

const Navbar: React.FC<Props> = ({ isCollapsed, sidebarWidth, onToggleSidebar, isMobile, onAddTask }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSave = (task: Partial<Task>) => {
    onAddTask(task);       
    setModalOpen(false);
  };

  return (
    <div
      className="navbar"
      style={{
        marginLeft: isMobile ? 0 : sidebarWidth,
  
        transition: 'all 0.3s ease',
      }}
    >
      <button className="toggle-button" onClick={onToggleSidebar}>
        {isCollapsed ? '☰' : '✕'}
      </button>

      <button className="new-button" onClick={() => setModalOpen(true)}>+ New Task</button>

      
    <NewTaskModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
/>

    </div>
  );
};

export default Navbar;
