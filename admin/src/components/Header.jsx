import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false);
    return(
        <header className="admin-header">
            <div className="header-left">
                <h2>Lavender<br /><span className="scentsy-logo">Scentsy</span> Admin.</h2>
            </div>

            <div className="header-right">
                <NavLink to="notification">
                    <FaBell className="bell-icon header-icon"/>
                </NavLink>

                <div className="profile-wrapper">
                    <div className="profile" onClick={() => setOpen(!open)}>
                        <FaUserCircle className="profile-icon header-icon" />
                    </div>

                    {open && (
                        <div className="profile-menu">
                            <NavLink to="/admin-profile" className="nav-header">
                                <p>Profile</p>
                            </NavLink>
                            <NavLink to="/settings" className="nav-header">
                                <p>Settings</p>
                            </NavLink>
                            <p className="logout">Logout</p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}