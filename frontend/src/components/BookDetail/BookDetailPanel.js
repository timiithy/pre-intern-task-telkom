const BookDetailPanel = ({ book }) => {
    if (!book) {
        return (
            <div className="detail-panel empty">
                <p>Klik buku untuk melihat detail</p>
            </div>
        );
    }

    return (
        <div className="detail-panel">
            <img src={book.cover_url} alt={book.nama_buku} />
            <h6>{book.nama_buku}</h6>
            <p><b>{book.author_buku}</b></p>
            <p>{book.deskripsi_buku}</p>
        </div>
    );
};

export default BookDetailPanel;
