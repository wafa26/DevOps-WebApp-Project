const Employee = require('../models/employeeModel');
const redisClient = require('../config/redis');

//get all employees (with Redis caching)
exports.getEmployees = async (req, res) => {
    try {
        const cacheKey = 'employees';

        
        const cachedEmployees = await redisClient.get(cacheKey);

        if (cachedEmployees) {
            return res.json(JSON.parse(cachedEmployees));
        }

        //fetch from MongoDB if not in Redis
        const employees = await Employee.find();

        
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(employees));

        return res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();

        // Clear cache so the next fetch gets fresh data
        redisClient.del('employees');
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });

        // Clear cache so the next fetch gets fresh data
        redisClient.del('employees');
        res.json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);

        // Clear cache so the next fetch gets fresh data
        redisClient.del('employees');
        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
