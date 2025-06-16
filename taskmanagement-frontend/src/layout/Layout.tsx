import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./styles/Layout.css";

import { useTaskList } from "../hooks/useTaskList";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { addTask } = useTaskList();
  const sidebarWidth = isMobile ? 0 : collapsed ? 100 : 250;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="layout">
      {isMobile && !collapsed && (
        <div className="overlay" onClick={() => setCollapsed(true)} />
      )}

      <Sidebar
        collapsed={collapsed}
        onToggle={toggleSidebar}
        isMobile={isMobile}
      />

      <div
        className="main-content"
        style={{
          marginLeft: isMobile ? 0 : sidebarWidth,
          paddingTop: "60px",
          transition: "margin-left 0.3s ease",
          width: `calc(100% - ${isMobile ? 0 : sidebarWidth}px)`,
        }}
      >
        <Navbar
          isCollapsed={collapsed}
          isMobile={isMobile}
          sidebarWidth={sidebarWidth}
          onToggleSidebar={toggleSidebar}
          onAddTask={addTask}
        />

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
