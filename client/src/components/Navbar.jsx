import { Link } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { TiShoppingCart, TiUser } from "react-icons/ti";
import { RiSearchLine } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false)

    const { totalItem } = useCart();
    const { token, logout } = useAuth();
    const navRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsOpen(false);
                setIsShopOpen(false);
                setIsUserOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    function toggleDropdown(e) {
        e.stopPropagation();
        setIsShopOpen(!isShopOpen);
        setIsUserOpen(false);
    }

    function toggleMenuOpen() {
        setIsOpen(!isOpen);
        setIsShopOpen(false);
        setIsUserOpen(false);
    }

    function userOpen(e) {
        setIsUserOpen(!isUserOpen);
        setIsShopOpen(false);
        setIsOpen(false);
    }

    function handleLogout() {
        logout();
    }
    
    return (
        <nav ref={navRef} className="nav-bar">
            <h3 className="logo">Lavender<br /><span className="scentsy">Scentsy</span></h3>

            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenuOpen}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={`nav-links ${isOpen ? "show-menu" : ""}`}>
                <li><Link to="/">Home</Link></li>
                <li className="dropdown">
                    <button className="dropbtn"  onClick={toggleDropdown}>Shop {isShopOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</button>
                    <ul className={`dropdown-menu ${isShopOpen ? "show" : ""}`}>
                        <li><Link to="/shop/unisex">Unisex</Link></li>
                        <li><Link to="/shop/men">Men</Link></li>
                        <li><Link to="/shop/women">Women</Link></li>
                        <li><Link to="/shop/kids">Kids</Link></li>
                    </ul>
                </li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>

            <ul className="extra-nav-links">
                <li className="extra-item">
                    <Link className="cart-icon" to="/cart"><TiShoppingCart /></Link>

                    {totalItem > 0 && (
                        <span className="cart-count">{totalItem}</span>
                    )}
                </li>
                <li className="user-section">
                    <button className="user-dropbtn" onClick={userOpen}><TiUser /></button>
                    {isUserOpen && (
                        <div className="user-dropdown">
                            {token ? (
                                <>
                                    <Link className="user-item" to="/profile">Profile</Link>
                                    <button className="user-item" onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <Link to="/login" className="user-item">Login</Link>
                            )}
                        </div>
                    )}
                </li>
                <li className="extra-item"><Link to="/search"><RiSearchLine /></Link></li>
            </ul>
        </nav>
    );
}