import jwt from "jsonwebtoken";

export const isloggedIn = (req, res, next) => {
  try {
    // console.log("Headers",req.headers);
    const token = req.headers.cookie?.split("token=")[1];
    // console.log("token", token);
    if (!token) {
      return res.status(401).json({
        message: "Access denied. Login Fist",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("User after decode", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};
