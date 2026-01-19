import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            const token = res?.data?.access_token;
            const role = res?.data?.user?.app_metadata?.role || "user";

            if (!token) {
                throw new Error("Token tidak ditemukan");
            }

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            if (role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/showcase");
            }
        } catch (err) {
            console.error(err);
            alert("Login gagal");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h4 className="center-align">Login</h4>

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn blue full-width" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
