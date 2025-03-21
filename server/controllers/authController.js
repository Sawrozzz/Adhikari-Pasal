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
      process.env.JWT_SECRET,
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
      process.env.JWT_SECRET,
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
        picture:user.picture,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//code for logout user
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
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
    const userCount = users.length;

    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: users, // Send the users data in the response
      userCount: userCount,
    });
  } catch (error) {
    console.log("Error during getting Users", error.message);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//code for all users
export const all = async (req, res) => {
  try {
    const users = await User.find(); // $ne means "not equal"
    if (!users.length) {
      return res.status(404).json({
        message: "No users found",
        success: false,
      });
    }
    const userCount = users.length;

    res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: users, // Send the users data in the response
      userCount: userCount,
    });
  } catch (error) {
    console.log("Error during getting Users", error.message);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

//code for getting a single user, basically for loggedIn user, but its not in work for now
export const profile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
   

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.json(user);
  } catch (error) {
    console.log("Error during getting Users", error.message);
    res.status(500).json({
      message: "Error while fetching profile",
      success: false,
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(req.user);
    console.log("Clicked");

    const user = await User.findById(userId);
    console.log(user);
    // console.log("Ckicked algain");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    
    if (!req.file || !req.file.path) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }
    user.picture = req.file.path;
    await user.save();

    return res.status(200).json({
      message: "Profile picture upload successfull",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Upload profile image fail",
      success: false,
    });
  }
};
