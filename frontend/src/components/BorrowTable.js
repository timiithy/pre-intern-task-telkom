import { useState } from "react";
import BorrowFormModal from "./BorrowFormModal";
import api from "../services/api";


const BorrowTable = ({ data, refresh }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="card-outline">
            <h5>Manajemen Peminjaman</h5>

            <table className="highlight">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Buku</th>
                        <th>Durasi (Hari)</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td colSpan="5" className="center-align">
                                Belum ada peminjaman
                            </td>
                        </tr>
                    )}

                    {data.map((p) => (
                        <tr key={p.id_peminjaman}>
                            <td>{p.pengguna_detail?.nama || "-"}</td>
                            <td>{p.buku_detail?.nama_buku || "-"}</td>
                            <td>{p.durasi}</td>
                            <td>
                                {p.returned_at ? "Dikembalikan" : "Dipinjam"}
                            </td>
                            <td>
                                <button
                                    className="btn-small red"
                                    onClick={async () => {
                                        if (!window.confirm("Yakin hapus peminjaman ini?")) return;

                                        try {
                                            await api.delete(`/peminjaman/${p.id_peminjaman}`);
                                            refresh(); // ambil ulang data
                                        } catch (err) {
                                            console.error(err);
                                            alert("Gagal menghapus peminjaman");
                                        }
                                    }}
                                >
                                    HAPUS
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                className="btn green"
                style={{ marginTop: "16px" }}
                onClick={() => setShowModal(true)}
            >
                + Tambah Peminjaman
            </button>

            {showModal && (
                <BorrowFormModal
                    onClose={() => setShowModal(false)}
                    onSuccess={refresh}
                />
            )}
        </div>
    );
};

export default BorrowTable;
