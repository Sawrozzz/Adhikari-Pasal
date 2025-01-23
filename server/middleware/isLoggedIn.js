import jwt from "jsonwebtoken";

export const isloggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("")[1];
    if (!token) {
      return res.status(401).json({
        message: "Access denied. Login Fist",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};
