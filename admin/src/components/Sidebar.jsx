import { NavLink } from "react-router-dom";
import { FaHome, FaBoxOpen, FaPlusCircle, FaShoppingCart, FaUserShield, FaUsers } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

export default function Sidebar() {
    return(
        <aside className="sidebar">
            <nav className="sidebar-menu">
                <NavLink to="/" end className="nav-item">
                    <FaHome />
                    <span>DashBoard</span>
                </NavLink>

                <NavLink to="/products" className="nav-item">
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>

                <NavLink to="/add-product" className="nav-item">
                    <FaPlusCircle />
                    <span>Add Product</span>
                </NavLink>

                <NavLink to="/orders" className="nav-item">
                    <FaShoppingCart />
                    <span>Orders</span>
                </NavLink>

                <NavLink to="/messages" className="nav-item">
                    <FaRegMessage />
                    <span>Messages</span>
                </NavLink>

                <NavLink to="/admin-users" className="nav-item">
                    <FaUsers />
                    <span>Users</span>
                </NavLink>

                <NavLink to="/admin-profile" className="nav-item">
                    <FaUserShield />
                    <span>Admin Profile</span>
                </NavLink>
            </nav>
        </aside>
    );
}