import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // ini dummy ygy, nanti reza ganti pake API
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem("role", "admin");

        navigate("/dashboard");
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
