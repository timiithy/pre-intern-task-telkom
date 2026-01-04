import { useState } from "react";
import UserFormModal from "./UserFormModal";

const UserTable = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="card-outline">
            <h5>Manajemen User</h5>

            <table className="highlight">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>ID</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Timoters</td>
                        <td>tanuwidjayers@gmail.com</td>
                        <td>123456</td>
                        <td>
                            <button className="btn-small blue">Edit</button>{" "}
                            <button className="btn-small red">Hapus</button>
                        </td>
                    </tr>

                    <tr>
                        <td>Muh. Gwe</td>
                        <td>gweapalo@gmail.com</td>
                        <td>654321</td>
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
                + Tambah User
            </button>

            {showModal && (
                <UserFormModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default UserTable;
