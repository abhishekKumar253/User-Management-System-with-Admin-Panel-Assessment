import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      message: "Signup successful!",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in logout controller" });
  }
};

export const updateProfile = async (req, res) => {
  const { name, bio, mobile, availabilityTime } = req.body;

  if (!name || !bio || !mobile || !availabilityTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        bio,
        mobile,
        availabilityTime,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
