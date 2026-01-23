import { useEffect, useState } from "react";
import api from "../services/api";
import { BookTableUser } from "../components/Table";
import { DetailPanel } from "../components/Navigation";
import { NavigationSidebar } from "../components/Navigation";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/showcase/buku");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <div className="user-dashboard-layout">
      {/* Left Sidebar - Navigation */}
      <NavigationSidebar />

      {/* Main Content */}
      <div className="user-dashboard">
        <div className="dashboard-header">
          <h2>Halo Pengguna</h2>
        </div>

        <div className="dashboard-container">
          {/* Left - Book List */}
          <div className="books-section">
            <BookTableUser
              data={books}
              refresh={fetchBooks}
              onSelectBook={setSelectedBook}
            />
          </div>

          {/* Right - Detail Panel */}
          <DetailPanel selectedBook={selectedBook} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
