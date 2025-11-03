import express from "express";
import { login, logout, register, verifyUser } from "../../controllers/auth/auth-controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyUser, async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});


// router.post("/logout", logout);

export default router;