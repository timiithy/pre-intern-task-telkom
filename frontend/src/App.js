import { useState } from "react";
import Dashboard from "./app/Dashboard";
import Admin from "./app/Admin";
import Header from "./components/Header";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <>
      <Header page={page} setPage={setPage} />

      {page === "dashboard" && <Dashboard />}
      {page === "admin" && <Admin />}
    </>
  );
}

export default App;
