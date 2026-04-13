import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaArrowDownLong } from "react-icons/fa6";
import { FaShippingFast, FaHeart, FaStar, FaLeaf, FaShoppingBag } from "react-icons/fa";
import Floral from "../assets/floral-perfume.jpg";
import Oriental from "../assets/oriental-perfume.jpg";
import Fresh from "../assets/fresh-perfume.jpeg";
import Woody from "../assets/woody-perfume.jpeg";
import Founder from "../assets/the-founder.jpg";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function About() {
    const fadeRef = useFadeAnimations();

    return (
        <div className="app">
            <Navbar />
            <div ref={fadeRef} className="content about">
                <section className="about-hero">
                    <h1 className="fade-right">About Us</h1>
                    <p className="fade-left">Crafting exceptional fragrances that capture the essence of luxury and sophistication.</p>

                    <div className="scroll-indicator">
                        <FaArrowDownLong className="arrow-bounce" />
                    </div>
                </section>

                <section className="philosophy zoom-in">
                    <h2>Crafted with Passion</h2>
                    <hr />
                    <p>
                        At Lavender Scentsy, we believe a fragrance is far more than a pleasant aroma - it is a silent language, a memory waiting to happen, and a personal signature that speaks long before you do. What began as a small passion project has grown into a world of carefully crafted scents, each bottle telling a story of elegance, depth and emotion.
                    </p>
                    <p>
                        Our journey started with a simple mission: to bring premium quality fragrances within reach that not only smell luxurious but also feel meaningful. We offer perfumes from expert perfumers and source premium essential oils from around the globe to achieve balance, longevity, and unforgettable character. We understand that fragrance is personal, which is why each collection is designed to match different moods, personalities and moments.
                    </p>
                    <p>
                        What makes us unique is our commitment to helping you discover the fragrance that reflects your story. With exceptional customer experience, fast delivery, and a passion for quality, we've created a space where fragrance lovers feels at home.
                    </p>

                    <div className="phil-grid">
                        <div className="phil-item phil-item-1">
                            <FaLeaf style={{ color: "green" }}/>
                            <h3>Curated Quality</h3>
                            <p>Every fragrance is handpicked based on originality, freshness, longetivity, and elegance.</p>
                        </div>

                        <div className="phil-item phil-item-2">
                            <FaStar style={{ color: "#cfae70" }} />
                            <h3>Trusted Brands</h3>
                            <p>We sell perfumes from authentic and reputable brands to ensure 100% original perfumes.</p>
                        </div>

                        <div className="phil-item phil-item-3">
                            <FaShippingFast style={{ color: "blue" }} />
                            <h3>Fast Delivery</h3>
                            <p>Enjoy swift, secure delivery right to your door step nationwide.</p>
                        </div>

                        <div className="phil-item phil-item-4">
                            <FaHeart style={{ color: "red" }} />
                            <h3>Customer First</h3>
                            <p>Your satisfaction matters. We guide you to find your perfect scents.</p>
                        </div>

                        <div className="phil-item phil-item-5">
                            <FaShoppingBag style={{ color: "brown" }}/>
                            <h3>Luxury Shopping Experience</h3>
                            <p>From careful packaging to attentive customer support, we ensure purchase feels premium from start to finish.</p>
                        </div>
                    </div>
                </section>

                <section className="aroma-section fade-down">
                    <h2>Aroma Notes</h2>
                    <hr />
                    <p className="aroma-description">Explore are the scent families that shape every unforgettable fragrance.</p>

                    <div className="note-grid">
                        <div className="note">
                            <img src={Floral} alt="Floral Perfume Picture"/>
                            <h3>Floral</h3>
                            <p>Soft, romantic and elegant-perfect for everyday luxury.</p>
                        </div>

                        <div className="note">
                            <img src={Oriental} alt="Oriental Perfume Picture" />
                            <h3>Oriental</h3>
                            <p>Rich, spicy and sensual-crafted for bold personalities.</p>
                        </div>

                        <div className="note">
                            <img src={Woody} alt="Woody Perfume Picture"/>
                            <h3>Woody</h3>
                            <p>Warm and earthy, giving depth and character to your presence.</p>
                        </div>

                        <div className="note">
                            <img src={Fresh} alt="Fresh Perfume Picture" />
                            <h3>Fresh</h3>
                            <p>Clean and energetic scents inspired by nature.</p>
                        </div>
                    </div>
                </section>

                <section className="process-section fade-right">
                    <h2 className="process-title">Our Process</h2>
                    <hr />
                    <p className="process-subtitle">From selection to delivery, every step is handled with care, transparency and precision.</p>

                    <div className="process-grid">
                        <div className="process-card">
                            <h3>1</h3>
                            <h4>Careful Selection</h4>
                            <p>We source our perfume only from trusted brands and verified suppliers. Each fragrance is chosen based on authenticity, quality and lasting appeal.</p>
                        </div>

                        <div className="process-card">
                            <h3>2</h3>
                            <h4>Quality Assurance</h4>
                            <p>Every bottle is inspected and stored under proper conditions to preserve freshness and originality.</p>
                        </div>

                        <div className="process-card">
                            <h3>3</h3>
                            <h4>Customer Guidance</h4>
                            <p>We help you make the right choice by offering clear description and recommendations tailored to your preference.</p>
                        </div>

                        <div className="process-card">
                            <h3>4</h3>
                            <h4>Secure Packaging</h4>
                            <p>Your perfume is carefully packaged to protect and maintain both presentation and product integrity.</p>
                        </div>

                        <div className="process-card">
                            <h3>5</h3>
                            <h4>Reliable Delivery</h4>
                            <p>We ensure timely and secure delivery right to your doorstep.</p>
                        </div>
                    </div>
                </section>

                <section className="founder-section fade-up">
                    <h2 className="founder-title">Meet Our Founder</h2>
                    <hr />
                    <div className="founder-content">
                        <div className="founder-img">
                            <img src={Founder} alt="Founder Image" />
                        </div>

                        <div className="founder-text">
                            <h3>Priscillia Adegoke</h3>
                            <i>Founder & Barrister of the Supreme Court of Nigeria</i>
                            <p>
                                Our founder, Priscillia Adegoke, is a qualified barrister of the Supreme Court of Nigeria with a strong passion for excellence, integrity and attention to details.
                                With a background in law, Priscillia brings a unique perspective to the perfume business - one rooted in trust transparency, and ethical standards.
                            </p>

                            <p>
                                While practicing law, Priscillia identified a growing need for reliable access to authentic perfumes in Nigeria.
                                This inspired the creation of a fragrance store built on credibility, careful curation, and customer confidence.
                            </p>

                            <p>
                                Combining legal expertise with a love for fine fragrances, Priscillia ensures that every aspect of the business - from sourcing to custmer service - operates with professionalism, accountability, and respect for the customer.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}