import Navbar from "../components/Navbar";
import { useNotification } from "../context/NotificationContext";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useFadeAnimations } from "../hooks/useFadeAnimation";
import Footer from "../components/Footer";

export default function Payment() {
    const [order, setOrder] = useState(null);
    const { notify } = useNotification();
    const { setCart } = useCart();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const fadeRef = useFadeAnimations([order]);

    useEffect(() => {
        const storedOrder = localStorage.getItem("checkout");

        if (storedOrder) {
            setOrder(JSON.parse(storedOrder));
        }
    }, []);

    const handlePayment = async () => {
        try {
            const orderData = {
                ...order,
                orderItems: order.orderItems.map(item => ({
                    product: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image?.url,
                    quantity: item.quantity,
                })),
                shippingInfo: order.shippingInfo,
                subtotal: order.subtotal,
                deliveryFee: order.deliveryFee,
                total: order.total,
            };
            const res = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) throw new Error();

            notify("Payment successful! Your order has been placed.", "success");

            setCart([]);

            localStorage.removeItem("checkout");

            setTimeout(() => {
                navigate("/");
            }, 3000)
        } catch(err) {
            notify("Payment failed. Try again", "error");
        }
    };

    if (!order) {
        return(
            <>
                <Navbar />
                <section className="payment-section">
                    <h1>Payment</h1>
                    <p>No order found.</p>
                </section>
            </>
        )
    }

    return(
        <div className="app">
            <Navbar />
            <section ref={fadeRef} className="content payment-section">
                <h1>Payment</h1>

                <div className="fade-up payment-box">
                    <h3>Order Summary</h3>

                    {order.orderItems.map((item) => (
                        <div className="pay-line" key={item._id}>
                            <span>{item.name} x {item.quantity}</span>
                            <span>&#8358;{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}

                    <div className="payment-border"></div>

                    <div className="pay-line">
                        <span>Subtotal</span>
                        <span>&#8358;{order.subtotal.toLocaleString()}</span>
                    </div>

                    <div className="pay-line">
                        <span>Delivery</span>
                        <span>&#8358;{order.deliveryFee.toLocaleString()}</span>
                    </div>

                    <div className="payment-border"></div>

                    <div className="pay-total">
                        <strong>Total</strong>
                        <strong>&#8358;{order.total.toLocaleString()}</strong>
                    </div>

                    <button className="pay-btn" onClick={handlePayment}>Pay Now</button>
                </div>
            </section>
            <Footer />
        </div>
    );
}