import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/Login";
import UserDashboard from "./app/UserDashboard";
import AdminLayout from "./app/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import Members from "./components/Admin/Members";
import AddBook from "./components/Admin/AddBook";
import BorrowBook from "./components/Admin/BorrowBook";
import { Header, ProtectedRoute } from "./components/Common";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* USER */}
        <Route
          path="/dashboard-user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <>
                <Header />
                <UserDashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="borrowBook" element={<BorrowBook />} />
        </Route>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
