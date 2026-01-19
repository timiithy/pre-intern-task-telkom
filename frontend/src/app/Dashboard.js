import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import RecentBorrowTable from "../components/RecentBorrowTable";
import TopUserTable from "../components/TopUserTable";
import TopBookTable from "../components/TopBookTable";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentBorrows, setRecentBorrows] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    api.get("/dashboard/stats")
      .then(res => {
        const data = res.data;
        setStats([
          { title: "Total Buku", value: data.total_buku },
          { title: "Total User", value: data.total_user },
          { title: "Total Peminjaman", value: data.total_peminjaman },
          { title: "Buku Dipinjam", value: data.buku_dipinjam },
        ]);
      })
      .catch(console.error);

    api.get("/peminjaman")
      .then(res => setRecentBorrows(res.data))
      .catch(console.error);

    api.get("/dashboard/top-users")
      .then(res => setTopUsers(res.data))
      .catch(console.error);

    api.get("/dashboard/top-books")
      .then(res => setTopBooks(res.data))
      .catch(console.error);

  }, []);

 useEffect(() => {
  	const role = localStorage.getItem("role");
  	if (role !== "admin") {
    	window.location.href = "/";
  	}
	}, []);


  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <h4 className="center-align">Dashboard Admin Perpustakaan</h4>

      {/* STAT CARDS */}
      <div className="dashboard-cards" style={{ marginTop: "32px" }}>
        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>
      {/* TOP USER & TOP BOOK */}
      <div className="dashboard-grid-2">
        <TopUserTable data={topUsers} />
        <TopBookTable data={topBooks} />
      </div>
      {/* RECENT BORROW */}
      <div style={{ marginTop: "56px" }}>
        <h5 className="center-align">Recent Peminjaman</h5>
        <RecentBorrowTable data={recentBorrows} />
      </div>

    </div>
  );
};

export default Dashboard;
