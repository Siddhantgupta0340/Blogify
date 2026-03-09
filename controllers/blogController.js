import Blog from "../models/Blog.js";

// CREATE BLOG
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      image: `/uploads/${req.file.filename}`,
      author: req.user._id,
    });

    await blog.save();

    res.redirect("/home");
  } catch (err) {
    console.log(err);
    res.send("Error creating blog");
  }
};

// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name") // important
    .sort({ createdAt: -1 });

  res.render("home", { blogs });
};

// SINGLE BLOG PAGE
export const getSingleBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name");

  res.render("blog", { blog });
};
