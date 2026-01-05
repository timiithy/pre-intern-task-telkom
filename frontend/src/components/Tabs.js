const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="dashboard-cards">
            <button
                className={`btn ${activeTab === "user" ? "blue" : "grey"}`}
                onClick={() => setActiveTab("user")}
            >
                Pengguna
            </button>

            <button
                className={`btn ${activeTab === "book" ? "blue" : "grey"}`}
                onClick={() => setActiveTab("book")}
            >
                Buku
            </button>

            <button
                className={`btn ${activeTab === "borrow" ? "blue" : "grey"}`}
                onClick={() => setActiveTab("borrow")}
            >
                Peminjaman
            </button>
        </div>
    );
};

export default Tabs;
