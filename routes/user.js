const { Router } = require("express");
const User = require("../models/user");

const router = Router();

// Render Pages
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

// 📝 Signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const newUser = await User.create({
      fullName,
      email,
      password,
    });

    console.log("✅ User Saved:", newUser);

    res.redirect("/");
  } catch (error) {
    console.log("❌ Signup Error:", error.message);
    res.send(error.message);
  }
});

// 🔐 Signin
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);

    console.log("✅ Logged in:", user);

    res.redirect("/");
  } catch (error) {
    console.log("❌ Login Error:", error.message);
    res.send(error.message);
  }
});

module.exports = router;
