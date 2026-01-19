import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/Login";
import Dashboard from "./app/Dashboard";
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

        {/* DASHBOARD (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Dashboard />
              </>
            </ProtectedRoute>
          }
        />

        {/* ADMIN (PROTECTED, ROLE NYUSUL) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
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
