// routes/home.js
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const { upload } = require("../controllers/imageController");

// GET all home content
router.get("/", homeController.getHome);

router.post("/upload", upload.single("file"), homeController.uploadImage);
// PUT update a section
router.put("/:sectionName", homeController.updateSection);

module.exports = router;
