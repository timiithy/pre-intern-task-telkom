import { useEffect, useState } from "react";
import { BookTable, BookFormModal } from "../Book";
import api from "../../services/api";

const AddBook = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/buku");
      setBooks(res.data);
    } catch (err) {
      console.error("Fetch books failed", err);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="page-header">
        <h3>Daftar Buku</h3>
        <button className="btn green" onClick={() => setShowModal(true)}>
          + Tambah Buku
        </button>
      </div>

      <BookTable data={books} refresh={fetchBooks} />

      {showModal && (
        <BookFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchBooks}
        />
      )}
    </>
  );
};

export default AddBook;
