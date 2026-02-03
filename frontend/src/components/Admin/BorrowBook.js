import { useEffect, useState } from "react";
import { BorrowTable, BorrowFormModal } from "../Borrow";
import api from "../../services/api";

const BorrowBook = () => {
  const [borrows, setBorrows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchBorrows = async () => {
    try {
      const res = await api.get("/peminjaman");
      setBorrows(res.data);
    } catch (err) {
      console.error("Fetch borrows failed", err);
      setBorrows([]);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  return (
    <>
      <div className="page-header">
        <h3>Peminjaman Buku</h3>
        <button className="btn green" onClick={() => setShowModal(true)}>
          + Tambah Peminjaman
        </button>
      </div>

      <BorrowTable data={borrows} refresh={fetchBorrows} />

      {showModal && (
        <BorrowFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchBorrows}
        />
      )}
    </>
  );
};

export default BorrowBook;
