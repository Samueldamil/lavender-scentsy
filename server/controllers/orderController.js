import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingInfo,
            subtotal,
            deliveryFee,
            total
        } = req.body;

        const order = await Order.create({
            user: req.user._id,
            orderItems,
            shippingInfo,
            subtotal,
            deliveryFee,
            total
        });

        console.log("USER:", req.user);
        console.log("BODY:", req.body)
        res.status(201).json(order);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Not Authorized" });
        }
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders." });
    }
};

export const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch order" });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        order.status = req.body.status;

        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to update order." });
    }
};