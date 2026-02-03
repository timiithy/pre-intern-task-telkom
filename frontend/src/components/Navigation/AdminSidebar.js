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
    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname.startsWith(path);

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
          className={`nav-item ${isActive("/admin/dashboard") ? "active" : ""}`}
          onMouseEnter={() => !isActive("/admin/dashboard") && setHoveredItem("dashboard")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/admin/dashboard")}
        >
          <img
            src={
              isActive("/admin/dashboard") || hoveredItem === "dashboard"
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
          className={`nav-item ${isActive("/admin/members") ? "active" : ""}`}
          onMouseEnter={() => !isActive("/admin/members") && setHoveredItem("members")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/admin/members")}
        >
          <img
            src={
              isActive("/admin/members") || hoveredItem === "members"
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
          className={`nav-item ${isActive("/admin/addBook") ? "active" : ""}`}
          onMouseEnter={() => !isActive("/admin/addBook") && setHoveredItem("addBook")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/admin/addBook")}
        >
          <img
            src={
              isActive("/admin/addBook") || hoveredItem === "addBook"
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
          className={`nav-item ${isActive("/admin/borrowBook") ? "active" : ""}`}
          onMouseEnter={() =>
            !isActive("/admin/borrowBook") && setHoveredItem("borrowBook")
          }
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => navigate("/admin/borrowBook")}
        >
          <img
            src={
              isActive("/admin/borrowBook") || hoveredItem === "borrowBook"
                ? iconFiturSelected
                : iconFitur
            }
            className="nav-icon"
            alt="borrowbook"
          />
          <span className="nav-label">Peminjaman Buku</span>
        </div>
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onMouseEnter={() => setHoveredItem("logout")}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={handleLogout}
        >
          <img
            src={hoveredItem === "logout" ? iconLogoutSelected : iconLogout}
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
