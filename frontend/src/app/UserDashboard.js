import { useEffect, useState } from "react";
import BookTableUser from "../components/BookTableUser";
import DetailBook from "../components/DetailBook";
import api from "../services/api";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);

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
    <div className="container" style={{ marginTop: "40px" }}>
      <h4 className="center-align">Dashboard Perpustakaan</h4>

      <div style={{ marginTop: "32px" }}>
        <BookTableUser
          data={books}
          refresh={fetchBooks}
          onSelectBook={(buku) => setSelectedBookId(buku.id_buku)}
        />
      </div>

      {selectedBookId && (
        <DetailBook
          bookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
        />
      )}
    </div>
  );
};

export default UserDashboard;
