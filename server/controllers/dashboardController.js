import Order from "../models/Order.js";
import User from "../models/User.js"
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const deliveredOrders = await Order.find({ status: "delivered" });

        const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.total, 0);
        
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email");

        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select("-password");

        res.status(200).json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue,
            recentOrders,
            recentUsers
        });
    } catch(err) {
        res.status(500).json({ message: "Failed to fetch dashboard" });
    }
}