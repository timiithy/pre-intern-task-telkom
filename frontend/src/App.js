import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/Login";
import UserDashboard from "./app/UserDashboard";
import Admin from "./app/Admin";
import Dashboard from "./app/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT → DASHBOARD ADMIN */}
        <Route
          path="/"
          element={
            <>
              <Dashboard />
            </>
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard-user"
          element={
            <>
              <UserDashboard />
            </>
          }
        />

        {/* ADMIN PAGE */}
        <Route
          path="/admin"
          element={
            <>
              <Admin />
            </>
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <>
              <Dashboard />
            </>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
