import { FaBoxOpen, FaShoppingCart, FaUsers, FaMoneyBillWave} from "react-icons/fa";
import SalesChart from "../components/SalesChart";
import CategorySalesChart from "../components/CategorySales";
import RecentOrders from "../components/RecentOrders";
import NewCustomers from "../components/NewCustomers";
import { useEffect, useState } from "react";
import { usePopUp } from "../context/PopUpContext";
import Loading from "../components/Loading";
import { useFadeAnimations } from "../hooks/useFadeAnimation";

export default function Dashboard() {
    const [stats, setStats] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const { notify } = usePopUp();

    const isReady = stats.length > 0;
    const fadeRef = useFadeAnimations([isReady]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard`);
                
                const data = await res.json();
                setStats(data);
            } catch(err) {
                notify("Failed to fetch dashboard", "error");
            }
        };

        fetchStats();
    }, []);

    if (!stats) return <Loading />;

    return(
        <div ref={fadeRef} className="dashboard">
            <h2>Overview</h2>

            <div className="zoom-in stats-grid">
                <div className="stat-card">
                    <FaBoxOpen className="stat-icon blue"/>
                    <div>
                        <h3>{stats.totalProducts}</h3>
                        <p>Total Products</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FaShoppingCart className="stat-icon green"/>
                    <div>
                        <h3>{stats.totalOrders}</h3>
                        <p>Total Orders</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FaUsers className="stat-icon purple"/>
                    <div>
                        <h3>{stats.totalUsers}</h3>
                        <p>Customers</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FaMoneyBillWave className="stat-icon orange"/>
                    <div>
                        <h3>&#8358;{stats.totalRevenue?.toLocaleString()}</h3>
                        <p>Revenue</p>
                    </div>
                </div>
            </div>

            <div className="fade-down dashboard-panels">
                <div className="chart-box">
                    <h3>Sales Overview</h3>
                    <SalesChart />
                </div>
                <div className="chart-box">
                    <h3>Category Sales Overview</h3>
                    <CategorySalesChart />
                </div>
            </div>

            <div className="fade-up dashboard-bottom">
                <RecentOrders orders={stats.recentOrders} />
                <NewCustomers users={stats.recentUsers} />
            </div>
        </div>
    );
}