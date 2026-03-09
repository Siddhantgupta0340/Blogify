import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import { connectDB } from "./config/db.js";

import Blog from "./models/Blog.js";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { auth } from "./middlewares/auth.js";

const app = express();

// CONNECT DATABASE
connectDB();

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// COOKIE PARSER
app.use(cookieParser());

// STATIC FILES (VERY IMPORTANT)
app.use(express.static("public"));

// VIEW ENGINE
app.set("view engine", "ejs");

// MAKE USER AVAILABLE IN ALL EJS FILES
app.use((req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, "SECRET123");

    res.locals.user = decoded;
  } catch (error) {
    res.locals.user = null;
  }

  next();
});

// ================= ROUTES =================

// Redirect root → home
app.get("/", (req, res) => {
  res.redirect("/home");
});

// AUTH PAGES
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

// LOGOUT
app.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.redirect("/signin");
});

// HOME PAGE (SHOW BLOGS)
app.get("/home", auth, async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");

    res.render("home", { blogs });
  } catch (error) {
    console.log(error);

    res.send("Error loading blogs");
  }
});

// API ROUTES
app.use("/api", authRoutes);
app.use("/", blogRoutes);
app.use("/", userRoutes);

// SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
