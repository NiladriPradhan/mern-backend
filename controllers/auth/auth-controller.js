import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../models/User.js";

// register
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const checkedUser = await User.findOne({ email });
        if (checkedUser) {
            return res.status(500).json({ success: false, message: "User already exists! please enter another email " })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User({
            username, email, password: hashedPassword
        })
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in register" });
    }

}
// login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const checkedUser = await User.findOne({ email });
        if (!checkedUser) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        const matchPassword = await bcrypt.compare(password, checkedUser.password);
        if (!matchPassword) {
            res.status(500).json({ success: false, message: "password incorrect!" });
        }
        const token = jwt.sign({
            id: checkedUser._id,
            email: checkedUser.email,
            role: checkedUser.role,
            userName: checkedUser.username
        }, process.env.JWT_SECRET, {
            expiresIn: "2h"
        })

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                email: checkedUser.email,
                role: checkedUser.role,
                id: checkedUser._id,
                userName: checkedUser.username
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Error in login" });
    }
}
// logout
export const logout = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "User logged out successfully"
    });
}

// auth midlleware
export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded user info (id, email, role)
        next(); // move to the next middleware or route handler
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token",
        });
    }
};




// export const authMiddleware = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token)
//       return res.status(401).json({ success: false, message: "Not authenticated" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");

//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     res.status(200).json({ success: true, user });
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };