import api from "../services/api";

const BookTable = ({ data, refresh }) => {

  return (
    <div className="card-outline">
      <h5>Manajemen Buku</h5>

      <div className="table-scroll">
      <table className="highlight">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Stock</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan="3" className="left-align">
                Belum ada buku
              </td>
            </tr>
          )}

          {data.map((buku) => (
            <tr key={buku.id_buku}>
              <td>{buku.nama_buku}</td>
              <td>{buku.stok}</td>
              <td className="left-align">
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
      </div>
    </div>
  );
};

export default BookTable;
