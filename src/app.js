const express = require("express");
const studentRoutes = require("./routes/student.routes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Register API Routes
app.use("/students", studentRoutes);


app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
}); 