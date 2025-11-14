import jwt from "jsonwebtoken";

export const isloggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. Please log in first.",
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
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};
