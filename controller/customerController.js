const { text, json } = require('body-parser');
const Customer = require('../model/Customer');

const create = async (req, res) => {

    try {
        let customer = new Customer({
            nic: req.body.nic,
            username: req.body.username,
            full_name: req.body.full_name,
             password: req.body.password,
            tp: req.body.tp,
            whathappNo: req.body.whathappNo,
            city: req.body.city

        })
        customer.save()
            .then((result) => { res.status(200).json({ 'msg': 'Customer created successfully' }) })
            .catch((error) => { res.status(500).json({ 'msg': 'Error creating Customer', error }) });
    } catch (error) {
        res.status(500).json({ 'msg': error });

    }
}

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

module.exports = { create, getAllCustomers, findOneById, deleteOneById };