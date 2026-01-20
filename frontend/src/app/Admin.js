import { useEffect, useState } from "react";
import Tabs from "../components/Tabs";
import UserTable from "../components/UserTable";
import BookTable from "../components/BookTable";
import BorrowTable from "../components/BorrowTable";
import BorrowFormModal from "../components/BorrowFormModal";
import BookFormModal from "../components/BookFormModal";
import UserFormModal from "../components/UserFormModal";
import api from "../services/api";


const Admin = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users failed", err);
      setUsers([]); // fallback
    }
  };


  const fetchBooks = async () => {
    try {
      const res = await api.get("/buku");
      setBooks(res.data);
    } catch (err) {
      console.error("Fetch books failed", err);
      setBooks([]); // fallback
    }
  };

  const fetchBorrows = async () => {
    try {
      const res = await api.get("/peminjaman");
      setBorrows(res.data);
    } catch (err) {
      console.error("Fetch borrows failed", err);
      setBorrows([]); // fallback
    }
  }
    ;
  const getActionConfig = () => {
    switch (activeTab) {
      case "user":
        return {
          label: "+ Tambah User",
          modal: "user",
          refresh: fetchUsers,
        };
      case "book":
        return {
          label: "+ Tambah Buku",
          modal: "book",
          refresh: fetchBooks,
        };
      case "borrow":
        return {
          label: "+ Tambah Peminjaman",
          modal: "borrow",
          refresh: fetchBorrows,
        };
      default:
        return {};
    }
  };

  const action = getActionConfig();
  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchBorrows();
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchBorrows();
  }, []);

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h4 className="center-align">Admin Management</h4>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div style={{ marginTop: "25px" }}>
        {activeTab === "user" && (
          <UserTable data={users} refresh={fetchUsers} />
        )}
        {activeTab === "book" && (
          <BookTable data={books} refresh={fetchBooks} />
        )}
        {activeTab === "borrow" && (
          <BorrowTable data={borrows} refresh={fetchBorrows} />
        )}
        {action.label && (
          <button
            className="btn green"
            style={{ marginTop: "15px" }}
            onClick={() => setShowModal(true)}
          >
            {action.label}
          </button>
        )}


        {showModal && action.modal === "user" && (
          <UserFormModal
            onClose={() => setShowModal(false)}
            onSuccess={action.refresh}
          />
        )}

        {showModal && action.modal === "book" && (
          <BookFormModal
            onClose={() => setShowModal(false)}
            onSuccess={action.refresh}
          />
        )}

        {showModal && action.modal === "borrow" && (
          <BorrowFormModal
            onClose={() => setShowModal(false)}
            onSuccess={action.refresh}
          />
        )}

      </div>
    </div>
  );
};

export default Admin;
