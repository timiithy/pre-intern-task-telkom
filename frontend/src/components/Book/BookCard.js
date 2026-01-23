const BookCard = ({ book, onClick }) => {
  return (
    <div className="book-card" onClick={onClick}>
      <img
        src={book.cover_url}
        alt={book.nama_buku}
      />
      <p className="title">{book.nama_buku}</p>
      <small>{book.author_buku}</small>
    </div>
  );
};

export default BookCard;
