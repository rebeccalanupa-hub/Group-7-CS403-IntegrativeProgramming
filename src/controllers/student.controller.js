const StudentModel = require("../models/student.model");

exports.getAllStudents = (req, res) => {
  res.status(200).json(StudentModel.getAll());
};

exports.createStudent = (req, res) => {
  const { name, course } = req.body;
  const newStudent = StudentModel.create(name, course);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, course } = req.body;
  const index = StudentModel.findIndexById(studentId);

  if (index !== -1) {
    const updated = StudentModel.update(index, name, course);
    res.status(200).json(updated);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

exports.patchStudent = (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = StudentModel.findById(studentId);

  if (student) {
    const updated = StudentModel.patch(student, req.body.name, req.body.course);
    res.status(200).json(updated);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

exports.deleteStudent = (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = StudentModel.findIndexById(studentId);

  if (index !== -1) {
    const deletedStudent = StudentModel.delete(index);
    res.status(200).json({
      message: "Student deleted successfully",
      student: deletedStudent
    });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};