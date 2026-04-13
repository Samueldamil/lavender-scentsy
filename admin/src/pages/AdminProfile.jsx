import { useNavigate } from "react-router-dom";
import Founder from "../assets/the-founder.jpg";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function AdminProfile() {
    const navigate = useNavigate();
    const fadeRef = useFadeAnimations();

    return(
        <div ref={fadeRef} className="admin-profile-page">
            <h2>Admin Profile</h2>

            <div className="zoom-in profile-card">
                <img src={Founder} alt="Admin" />

                <div className="profile-info">
                    <h3>Store Admin</h3>
                    <p>admin@yourstore.com</p>
                    <button  onClick={() => {
                        navigate("/settings")
                    }}>
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    )
}