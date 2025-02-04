import React, { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import "./app.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api/employees";

function App() {
    const [refresh, setRefresh] = useState(false);

    const refreshEmployees = async () => {
        await axios.get(API_URL);  
        setRefresh(!refresh);  
    };

    return (
        <div className="container">
            <h1>Employee Management</h1>
            <EmployeeForm refreshEmployees={refreshEmployees} />
            <EmployeeTable key={refresh} refreshEmployees={refreshEmployees} />
        </div>
    );
}

export default App;
