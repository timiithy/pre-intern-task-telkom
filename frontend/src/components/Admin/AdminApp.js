import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../../app/AdminLayout";
import Dashboard from "./Dashboard";
import Members from "./Member";
import AddBook from "./Book";
import BorrowBook from "./Borrow";

const App = () => {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={role === "admin" ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="borrowBook" element={<BorrowBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
