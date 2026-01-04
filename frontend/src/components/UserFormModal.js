const UserFormModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h5>Form User</h5>

                <input placeholder="Nama Lengkap" />
                <input placeholder="Email" />
                <input placeholder="ID User" />

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

export default UserFormModal;
