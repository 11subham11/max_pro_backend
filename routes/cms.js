// routes/cms.js
const express = require("express");
const router = express.Router();

const productsRouter = require("./products");
const coursesRouter = require("./courses");
const blogsRouter = require("./blogs");

router.use("/products", productsRouter);
router.use("/courses", coursesRouter);
router.use("/blogs", blogsRouter);

module.exports = router;
