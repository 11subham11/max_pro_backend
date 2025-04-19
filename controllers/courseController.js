// controllers/courseController.js
const db = require("../models");
const Course = db.Course;

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses", details: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course", details: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to create course", details: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    await course.update(req.body);
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: "Failed to update course", details: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    await course.destroy();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course", details: err.message });
  }
};
