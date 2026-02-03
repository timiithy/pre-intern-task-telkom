import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
        const res = await api.post("/auth/login", { email, password });

        const token = res?.data?.access_token;
        const role = res?.data?.user?.app_metadata?.role;

        if (!token || !role) {
            throw new Error("Token atau role tidak ditemukan");
        }

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        } else {
            navigate("/dashboard-user", { replace: true });
        }
    } catch (err) {
        setError(
            err?.response?.data?.message || "Email atau password salah"
        );
    } finally {
        setLoading(false);
    }
    };


    return (
        <div className="login-page">
            <div className="login-card">
                <h4 className="center-align">Login</h4>

                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className={error ? "input-error" : ""}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className={error ? "input-error" : ""}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                />
                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                <button
                    className="btn blue full-width"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

            </div>
        </div>
    );
};

export default Login;
