import { useState } from "react";
import api from "../services/api";

const BookFormModal = ({ onClose, onSuccess }) => {
    const [judul, setJudul] = useState("");
    const [stok, setStok] = useState("");

    const handleSubmit = async () => {
        try {
            await api.post("/buku", {
                nama_buku: judul,
                stok: Number(stok),
            });

            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Gagal menambah buku");
        }
    };
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h5>Form Buku</h5>

                <input
                    placeholder="Judul Buku"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                />



                <input
                    type="number"
                    placeholder="Stok"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                />

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

export default BookFormModal;
