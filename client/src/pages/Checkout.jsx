import { useCart } from "../context/CartContext";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNotification } from "../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useFadeAnimations } from "../hooks/useFadeAnimation";
import Footer from "../components/Footer";

export default function Checkout() {
    const { cart } = useCart();
    const { notify } = useNotification();
    const navigate = useNavigate();
    const fadeRef = useFadeAnimations();

    const [ form, setForm ] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        note: ""
    });

    const deliveryFee = 2000;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + deliveryFee;

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const orderData = {
            shippingInfo: form,
            orderItems: cart,
            subtotal,
            deliveryFee,
            total
        };
        console.log("Order: ", orderData);
        notify("Successfull!! Proceeding to payment.", "success");

        localStorage.setItem("checkout", JSON.stringify(orderData));
        navigate("/payment");
    }

    if (cart.length === 0) {
        return(
            <>
                <Navbar />
                <section className="checkout-section">
                    <h1>Checkout</h1>
                    <p>Your cart is empty</p>
                </section>
            </>
        );
    }

    return(
        <div className="app">
            <Navbar />
            <section ref={fadeRef} className="content checkout-section">
                <h1>Checkout</h1>

                <div className="checkout-grid">
                    <form onSubmit={handleSubmit} className="fade-left checkout-form">
                        <h3>Delivery Form</h3>

                        <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
                        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />
                        <input name="city" type="text" placeholder="City" onChange={handleChange} required />
                        <textarea name="address" placeholder="Delivery Address" onChange={handleChange} rows="5" required></textarea>
                        <textarea name="note" placeholder="Order Note (optional)" onChange={handleChange} rows="5"></textarea>

                        <button type="submit">Proceed to Payment</button>
                    </form>

                    <div className=" fade-right checkout-summary">
                        <h3>Your Order</h3>
                        {cart.map(item => (
                            <div key={item._id} className="summary-line">
                                <span>{item.name} x {item.quantity}</span>
                                <span>&#8358;{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}

                        <div className="summary-border"></div>

                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>&#8358;{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="summary-line">
                            <span>Delivery</span>
                            <span>&#8358;{deliveryFee.toLocaleString()} </span>
                        </div>

                        <div className="summary-border"></div>

                        <div className="summary-total">
                            <strong>Total</strong>
                            <strong>&#8358;{total.toLocaleString()}</strong>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}