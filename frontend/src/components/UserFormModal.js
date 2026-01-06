import { useState } from "react";
import api from "../services/api";

const UserFormModal = ({ onClose, onSuccess }) => {
    const [nama, setNama] = useState("");

    const handleSubmit = async () => {
        try {
            await api.post("/pengguna", {
                nama: nama,
            });

            onSuccess(); // refresh data di UserTable
            onClose();   // tutup modal
        } catch (err) {
            console.error(err);
            alert("Gagal menambah user");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h5>Form User</h5>

                <input
                    placeholder="Nama Lengkap"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                />

                {/* Backend belum punya email & ID manual */}
                <input placeholder="Email" disabled />
                <input placeholder="ID User" disabled />

                <div style={{ marginTop: "16px" }}>
                    <button className="btn blue" onClick={handleSubmit}>
                        Simpan
                    </button>{" "}
                    <button className="btn grey" onClick={onClose}>
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserFormModal;
