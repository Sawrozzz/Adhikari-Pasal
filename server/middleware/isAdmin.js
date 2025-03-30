import jwt from "jsonwebtoken";
import User from "../model/user-model.js";

export const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied . Login first",
      success: false,
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Access denied. Please log in first.",
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Only Admin can access this service",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
