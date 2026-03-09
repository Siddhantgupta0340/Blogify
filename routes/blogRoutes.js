import express from "express";
import multer from "multer";

import { createBlog, getSingleBlog } from "../controllers/blogController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// MULTER STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ADD BLOG PAGE
router.get("/add-blog", auth, (req, res) => {
  res.render("addBlog");
});

// CREATE BLOG
router.post("/add-blog", auth, upload.single("image"), createBlog);

// VIEW BLOG
router.get("/blog/:id", auth, getSingleBlog);

export default router;
