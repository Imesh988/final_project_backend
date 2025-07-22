const { text, json } = require('body-parser');
const Customer = require('../model/Customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const create = async (req, res) => {
    try {
        const requiredFields = ['nic', 'username', 'full_name', 'password', 'tp', 'whathappNo', 'city'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                msg: 'Missing required fields',
                missingFields
            });
        }

        const customer = new Customer({
            nic: req.body.nic,
            username: req.body.username,
            full_name: req.body.full_name,
            password: req.body.password,
            tp: req.body.tp,
            whathappNo: req.body.whathappNo,
            city: req.body.city
        });

        const savedCustomer = await customer.save();
        res.status(201).json({
            msg: 'Customer created successfully',
            employee: savedCustomer
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        
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
            msg: 'Error creating customer',
            error: error.message 
        });
    }
};

const getAllCustomers = async (req,res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({'msg': 'Customer Get All !!', customers});
    } catch (error) {
        res.status(500).json({'msg': error});
    }
}

const findOneById = async (req,res) => {
    try {
        const customer_id = req.params.customer_id;
        Customer.findByIdAndUpdate(customer_id,{
            nic: req.body.nic,
            username: req.body.username,
            full_name: req.body.full_name,
             password: req.body.password,
            tp: req.body.tp,
            whathappNo: req.body.whathappNo,
            city: req.body.city
        
        })
        .then((result) => {res.status(200).json({'msg': 'Customer updated successfully'})})
        .catch((error) => {res.status(500).json({'msg': 'Error updating Customer', error})});
    } catch (error) {
        res.status(500).json({'msg': error});
        
    }
}

const deleteOneById = (req, res) => {
    try {
        const customer_id = req.params.customer_id;
        Customer.findByIdAndDelete(customer_id)
        .then((result) => {res.status(200).json({'msg': 'Customer deleted successfully'})})
        .catch((error) => {res.status(500).json({'msg': 'Error deleting customer', error})});
    } catch (error) {
        res.status(500).json({'msg': error});
        
    }
}

const login = async (req,res) => {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({'msg': 'Username and password are required'});
    }

    try {
        const customer = await Customer.findOne({username});

        if(!customer){
            return res.status(400).json({ 'msg': 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, customer.password);

        if(!isMatch){
            return res.status(400).json({ 'msg': 'Invalid credentials' });
        }

        const token = jwt.sign({id: customer._id}, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: '2h'
        });

        res.status(200).json({
            msg: 'Login successful',
            token,
            user: { id: customer._id, username: customer.username }
        });

    } catch (error) {
        console.log('Login error ', error);
        res.status(500).json({'error': 'Server error during login'});
        
        
    }
}

module.exports = { create, getAllCustomers, findOneById, deleteOneById, login };