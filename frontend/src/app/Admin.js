import { useState } from "react";
import Tabs from "../components/Tabs";
import UserTable from "../components/UserTable";
import BookTable from "../components/BookTable";
import BorrowTable from "../components/BorrowTable";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("user");

    return (
        <div className="container" style={{ marginTop: "40px" }}>
            <h4 className="center-align">Admin Management</h4>

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div style={{ marginTop: "32px" }}>
                {activeTab === "user" && <UserTable />}
                {activeTab === "book" && <BookTable />}
                {activeTab === "borrow" && <BorrowTable />}
            </div>
        </div>
    );
};

export default Admin;
