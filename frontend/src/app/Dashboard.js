import StatCard from "../components/StatCard";
import RecentBorrowTable from "../components/RecentBorrowTable";
import {
    dashboardStats,
    recentBorrows,
} from "../data/dummyDashboard";

const Dashboard = () => {
    return (
        <div className="container" style={{ marginTop: "40px" }}>
            <h4 className="center-align">
                Dashboard Admin Perpustakaan
            </h4>

            {/* STAT CARDS */}
            <div className="dashboard-cards" style={{ marginTop: "32px" }}>
                {dashboardStats.map((item, index) => (
                    <StatCard
                        key={index}
                        title={item.title}
                        value={item.value}
                    />
                ))}
            </div>

            {/* RECENT BORROW TABLE */}
            <div style={{ marginTop: "56px" }}>
                <h5 className="center-align">Recent Peminjaman</h5>
                <RecentBorrowTable data={recentBorrows} />
            </div>
        </div>
    );
};

export default Dashboard;
