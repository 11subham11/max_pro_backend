// controllers/homeController.js
const db = require("../models");
const CmsHomeSection = db.CmsHomeSection;
const path = require("path");

// GET /api/cms/home
exports.getHome = async (req, res) => {
  try {
    const sections = await CmsHomeSection.findAll();
    const result = {};
    sections.forEach((sec) => {
      result[sec.section] = sec.content;
    });
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch home content", details: err.message });
  }
};

// PUT /api/cms/home/:sectionName
exports.updateSection = async (req, res) => {
  const { sectionName } = req.params;
  const content = req.body;
  try {
    const [section, created] = await CmsHomeSection.findOrCreate({
      where: { section: sectionName },
      defaults: { content },
    });
    if (!created) {
      section.content = content;
      await section.save();
    }
    res.json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update section", details: err.message });
  }
};

// POST /api/cms/upload
exports.uploadImage = (req, res) => {
  console.log(req);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log(req.file);

  // Return the file URL as per requirements
  res.json({ url: `/Images/${req.file.filename}` });
};
