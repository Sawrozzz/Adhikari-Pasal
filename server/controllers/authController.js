import User from "../model/user-model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//code for register user
export const register = async (req, res) => {
  const { fullName, email, password, address, phone, role } = req.body;

  if (role === "ADMIN") {
    const existingAdmin = await User.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      return res.status(400).json({
        message: "An ADMIN already exists",
        success: false,
      });
    }
  }

  try {
    if (!fullName || !email || !password || !address || !phone) {
      return res.status(403).json({
        message: "Every field should be filled",
        success: false,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    //Now create new user with hased password

    const newUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      address,
      phone,
      role: role || "NORMAL",
    });
    await newUser.save(); // save the user info in database

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRECT,
      {
        expiresIn: "3h",
      }
    );
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      userData: newUser,
      token,
    });
  } catch (error) {
    console.log("Error occured", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//code for login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRECT,
      { expiresIn: "3h" }
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      userData: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error while login", error.message);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//code for logout user
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.log("Error during logout", error.message);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//code for getting all users (except, the admin)
export const allUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "ADMIN" } }); // $ne means "not equal"
    if (!users.length) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: users, // Send the users data in the response
    });
  } catch (error) {
    console.log("Error during getting Users", error.message);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
