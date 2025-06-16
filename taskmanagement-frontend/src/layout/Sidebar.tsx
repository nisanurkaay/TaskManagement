import React from "react";
import "./styles/Layout.css";
import { Home, List, Repeat, Folder } from "lucide-react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
const menuItems = [
  { icon: <Home />, label: "Dashboard", path: "/" },
  { icon: <List />, label: "Tasks", path: "/tasks" },
  { icon: <Repeat />, label: "Habits", path: "/habits" },
  { icon: <Folder />, label: "Categories", path: "/categories" },
];

type Props = {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
};

const Sidebar: React.FC<Props> = ({ collapsed, onToggle, isMobile }) => {
  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""} ${
        isMobile ? "mobile" : ""
      }`}
    >
      <div className="sidebar-header" onClick={onToggle}>
        <div className="logo">
          {collapsed ? (
            <ChevronRight fontSize="medium" />
          ) : (
            <ChevronLeft fontSize="medium" />
          )}
        </div>
      </div>

      <nav>
        {menuItems.map((item, i) => (
          <NavLink
            to={item.path}
            key={i}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <span className="icon">{item.icon}</span>
            {!collapsed && <span className="label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
