const BorrowFormModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h5>Form Peminjaman</h5>

                <input placeholder="Nama User" />
                <input placeholder="Judul Buku" />
                <input type="date" />
                <input type="date" />

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

export default BorrowFormModal;
