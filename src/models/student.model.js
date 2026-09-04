let nextId = 1;

const students = [
  { id: nextId++, name: "Alice", course: "BSCS" },
  { id: nextId++, name: "Bob", course: "BSIT" },
  { id: nextId++, name: "Cara", course: "BSCS" }
];


module.exports = {
  getAll: () => students,
  
  create: (name, course) => {
    const newStudent = { id: nextId++, name, course };
    students.push(newStudent);
    return newStudent;
  },

  findById: (id) => students.find((s) => s.id === id),

  findIndexById: (id) => students.findIndex((s) => s.id === id),

  update: (index, name, course) => {
    const studentId = students[index].id;
    students[index] = { id: studentId, name, course };
    return students[index];
  },

  patch: (student, name, course) => {
    if (name !== undefined) student.name = name;
    if (course !== undefined) student.course = course;
    return student;
  },

  delete: (index) => {
    return students.splice(index, 1)[0];
  }
};