import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL + "/api/employees";

const EmployeeTable = ({ refreshEmployees }) => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    position: "",
    salary: "",
  });

  // Fetch Employees
  const fetchEmployees = async () => {
    const response = await axios.get(API_URL);
    setEmployees(response.data);
  };

  // Delete Employee
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchEmployees();
  };

  // Open Edit Dialog
  const handleEditClick = (employee) => {
    setEditData(employee);
    setOpen(true);
  };

  // Close Edit Dialog
  const handleClose = () => {
    setOpen(false);
    setEditData({
      _id: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      placeOfBirth: "",
      position: "",
      salary: "",
    });
  };

  // Update Employee
  const handleUpdate = async () => {
    await axios.put(`${API_URL}/${editData._id}`, editData);
    fetchEmployees();
    handleClose();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp._id}>
                <TableCell>{emp.firstName}</TableCell>
                <TableCell>{emp.lastName}</TableCell>
                <TableCell>{emp.position}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditClick(emp)}>Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(emp._id)} style={{ marginLeft: "10px" }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Employee Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <TextField label="First Name" name="firstName" value={editData.firstName} onChange={(e) => setEditData({ ...editData, firstName: e.target.value })} fullWidth required />
          <TextField label="Last Name" name="lastName" value={editData.lastName} onChange={(e) => setEditData({ ...editData, lastName: e.target.value })} fullWidth required />
          <TextField label="Date of Birth" name="dateOfBirth" type="date" InputLabelProps={{ shrink: true }} value={editData.dateOfBirth} onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })} fullWidth required />
          <TextField label="Place of Birth" name="placeOfBirth" value={editData.placeOfBirth} onChange={(e) => setEditData({ ...editData, placeOfBirth: e.target.value })} fullWidth required />
          <TextField label="Position" name="position" value={editData.position} onChange={(e) => setEditData({ ...editData, position: e.target.value })} fullWidth required />
          <TextField label="Salary" name="salary" type="number" value={editData.salary} onChange={(e) => setEditData({ ...editData, salary: e.target.value })} fullWidth required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeTable;
