import { useEffect, useState } from "react";
import { StatCard } from "../Common";
import { RecentBorrowTable } from "../Borrow";
import { TopUserTable, TopBookTable } from "../Table";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentBorrows, setRecentBorrows] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    api.get("/dashboard/stats").then((res) => {
      const d = res.data;
      setStats([
        { title: "Total Buku", value: d.total_buku },
        { title: "Total User", value: d.total_user },
        { title: "Total Peminjaman", value: d.total_peminjaman },
        { title: "Buku Dipinjam", value: d.buku_dipinjam },
      ]);
    });

    api.get("/peminjaman").then((res) => setRecentBorrows(res.data));
    api.get("/dashboard/top-users").then((res) => setTopUsers(res.data));
    api.get("/dashboard/top-books").then((res) => setTopBooks(res.data));
  }, []);

  return (
    <>
      <h2>Halo admin</h2>

      <div className="dashboard-cards">
        {stats.map((s, i) => (
          <StatCard key={i} title={s.title} value={s.value} />
        ))}
      </div>

      <div className="dashboard-grid-2">
        <TopUserTable data={topUsers} />
        <TopBookTable data={topBooks} />
      </div>

      <div style={{ marginTop: 48 }}>
        <h5 className="center-align">Recent Peminjaman</h5>
        <RecentBorrowTable data={recentBorrows} />
      </div>
    </>
  );
};

export default Dashboard;
