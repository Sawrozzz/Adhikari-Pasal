import User from "../model/user-model.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { fullName, email, password, address, phone } = req.body;

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
    });
    await newUser.save(); // save the user info in database

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
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
