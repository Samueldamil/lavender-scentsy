import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { FaArrowRightLong, FaArrowDownLong, FaCircleArrowLeft, FaCircleArrowRight} from "react-icons/fa6"
import { FaAngleDoubleRight, FaStar, FaLeaf, FaShoppingBag } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { useFadeAnimations } from "../hooks/useFadeAnimation";
import ProductCard from "../components/ProductCard";

const testimonialsData = [
    {
        name: "- Sarah M.",
        text: "'Midnight Aura lasts all day! I get compliments everywhere i go.'",
    },
    {
        name: "- Daniel O.",
        text: "'Beautiful packaging and even better scent. My new favorite store!'",
    },
    {
        name: "- Michael S.",
        text: "'Fantastic service and fast delivery. Highly recommend!'",
    },
    {
        name: "- Aishat E.",
        text: "'Great customer service and premium scents.'"
    }
]
export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const timeoutRef = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL;

    const isReady = products.length > 0;
    const fadeRef = useFadeAnimations([isReady]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await fetch(`${API_URL}/products/featured`);
                const data = await res.json();

                setProducts(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    
    function resetTimer() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    function nextTestimonial() {
        setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }

    function prevTestimonial() {
        setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
    }

    useEffect(() => {
        resetTimer();

        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
        }, 5000);

        return () => resetTimer();
    }, [currentIndex]);

    return(
        <div className="app">
            <Navbar />
            <div className="content home" ref={fadeRef}>
                <section className="hero-section">
                    <div className="hero-text">
                        <h1 className="fade-right">Refreshing & Clean Scents Are Here</h1>
                        <p className="fade-left">Exclusively Available Online</p>
                        <Link to="/shop/unisex" className="fade-up">Shop Unisex</Link>
                    </div>

                    <div className="scroll-indicator">
                        <FaArrowDownLong className="arrow-bounce" />
                    </div>
                </section>

                <section className="categories-section fade-up">
                    <h2>Shop by Category</h2>
                    <hr />
                    <div className="categories-grid">
                        <Link className="category-link-1" to="/shop/unisex">
                            <div className="category-card">
                                <h3>Unisex <span className="category-arrow"><FaArrowRightLong /></span></h3>
                            </div>
                        </Link>
                        <Link className="category-link-2" to="/shop/men">
                            <div className="category-card">
                                <h3>Men <span className="category-arrow"><FaArrowRightLong /></span></h3>
                            </div>
                        </Link>
                        <Link className="category-link-3" to="/shop/women">
                            <div className="category-card">
                                <h3>Women <span className="category-arrow"><FaArrowRightLong /></span></h3>
                            </div>
                        </Link>
                        <Link className="category-link-4" to="/shop/kids">
                            <div className="category-card">
                                <h3>Kids <span className="category-arrow"><FaArrowRightLong /></span></h3>
                            </div>
                        </Link>
                    </div>
                </section>

                <section className="about-section fade-left">
                    <h2>Our Story</h2>
                    <hr />
                    <p>
                        At Lavender Scentsy, we believe a fragrance is far more than a pleasant aroma - it is a silent language, a memory waiting to happen, and a personal signature that speaks long before you do. What began as a small passion project has grown into a world of carefully crafted scents, each bottle telling a story of elegance, depth and emotion.
                    </p>
                    <p>
                        Our journey started with a simple mission: to bring premium quality fragrances within reach that not only smell luxurious but also feel meaningful. We offer perfumes from expert perfumers and source premium essential oils from around the globe to achieve balance, longevity, and unforgettable character. We understand that fragrance is personal, which is why each collection is designed to match different moods, personalities and moments - a scent that becomes a part of who you are...
                    </p>

                    <Link to="/about">Learn more <span className="double-right-icon"><FaAngleDoubleRight /></span></Link>
                </section>

                <section className=" fade-down home-products-section">
                    <h2>Featured Products</h2>
                    <hr />
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="home-products-grid">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </section>

                <section className="pride-section zoom-in">
                    <h2>Our Pride</h2>
                    <hr />
                    <p className="pride-description">We carefully curate the best perfumes from trusted brands and deliver a shopping experience built on trust, elegance and authenticity.</p>
                    <div className="pride-grid">
                        <div className="pride-card pride-1">
                            <FaStar className="pride-icon star-icon" />
                            <h3>Curated Quality</h3>
                            <p>We handpick top-tier fragrances from reputable brands and trusted global suppliers.</p>
                        </div>

                        <div className="pride-card pride-2">
                            <FaLeaf className="pride-icon leaf-icon" />
                            <h3>Fresh & Authentic</h3>
                            <p>Every bottle we sell is 100% original and stored under ideal condition.</p>
                        </div>

                        <div className="pride-card pride-3">
                            <FaShoppingBag className="pride-icon bag-icon" />
                            <h3>Luxury Shopping Experience</h3>
                            <p>We believe buying perfume should feel elegant. From careful packaging to attentive customer support, we ensure purchase feels premium from start to finish.</p>
                        </div>
                    </div>
                </section>

                <section className="cta-section fade-down">
                    <div className="cta-text">
                        <h2>Ready to Experience Luxury?</h2>
                        <Link to="/shop/unisex">Shop Now <FaArrowRightLong className="cta-arrow" /></Link>
                    </div>
                </section>

                <section className="testimonials-section fade-right">
                    <h2>What Customers Are Saying</h2>
                    <hr />
                    <div className="carousel">
                        <button className="carousel-btn left" onClick={prevTestimonial}><FaCircleArrowLeft /></button>
                        <div className="viewport">
                            <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {testimonialsData.map((item, i) => (
                                    <div className="slide" key={i}>
                                        <p>{item.text}</p>
                                        <h3>{item.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="carousel-btn right" onClick={nextTestimonial}><FaCircleArrowRight /></button>
                    </div>

                    <div className="testimonial-dots">
                        {testimonialsData.map((_, i) => (
                            <span key={i} className={`dot ${currentIndex === i ? "active" : ""}`} onClick={() => setCurrentIndex(i)}></span>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}