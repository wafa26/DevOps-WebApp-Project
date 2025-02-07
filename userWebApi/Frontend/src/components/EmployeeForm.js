import React, { useState } from "react";
import "./EmployeeForm.css";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL + "/api/employees";

const EmployeeForm = ({ refreshEmployees }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",  
    placeOfBirth: "", 
    position: "",
    salary: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, formData); 
      refreshEmployees();

      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "", 
        placeOfBirth: "", 
        position: "",
        salary: "",
      });
    } catch (error) {
      console.error("❌ Error creating employee:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required />
      <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth required />
      <TextField label="Date of Birth" name="dateOfBirth" type="date" InputLabelProps={{ shrink: true }} value={formData.dateOfBirth} onChange={handleChange} fullWidth required />
      <TextField label="Place of Birth" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} fullWidth required />
      <TextField label="Position" name="position" value={formData.position} onChange={handleChange} fullWidth required />
      <TextField label="Salary" name="salary" type="number" value={formData.salary} onChange={handleChange} fullWidth required />
      <Button type="submit" variant="contained" color="primary" fullWidth> Add Employee </Button>
    </form>
  );
};

export default EmployeeForm;
