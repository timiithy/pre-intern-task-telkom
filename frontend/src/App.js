import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/Login";
import UserDashboard from "./app/UserDashboard";
import AdminLayout from "./app/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import { Header, ProtectedRoute } from "./components/Common";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/dashboard-user" />} />
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

        {/* ADMIN (LAYOUT + OUTLET) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          {/* nanti tambah members, addBook, borrowBook di sini */}
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
