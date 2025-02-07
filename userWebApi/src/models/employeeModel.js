const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  placeOfBirth: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
