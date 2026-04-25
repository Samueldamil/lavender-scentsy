import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FaArrowDownLong } from "react-icons/fa6";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function Contact() {
    const fadeRef = useFadeAnimations();

    return (
        <div className="app">
            <Navbar />
            <section ref={fadeRef} className="content contact">
                <div className="contact-hero">
                    <h1 className="fade-right">Get in Touch</h1>
                    <p className="fade-left">We're here to help with orders, recommendations, and any question you may have.</p>

                    <div className="scroll-indicator">
                        <FaArrowDownLong className="arrow-bounce" />
                    </div>
                </div>

                <div className="contact-container">
                    <div className="contact-info fade-left">
                        <h2>Contact Information</h2>
                        <p>Reach out to us anytime. Our team is always ready to assist you with your fragrance needs.</p>

                        <ul>
                            <li><FaPhoneAlt className="contact-info-icon" />: <span>+234 812 345 6789</span></li>
                            <li><FaEnvelope className="contact-info-icon" />: <span>example@gmail.com</span></li>
                            <li><FaMapMarkedAlt className="contact-info-icon" />: <span>Nigeria</span></li>
                            <li><FaClock className="contact-info-icon" />: <span>Mon - Sat (9:00 AM - 6:00PM)</span></li>
                        </ul>
                    </div>

                    <div className="contact-form fade-right">
                        <h2>Send Us a Message</h2>

                        <form>
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" required />
                            </div>

                            <div className="form-group">
                                <input type="email" placeholder="Your Email" required />
                            </div>

                            <div className="form-group">
                                <textarea placeholder="Your Message" rows="5" required />
                            </div>

                            <button type="submit">Send Message!</button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}