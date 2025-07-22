const { text, json } = require('body-parser');
const Employees = require('../model/Employees');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const create = async (req, res) => {
    try {
        const requiredFields = ['nic', 'username', 'password', 'full_name', 'tp', 'whathappNo', 'city'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                msg: 'Missing required fields',
                missingFields
            });
        }

        const employee = new Employees({
            nic: req.body.nic,
            username: req.body.username,
            password: req.body.password,
            full_name: req.body.full_name,
            tp: req.body.tp,
            whathappNo: req.body.whathappNo,
            city: req.body.city
        });

        const savedEmployee = await employee.save();
        res.status(201).json({
            msg: 'Employee created successfully',
            employee: savedEmployee
        });
    } catch (error) {
        console.error('Error creating employee:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({
                msg: 'Validation erro',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                msg: 'Duplicate key error',
                field: Object.keys(error.keyPattern)[0],
                value: error.keyValue[Object.keys(error.keyPattern)[0]]
            });
        }

        res.status(500).json({
            msg: 'Error creating employee',
            error: error.message
        });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employees.find();
        res.status(200).json({ 'msg': 'Employees Get All !!', employees });
    } catch (error) {
        res.status(500).json({ 'msg': error });
    }
}

const findOneById = async (req, res) => {
    try {
        const employee_id = req.params.employee_id;
        Employees.findByIdAndUpdate(employee_id, {
            nic: req.body.nic,
            username: req.body.username,
            password: req.body.password,
            full_name: req.body.full_name,
            tp: req.body.tp,
            whathappNo: req.body.whathappNo,
            city: req.body.city

        })
            .then((result) => { res.status(200).json({ 'msg': 'Employee updated successfully' }) })
            .catch((error) => { res.status(500).json({ 'msg': 'Error updating employee', error }) });
    } catch (error) {
        res.status(500).json({ 'msg': error });

    }
}

const deleteOneById = (req, res) => {
    try {
        const employee_id = req.params.employee_id;
        Employees.findByIdAndDelete(employee_id)
            .then((result) => { res.status(200).json({ 'msg': 'Employee deleted successfully' }) })
            .catch((error) => { res.status(500).json({ 'msg': 'Error deleting employee', error }) });
    } catch (error) {
        res.status(500).json({ 'msg': error });

    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 'msg': 'Username and password are required' });
    }
    try {
        const user = await Employees.findOne({ username });

        if (!user) {
            return res.status(400).json({ 'msg': 'Employee not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ 'msg': 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '2h'
        });

        res.status(200).json({
            msg: 'Login successful',
            token,
            user: { id: user._id, username: user.username }
        });


    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ 'error': 'Server error during login' });


    }
}




module.exports = { create, getAllEmployees, findOneById, deleteOneById, login };