import { useEffect, useState } from "react";
import Tabs from "../components/Tabs";
import UserTable from "../components/UserTable";
import BookTable from "../components/BookTable";
import BorrowTable from "../components/BorrowTable";
import api from "../services/api";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("user");

    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [borrows, setBorrows] = useState([]);

    const fetchUsers = async () => {
        const res = await api.get("/pengguna");
        setUsers(res.data);
    };

    const fetchBooks = async () => {
        const res = await api.get("/buku");
        setBooks(res.data);
    };

    const fetchBorrows = async () => {
        const res = await api.get("/peminjaman");
        setBorrows(res.data);
    };

    useEffect(() => {
        fetchUsers();
        fetchBooks();
        fetchBorrows();
    }, []);

    return (
        <div className="container" style={{ marginTop: "40px" }}>
            <h4 className="center-align">Admin Management</h4>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div style={{ marginTop: "32px" }}>
                {activeTab === "user" && (
                    <UserTable data={users} refresh={fetchUsers} />
                )}
                {activeTab === "book" && (
                    <BookTable data={books} refresh={fetchBooks} />
                )}
                {activeTab === "borrow" && (
                    <BorrowTable data={borrows} refresh={fetchBorrows} />
                )}
            </div>
        </div>
    );
};

export default Admin;
