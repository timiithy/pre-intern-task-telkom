import { useEffect, useState } from "react";
import { UserTable, UserFormModal } from "../User";
import api from "../../services/api";

const Members = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    const res = await api.get("/pengguna");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="page-header">
        <h3>Members</h3>
        <button className="btn green" onClick={() => setShowModal(true)}>
          + Tambah User
        </button>
      </div>

      <UserTable data={users} refresh={fetchUsers} />

      {showModal && (
        <UserFormModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchUsers}
        />
      )}
    </>
  );
};

export default Members;
