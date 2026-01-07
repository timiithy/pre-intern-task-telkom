import M from "materialize-css";
import { useEffect, useState } from "react";
import api from "../services/api";

const BorrowFormModal = ({ onClose, onSuccess }) => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [idPengguna, setIdPengguna] = useState("");
  const [idBuku, setIdBuku] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [tanggalPinjam] = useState(today);
  const [tanggalKembali, setTanggalKembali] = useState("");
  const addDays = (dateStr, days) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  };

  useEffect(() => {
    api.get("/pengguna").then(res => setUsers(res.data)).catch(console.error);
    api.get("/buku").then(res => setBooks(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }, [users, books]);

  const handleSubmit = async () => {
    if (!tanggalKembali) {
      alert("Tanggal kembali wajib diisi");
      return;
    }
  try {
    await api.post("/peminjaman", {
      id_pengguna: idPengguna,
      id_buku: idBuku,
      tanggal_pengembalian: tanggalKembali,
    });
  } catch (error) {
    alert(error.response?.data?.error || "Gagal menyimpan peminjaman");
  }

    onSuccess();
    onClose();
    console.log(idPengguna, idBuku);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h5>Form Peminjaman</h5>

        <select
          value={idPengguna}
          onChange={(e) => setIdPengguna(e.target.value)}
        >
          <option value="">Pilih Pengguna</option>
          {users.map(u => (
            <option key={u.id_pengguna} value={u.id_pengguna}>
              {u.nama}
            </option>
          ))}
        </select>

        <select
          value={idBuku}
          onChange={(e) => setIdBuku(e.target.value)}
        >
          <option value="">Pilih Buku</option>
          {books.map(b => (
            <option
              key={b.id_buku}
              value={b.id_buku}
              disabled={Number(b.stok) <= 0}
            >
              {b.nama_buku}{b.stok !== undefined ? ` (stok: ${b.stok})` : ""}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={today}
          disabled
        />

        <input
          type="date"
          min={addDays(tanggalPinjam, 1)}
          value={tanggalKembali}
          onChange={(e) => setTanggalKembali(e.target.value)}
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

export default BorrowFormModal;