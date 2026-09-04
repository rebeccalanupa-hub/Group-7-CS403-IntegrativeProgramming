const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.getAllStudents);
router.post("/", studentController.createStudent);
router.put("/:id", studentController.updateStudent);
router.patch("/:id", studentController.patchStudent);
router.delete("/:id", studentController.deleteStudent);


module.exports = router;