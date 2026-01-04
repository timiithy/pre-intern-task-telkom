import { useState } from "react";
import BookFormModal from "./BookFormModal";

const BookTable = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="card-outline">
            <h5>Manajemen Buku</h5>

            <table className="highlight">
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th>Stok</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Bayangin: Best Seller</td>
                        <td>F</td>
                        <td>5</td>
                        <td>
                            <button className="btn-small blue">Edit</button>{" "}
                            <button className="btn-small red">Hapus</button>
                        </td>
                    </tr>

                    <tr>
                        <td>Atomic Habit banget</td>
                        <td>Akira Toriyama</td>
                        <td>3</td>
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
                + Tambah Buku
            </button>

            {showModal && (
                <BookFormModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default BookTable;
