import BookCard from "./BookCard.js";

const BookGrid = ({ books, onSelect }) => {
    return (
        <div className="book-grid">
            {books.map((b) => (
                <BookCard
                    key={b.id_buku}
                    book={b}
                    onClick={() => onSelect(b)}
                />
            ))}
        </div>
    );
};

export default BookGrid;
