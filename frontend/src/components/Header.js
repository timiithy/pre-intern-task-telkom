const Header = ({ page, setPage }) => {
    return (
        <header className="app-header">
            <div className="header-left">
                <h5>Perpustakaan Kampus</h5>
            </div>

            <div className="header-right">
                <button
                    className={`btn-flat ${page === "dashboard" ? "active" : ""}`}
                    onClick={() => setPage("dashboard")}
                >
                    Dashboard
                </button>

                <button
                    className={`btn-flat ${page === "admin" ? "active" : ""}`}
                    onClick={() => setPage("admin")}
                >
                    Admin
                </button>
            </div>
        </header>
    );
};

export default Header;
