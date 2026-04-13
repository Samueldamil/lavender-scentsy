import express from "express";
import { registerUser, loginUser, getUsers, deleteUser, updateUserRole, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id/role", updateUserRole);

export default router;