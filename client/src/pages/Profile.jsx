import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import { useNotification } from "../context/NotificationContext";
import DefaultImg from "../assets/default-user-img.jpeg";
import Navbar from "../components/Navbar";
import { useFadeAnimations } from "../hooks/useFadeAnimation";
import Footer from "../components/Footer";

export default function Profile() {
    const { token, logout } = useAuth();
    const { notify } = useNotification();

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [user, setUser] = useState([]);

    const isReady = user.length > 0;
    const userFadeRef = useFadeAnimations([isReady]);
    const orderFadeRef = useFadeAnimations([orders])

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!token) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(token);

                if (res.status === 401) {
                    notify("Your account has been deleted.", "error")
                    logout();
                    return;
                }

                const data = await res.json();
                setUser(data);
            } catch (error) {
                notify("Failed to load profile", "error");
            }
        };

        fetchProfile();
    }, [token, logout]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${API_URL}/orders/my-orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                console.log("Order Data: ", data);

                setOrders(data.orders || data);
            } catch (error) {
                notify("Failed to load orders", "error");
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, [token])

    if (!user) return <Loading />

    return (
        <div className="app">
            <Navbar />
            <div ref={userFadeRef} className="content user-profile-page">
                <div className="fade-up user-profile-card">
                    <h2>Profile</h2>

                    <div className="user-avatar-container">
                        <img
                            src={DefaultImg}
                            alt="User Avatar"
                            className="user-profile-avatar"
                        />
                    </div>

                    <h3 className="user-profile-name">{user?.name}</h3>
                    <p className="user-profile-email">{user?.email}</p>

                    <div className="user-profile-info">
                        <p>
                            <span>User ID: </span>
                            {user._id?.slice(0, 8)}
                        </p>
                        <p>
                            <span>Role: </span>
                            {user?.role}
                        </p>
                    </div>
                </div>
            </div>

            <div ref={orderFadeRef} className="content profile-orders">
                <h3>Order History</h3>

                {loadingOrders ? (
                    <Loading />
                ) : orders.length === 0 ? (
                    <p> No orders found</p>
                ) : (
                    orders.map(order => (
                        <div key={order._id} className="fade-left order-card-history">
                            <div className="order-top">
                                <p>
                                    <strong>Order ID: </strong>
                                    {order._id.slice(-6)}
                                </p>
                                <span className={`status ${order.status}`}>{order.status}</span>
                            </div>

                            <div className="order-items-preview">
                                {order.orderItems.slice(0, 3).map(item => (
                                    <img key={item.product} src={item.image} alt={item.name} />
                                ))}
                            </div>

                            <div className="order-bottom">
                                <p>Total: &#8358;{order.total.toLocaleString()}</p>
                                <p>
                                    <strong>Date: </strong>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Items: </strong>
                                    {order.orderItems.length}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    )
}