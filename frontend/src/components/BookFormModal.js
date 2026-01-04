const BookFormModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h5>Form Buku</h5>

                <input placeholder="Judul Buku" />
                <input placeholder="Penulis" />
                <input type="number" placeholder="Stok" />

                <div style={{ marginTop: "16px" }}>
                    <button className="btn blue">Simpan</button>{" "}
                    <button className="btn grey" onClick={onClose}>
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookFormModal;
