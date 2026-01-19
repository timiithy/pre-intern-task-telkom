import { useEffect, useState } from "react";
import api from "../services/api";

const DetailBook = ({ bookId, onClose }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!bookId) return;

    api.get(`/buku/${bookId}`)
      .then(res => setBook(res.data))
      .catch(console.error);
  }, [bookId]);

  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">
          <img
            src={book.cover_url}
            alt={book.nama_buku}
            className="detail-image"
          />

          <div className="detail-info">
            <h5>{book.nama_buku}</h5>
            <p className="author">✍ {book.author_buku}</p>
            <p className="stock">Stok: {book.stok}</p>
            <p className="desc">{book.deskripsi_buku}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
