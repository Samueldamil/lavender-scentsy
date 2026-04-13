import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [logs, setLogs] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { notify } = useNotification();
    const API_URL = import.meta.env.VITE_API_URL;

    function handleChange(e) {
        const { name, value } = e.target;

        setLogs((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(logs),
            });

            const data = await res.json();

            if (!res.ok) {
                notify(data.message, "error");
                return;
            }

            login(data.token);

            notify("Welcome back", "success");

            navigate("/");
        } catch(err) {
            notify("Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    }
       
    return (
        <>
            <div className="login">
                <div className="login-container">
                    <h2 className="login-logo">Lavender <br /> <span className="scentsy">Scentsy</span></h2>
                    <div className="form-container">
                        <form className="login-box" onSubmit={handleSubmit}>
                            <h3>Login</h3>
                            <h4>Welcome back</h4>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={login.email}
                                onChange={handleChange}
                                required
                            />
                            <PasswordInput
                                name="password"
                                placeholder="Password"
                                value={login.password}
                                onChange={handleChange}
                                required
                            />

                            <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                        </form>
                        <p>
                            Don't have an account? <Link to="/signup" className="next-account">Sign up</Link>                     
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}