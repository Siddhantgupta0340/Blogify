const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");

const app = express();
const PORT = 8000;

// 🔥 MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server Started at PORT: ${PORT}`));
