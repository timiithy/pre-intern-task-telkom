import { iconDetailpanel } from "../Icons";
const DetailPanel = ({ selectedBook }) => {
    return (
        <div className="detail-section">
            {selectedBook ? (
                <div className="detail-content">
                    <img
                        src={selectedBook.cover_url}
                        alt={selectedBook.nama_buku}
                        className="detail-image"
                    />
                    <div className="detail-info">
                        <h3>{selectedBook.nama_buku}</h3>
                        <p className="author">{selectedBook.author_buku}</p>
                        <p className="isbn">ISBN: {selectedBook.isbn || "-"}</p>
                        <p className="stock">Stok: {selectedBook.stok}</p>
                        <p className="description">{selectedBook.deskripsi_buku}</p>
                    </div>
                </div>
            ) : (
                <div className="no-selection">
                    <img src={iconDetailpanel} alt="Book Icon" style={{opacity: 1}} />
                    <p>Klik buku untuk melihat detail buku</p>
                </div>
            )}
        </div>
    );
};

export default DetailPanel;
