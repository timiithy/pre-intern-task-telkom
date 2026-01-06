import api from "../services/api";


const BorrowTable = ({ data, refresh }) => {

  return (
    <div className="card-outline">
      <h5>Manajemen Peminjaman</h5>
      <div className="table-scroll">
      <table className="highlight">
        <thead>
          <tr>
            <th>User</th>
            <th>Buku</th>
            <th>Durasi (Hari)</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="5" className="center-align">
                Belum ada peminjaman
              </td>
            </tr>
          )}

          {data.map((p) => (
            <tr key={p.id_peminjaman}>
              <td>{p.pengguna_detail?.nama || "-"}</td>
              <td>{p.buku_detail?.nama_buku || "-"}</td>
              <td>{p.durasi}</td>
              <td>
                {p.returned_at ? "Dikembalikan" : "Dipinjam"}
              </td>
              <td>
                <button
                  className="btn-small red"
                  onClick={async () => {
                    if (!window.confirm("Yakin hapus peminjaman ini?")) return;

                    try {
                    await api.delete(`/peminjaman/${p.id_peminjaman}`);
                    refresh(); // ambil ulang data
                   } catch (err) {
                  console.error(err);
                  alert("Gagal menghapus peminjaman");
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
      </div>
    </div>
  );
};

export default BorrowTable;
