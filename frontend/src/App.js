import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/Login";
import UserDashboard from "./app/UserDashboard";
import Admin from "./app/Admin";
import AdminLayout from "./app/AdminLayout";
import { Header, ProtectedRoute } from "./components/Common";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT - User Dashboard */}
        <Route path="/" element={<UserDashboard />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* USER DASHBOARD - Public Access */}
        <Route path="/dashboard-user" element={<UserDashboard />} />

        {/* USER DASHBOARD */}
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

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Header />
                <Admin />
              </>
            </ProtectedRoute>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/adminlayout"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Header />
                <AdminLayout />
              </>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/dashboard-user" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;