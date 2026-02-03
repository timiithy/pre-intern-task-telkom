import { /*useNavigate*/ useLocation } from "react-router-dom";

const Header = () => {
    //const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname;

    return (
        <header className="app-header">
            <h5>Perpustakaan Kampus</h5>

            <div>
                <button
                    className={`btn-flat ${currentPath === "/dashboard" ? "active" : ""
                        }`}
                    //onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

                <button
                    className={`btn-flat ${currentPath === "/admin" ? "active" : ""
                        }`}
                    //onClick={() => navigate("/admin")}
                >
                    Admin
                </button>

                <button
                    className="btn-flat red-text"
                    onClick={() => {
                        localStorage.clear();
                        //navigate("/");
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
