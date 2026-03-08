import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.json({
        success: false,
        message: "All fields required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hash,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error",
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      message: "User not found",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.json({
      success: false,
      message: "Wrong password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
    "SECRET123",
  );

  res.cookie("token", token);

  res.json({
    success: true,
  });
};

export const logout = (req, res) => {
  res.clearCookie("token");

  res.redirect("/signin");
};
