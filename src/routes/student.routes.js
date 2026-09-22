const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);

// Protected routes 
router.post('/', authMiddleware, studentController.addStudent);
router.patch('/:id', authMiddleware, studentController.updateStudent);
router.delete('/:id', authMiddleware, studentController.deleteStudent);

module.exports = router;