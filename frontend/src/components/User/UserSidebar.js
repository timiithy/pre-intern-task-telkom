import { useNavigate, useLocation } from "react-router-dom";

const UserSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Jelajah", path: "/dashboard-user" },
    { label: "Fitur 2", path: "#" },
    { label: "Fitur 3", path: "#" },
    { label: "Fitur 4", path: "#" },
    { label: "Fitur 5", path: "#" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="user-sidebar">

      <nav className="sidebar-menu">
        {menu.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${
              location.pathname === item.path ? "active" : ""
            }`}
            onClick={() => item.path !== "#" && navigate(item.path)}
          >
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default UserSidebar;
