import { useState } from "react";
import api from "../services/api";

const BookFormModal = ({ onClose, onSuccess }) => {
    const [judul, setJudul] = useState("");
    const [stok, setStok] = useState("");
    const [gambar, setGambar] = useState(null); // 🆕 state file

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("nama_buku", judul);
            formData.append("stok", Number(stok));
            formData.append("gambar", gambar); // 🆕 kirim file

            await api.post("/buku", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
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

                {/* 🆕 input upload gambar */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setGambar(e.target.files[0])}
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
