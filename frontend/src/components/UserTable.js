import { useState } from "react";
import UserFormModal from "./UserFormModal";
import api from "../services/api";


const UserTable = ({ data, refresh }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="card-outline">
            <h5>Manajemen User</h5>

            <table className="highlight">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 && (
                        <tr>
                            <td colSpan="2" className="center-align">
                                Belum ada user
                            </td>
                        </tr>
                    )}

                    {data.map((user) => (
                        <tr key={user.id_pengguna}>
                            <td>{user.nama}</td>
                            <td>
                                <button
                                    className="btn-small red"
                                    onClick={async () => {
                                        if (!window.confirm("Yakin hapus user ini?")) return;

                                        try {
                                            await api.delete(`/user/${user.id_pengguna}`);
                                            refresh(); // ambil ulang data
                                        } catch (err) {
                                            console.error(err);
                                            alert("Gagal menghapus user");
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
                + Tambah User
            </button>

            {showModal && (
                <UserFormModal
                    onClose={() => setShowModal(false)}
                    onSuccess={refresh}
                />
            )}
        </div>
    );
};

export default UserTable;
