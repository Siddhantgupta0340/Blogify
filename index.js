import express from "express";
import cookieParser from "cookie-parser";
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

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/home", auth, (req, res) => {
  res.render("home");
});

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
