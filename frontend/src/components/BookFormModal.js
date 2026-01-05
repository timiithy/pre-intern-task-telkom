import { useState } from "react";
import api from "../services/api";

const BookFormModal = ({ onClose, onSuccess }) => {
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [stok, setStok] = useState("");

  const handleSubmit = async () => {
    try {
      await api.post("/buku", {
        nama_buku: judul,
        // penulis & stok dipake nanti kalau backend udah ada
      });

      onSuccess(); // refresh data di BookTable
      onClose();   // tutup modal
    } catch (err) {
      console.error(err);
      alert("Gagal menambah buku");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5>Form Buku</h5>

        <input
          placeholder="Judul Buku"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />

        <input
          placeholder="Penulis"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          disabled
        />

        <input
          type="number"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
          disabled
        />

        <div style={{ marginTop: "16px" }}>
          <button className="btn blue" onClick={handleSubmit}>
            Simpan
          </button>{" "}
          <button className="btn grey" onClick={onClose}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookFormModal;
