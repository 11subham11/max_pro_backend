// controllers/blogController.js
const db = require("../models");
const Blog = db.Blog;

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs", details: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog", details: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog", details: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    await blog.update(req.body);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog", details: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    await blog.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog", details: err.message });
  }
};
