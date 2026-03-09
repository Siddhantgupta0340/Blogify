import express from "express";
import Blog from "../models/Blog.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  const blogs = await Blog.find({ author: req.user.id });

  res.render("profile", { blogs });
});

export default router;
