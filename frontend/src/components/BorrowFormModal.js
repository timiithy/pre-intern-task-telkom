import M from "materialize-css";
import { useEffect, useState } from "react";
import api from "../services/api";

const BorrowFormModal = ({ onClose, onSuccess }) => {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [idPengguna, setIdPengguna] = useState("");
    const [idBuku, setIdBuku] = useState("");
    const [durasi, setDurasi] = useState("");

    useEffect(() => {
        // fetch users and books for selection
        api.get("/pengguna").then(res => setUsers(res.data)).catch(console.error);
        api.get("/buku").then(res => setBooks(res.data)).catch(console.error);
    }, []);

    useEffect(() => {
        const elems = document.querySelectorAll("select");
        M.FormSelect.init(elems);
    }, [users, books]);

    const handleSubmit = async () => {
        try {
            await api.post("/peminjaman", {
                id_pengguna: idPengguna,
                id_buku: idBuku,
                durasi: Number(durasi),
            });

            onSuccess(); // refresh BorrowTable
            onClose();   // tutup modal
        } catch (err) {
            console.error(err);
            alert("Gagal menambah peminjaman");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h5>Form Peminjaman</h5>

                <select
                    value={idPengguna}
                    onChange={(e) => setIdPengguna(e.target.value)}
                >
                    <option value="">Pilih Pengguna</option>
                    {users.map(u => (
                        <option key={u.id_pengguna} value={u.id_pengguna}>
                            {u.nama}
                        </option>
                    ))}
                </select>

                <select
                    value={idBuku}
                    onChange={(e) => setIdBuku(e.target.value)}
                >
                    <option value="">Pilih Buku</option>
                    {books.map(b => (
                        <option key={b.id_buku} value={b.id_buku}>
                            {b.nama_buku}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Durasi (hari)"
                    value={durasi}
                    min={1}
                    step={1}
                    onChange={(e) => {
                        const val = e.target.value
                        if (/^[1-9]\d*$/.test(val) || val === "") {
                            setDurasi(val)
                        }
                    }}

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

export default BorrowFormModal;
