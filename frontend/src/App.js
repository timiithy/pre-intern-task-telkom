import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/Login";
import Dashboard from "./app/Dashboard";
import UserDashboard from "./app/UserDashboard";
import Admin from "./app/Admin";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <>
                <Header />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

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

        {/* ADMIN PAGE */}
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

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
