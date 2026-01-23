import api from "../../services/api";

const BookTable = ({ data, refresh }) => {
  return (
    <div className="card-outline">
      <div className="table-header">
        <h5>Manajemen Buku</h5>
        <button className="btn-small blue" onClick={refresh}>
          Refresh
        </button>
      </div>

      {/* GRID CONTAINER */}
      <div className="book-grid">
        {data.length === 0 && (
          <p className="center-align">Belum ada buku</p>
        )}

        {data.map((buku) => (
          <div className="book-card" key={buku.id_buku}>
            <img
              src={buku.cover_url}
              alt={buku.nama_buku}
              className="book-image"
            />


            <div className="book-info">
              <p className="book-title">{buku.nama_buku}</p>
              <p className="book-stock">Stok: {buku.stok}</p>
              <p className="book-author">Author: {buku.author_buku || "-"}</p>
              <p className="book-isbn">ISBN: {buku.isbn || "-"}</p>


              <button
                className="btn-small red"
                onClick={async () => {
                  if (!window.confirm("Yakin hapus buku ini?")) return;

                  try {
                    await api.delete(`/buku/${buku.id_buku}`);
                    refresh();
                  } catch (err) {
                    console.error(err);
                    alert("Gagal menghapus buku");
                  }
                }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTable;
