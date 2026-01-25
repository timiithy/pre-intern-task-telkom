import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { iconJelajah, iconJelajahSelected, iconFitur, iconFiturSelected, iconLogout, iconLogoutSelected, iconLogo } from "../Icons";

const Sidebar = () => {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleAdminClick = () => {
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <img src={iconLogo} alt="SiPustaka" className="logo-icon " />
                </div>
            </div>

            <nav className="sidebar-nav">
                <div className="nav-item active">
                    <img src={hoveredItem === 'jelajah' ? iconJelajah : iconJelajahSelected} alt="Jelajah" className="nav-icon icon-hover" />
                    <span className="nav-label">Jelajah</span>
                </div>

                <div className="nav-item" onMouseEnter={() => setHoveredItem('fitur2')} onMouseLeave={() => setHoveredItem(null)}>
                    <img src={hoveredItem === 'fitur2' ? iconFiturSelected : iconFitur} alt="Fitur 2" className="nav-icon icon-hover" />
                    <span className="nav-label">Fitur 2</span>
                </div>

                <div className="nav-item" onMouseEnter={() => setHoveredItem('fitur3')} onMouseLeave={() => setHoveredItem(null)}>
                    <img src={hoveredItem === 'fitur3' ? iconFiturSelected : iconFitur} alt="Fitur 3" className="nav-icon icon-hover" />
                    <span className="nav-label">Fitur 3</span>
                </div>

                <div className="nav-item" onMouseEnter={() => setHoveredItem('fitur4')} onMouseLeave={() => setHoveredItem(null)}>
                    <img src={hoveredItem === 'fitur4' ? iconFiturSelected : iconFitur} alt="Fitur 4" className="nav-icon icon-hover" />
                    <span className="nav-label">Fitur 4</span>
                </div>

                <div className="nav-item" onMouseEnter={() => setHoveredItem('fitur5')} onMouseLeave={() => setHoveredItem(null)}>
                    <img src={hoveredItem === 'fitur5' ? iconFiturSelected : iconFitur} alt="Fitur 5" className="nav-icon icon-hover" />
                    <span className="nav-label">Fitur 5</span>
                </div>
            </nav>

            <button className="nav-item logout-btn" onMouseEnter={() => setHoveredItem('logout')} onMouseLeave={() => setHoveredItem(null)} onClick={handleLogout}>
                <img src={hoveredItem === 'logout' ? iconLogoutSelected : iconLogout} alt="Logout" className="nav-icon icon-hover" />
                <span className="nav-label">Logout</span>
            </button>

            <div className="sidebar-footer">
                <button className="admin-link" onClick={handleAdminClick}>
                    Saya Admin
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
