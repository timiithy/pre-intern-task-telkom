import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  iconFitur,
  iconFiturSelected,
  iconLogout,
  iconLogoutSelected,
  iconLogo,
} from "../Icons";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={iconLogo} alt="SiPustaka" className="logo-icon" />
        </div>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        {/* Dashboard */}
        <div
          className={`nav-item ${isActive("/dashboard") ? "active" : ""}`}
          onMouseEnter={() => !isActive("/dashboard") && setHoveredItem("dashboard")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/dashboard")}
        >
          <img
            src={
              isActive("/dashboard") || hoveredItem === "dashboard"
                ? iconFiturSelected
                : iconFitur
            }
            className="nav-icon"
            alt="Dashboard"
          />
          <span className="nav-label">Dashboard</span>
        </div>

        {/* Members */}
        <div
          className={`nav-item ${isActive("/members") ? "active" : ""}`}
          onMouseEnter={() => !isActive("/members") && setHoveredItem("members")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/members")}
        >
          <img
            src={
              isActive("/members") || hoveredItem === "members"
                ? iconFiturSelected
                : iconFitur
            }
            className="nav-icon"
            alt="members"
          />
          <span className="nav-label">Members</span>
        </div>

        {/* Daftar Buku */}
        <div
          className={`nav-item ${isActive("/addBook") ? "active" : ""}`}
          onMouseEnter={() => !isActive("/addBook") && setHoveredItem("addBook")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/addBook")}
        >
          <img
            src={
              isActive("/addBook") || hoveredItem === "addBook"
                ? iconFiturSelected
                : iconFitur
            }
            className="nav-icon"
            alt="addbook"
          />
          <span className="nav-label">Daftar Buku</span>
        </div>

        {/* Peminjaman */}
        <div
          className={`nav-item ${isActive("/borrowBook") ? "active" : ""}`}
          onMouseEnter={() =>
            !isActive("/borrowBook") && setHoveredItem("borrowBook")
          }
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/borrowBook")}
        >
          <img
            src={
              isActive("/borrowBook") || hoveredItem === "borrowBook"
                ? iconFiturSelected
                : iconFitur
            }
            className="nav-icon"
            alt="borrowbook"
          />
          <span className="nav-label">Peminjaman Buku</span>
        </div>
      </nav>

      {/* FOOTER (SAMA PERSIS STRUKTURNYA) */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onMouseEnter={() => setHoveredItem("logout")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={handleLogout}
        >
          <img
            src={
              hoveredItem === "logout" ? iconLogoutSelected : iconLogout
            }
            className="nav-icon"
            alt="nav-icon"
          />
          <span className="logout-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
