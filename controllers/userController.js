import Blog from "../models/Blog.js";

export const getProfile = async (req, res) => {
  const blogs = await Blog.find({ author: req.user.id });

  res.render("profile", { blogs });
};
