import { useState } from "react";
import BorrowFormModal from "./BorrowFormModal";

const BorrowTable = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="card-outline">
            <h5>Manajemen Peminjaman</h5>

            <table className="highlight">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Buku</th>
                        <th>Tgl Pinjam</th>
                        <th>Tgl Kembali</th>
                        <th>Lama (Hari)</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Timoters</td>
                        <td>Bayangin: Best Seller</td>
                        <td>2024-10-01</td>
                        <td>2024-10-08</td>
                        <td>7</td>
                        <td>
                            <button className="btn-small blue">Edit</button>{" "}
                            <button className="btn-small red">Hapus</button>
                        </td>
                    </tr>
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
                <BorrowFormModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default BorrowTable;
