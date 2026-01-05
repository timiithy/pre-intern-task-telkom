import { useState } from "react";
import BookFormModal from "./BookFormModal";
import api from "../services/api";

const BookTable = ({ data, refresh }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="card-outline">
      <h5>Manajemen Buku</h5>

      <table className="highlight">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="2" className="center-align">
                Belum ada buku
              </td>
            </tr>
          )}

          {data.map((buku) => (
            <tr key={buku.id_buku}>
              <td>{buku.nama_buku}</td>
              <td>
                <button
  className="btn-small red"
  onClick={async () => {
    if (!window.confirm("Yakin hapus buku ini?")) return;

    try {
      await api.delete(`/buku/${buku.id_buku}`);
      refresh(); // ambil ulang data
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus buku");
    }
  }}
>
  HAPUS
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="btn green"
        style={{ marginTop: "16px" }}
        onClick={() => setShowModal(true)}
      >
        + Tambah Buku
      </button>

      {showModal && (
        <BookFormModal
          onClose={() => setShowModal(false)}
          onSuccess={refresh}
        />
      )}
    </div>
  );
};

export default BookTable;
