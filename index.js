import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { auth } from "./middlewares/auth.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

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

// ROUTES
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/signin");
});

app.get("/home", auth, (req, res) => {
  res.render("home");
});

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
