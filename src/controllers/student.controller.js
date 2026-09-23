const pool = require('../config/db'); // Import database connection pool

// GET ALL STUDENTS FROM DATABASE
exports.getAllStudents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET SINGLE STUDENT BY ID FROM DATABASE
exports.getStudentById = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const result = await pool.query('SELECT * FROM students WHERE id = $1', [studentId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// CREATE NEW STUDENT IN DATABASE
exports.createStudent = async (req, res) => {
    try {
        const { name, course } = req.body;
        if (!name || !course) {
            return res.status(400).json({ message: 'Name and course are required' });
        }

        const result = await pool.query(
            'INSERT INTO students (name, course) VALUES ($1, $2) RETURNING *',
            [name, course]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// FULL UPDATE STUDENT (PUT)
exports.updateStudent = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const { name, course } = req.body;

        const result = await pool.query(
            'UPDATE students SET name = $1, course = $2 WHERE id = $3 RETURNING *',
            [name, course, studentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PARTIAL UPDATE STUDENT (PATCH)
exports.patchStudent = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const { name, course } = req.body;

        // Fetch current student record
        const student = await pool.query('SELECT * FROM students WHERE id = $1', [studentId]);
        if (student.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Keep existing values if fields are missing in request body
        const updatedName = name || student.rows[0].name;
        const updatedCourse = course || student.rows[0].course;

        const result = await pool.query(
            'UPDATE students SET name = $1, course = $2 WHERE id = $3 RETURNING *',
            [updatedName, updatedCourse, studentId]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error patching student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE STUDENT FROM DATABASE
exports.deleteStudent = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id);
        const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [studentId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({
            message: 'Student deleted successfully',
            student: result.rows[0]
        });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};