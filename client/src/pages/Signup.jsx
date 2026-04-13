import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { notify } = useNotification();
    const { login } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;

    function handleChange(e) {
        const { name, value } = e.target;

        setSignup((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signup),
            });

            const data = await res.json();

            if (!res.ok) {
                notify(data.message, "error");
                return;
            }

            login(data.token);

            notify("Account created successfully", "success");

            navigate('/');
        } catch(err) {
            notify("Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    }

    return(
        <>
            <div className="signup">
                <div className="signup-container">
                    <h2 className="signup-logo">Lavender <br /><span className="scentsy">Scentsy</span></h2>
                    <div className="form-container">
                        <form className="signup-box" onSubmit={handleSubmit}>
                            <h3>Sign Up</h3>
                            <h4>Welcome{signup.name ? ", " + signup.name : " "}</h4>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Full Name" 
                                onChange={handleChange} 
                                value={signup.name} 
                                required 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address" 
                                onChange={handleChange} 
                                value={signup.email}
                                required
                            />
                            <PasswordInput 
                                name="password" 
                                placeholder="Password" 
                                onChange={handleChange} 
                                value={signup.password}
                                required
                            />

                            <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign up"}</button>
                        </form>
                        <p>
                            Already have an account? <Link to="/login" className="next-account">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}