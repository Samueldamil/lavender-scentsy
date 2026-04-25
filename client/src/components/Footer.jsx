import { Link } from "react-router-dom";
import { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdEmail } from "react-icons/md";
import { FaPhone, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
    const [shopOpen, setShopOpen] = useState(false);

    function handleFooterToggle() {
        setShopOpen(!shopOpen);
    }
    return(
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section-1">
                    <h2 className="footer-brand">Lavender<br /><span className="scentsy">Scentsy</span></h2>
                    <p className="footer-text">Indulge in luxury fragrances crafted to elevate your presence, leaving a lasting impression with every scent.</p>
                </div>
                <div className="links-footer-section links-lists">
                    <h3>Quick Links</h3>
                    <ul className="footer-lists">
                        <li><Link to="/">Home</Link></li>
                        <li className="shop-parent">
                            <button className="shop-title collapsible" onClick={handleFooterToggle}>
                                Shop {shopOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown/>}
                            </button>
                            <ul className={`footer-shop-dropdown ${shopOpen ? "open" : ""}`}>
                                <li><Link to="/shop/unisex">Unisex</Link></li>
                                <li><Link to="/shop/men">Men</Link></li>
                                <li><Link to="/shop/women">Women</Link></li>
                                <li><Link to="/shop/kids">Kids</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="contact-footer-section">
                    <h3>Contact Us</h3>
                    <ul className="footer-lists contact-lists">
                        <li><FaPhone className="footer-icon"/>: +234 812 345 6789</li>
                        <li><MdEmail className="footer-icon"/>: example@gmail.com</li>
                        <li><FaLocationDot className="footer-icon"/>: Lagos, Nigeria</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-bottom">
                <ul className="social-links">
                    <li><Link to=""><FaInstagram /></Link></li>
                    <li><Link to=""><FaFacebook /></Link></li>
                    <li><Link to=""><FaTiktok /></Link></li>
                </ul>
                <p>&copy; {new Date().getFullYear()} Lavender Scentsy. All Rights Reserved.</p>
            </div>
        </footer>
    );
}