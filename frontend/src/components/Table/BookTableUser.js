const BookTableUser = ({ data, refresh, onSelectBook }) => {
  return (
    <div className="card-outline">
      <div className="table-header">
        <h5>Daftar Buku</h5>
        <button className="btn-small blue" onClick={refresh}>
          Refresh
        </button>
      </div>

      <div className="book-grid">
        {data.length === 0 && (
          <p className="center-align">Belum ada buku</p>
        )}

        {data.map((buku) => (
          <div
            key={buku.id_buku}
            className="book-card clickable"
            onClick={() => onSelectBook(buku)}
          >
            <img
              src={buku.cover_url}
              alt={buku.nama_buku}
              className="book-image"
            />

            <div className="book-info">
              <p className="book-title">{buku.nama_buku}</p>
              <p className="book-stock">Stok: {buku.stok}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTableUser;
