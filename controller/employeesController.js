const {text, json} = require('body-parser');
const Employees = require('../model/Employees');

const create = async (req,res) => {
    try {
        let employee = new Employees({
            nic: req.body.nic,
            username: req.body.username,
            full_name: req.body.full_name,
            tp: req.body.tp,
            whathappNo: req.body.whathappNo,
            city: req.body.city

        })
        employee.save()
        .then((result)=>{res.status(200).json({'msg':'Employee created successfully'})})
        .catch((error)=>{res.status(500).json({'msg':'Error creating employee', error})});
    } catch (error) {
        res.status(500).json({'msg': error});
        
    }
}

const getAllEmployees = async (req,res) => {
    try {
        const employees = await Employees.find();
        res.status(200).json({'msg': 'Employyess Get All !!', employees});
    } catch (error) {
        res.status(500).json({'msg': error});
    }
}

const findOneById = async (req,res) => {
    try {
        const employee_id = req.params.employee_id;
        Employees.findByIdAndUpdate(employee_id,{
            nic: req.body.nic,
            username: req.body.username,
            full_name: req.body.full_name,
            tp: req.body.tp,
            whathappNo: req.body.whathappNo,
            city: req.body.city
        
        })
        .then((result) => {res.status(200).json({'msg': 'Employee updated successfully'})})
        .catch((error) => {res.status(500).json({'msg': 'Error updating employee', error})});
    } catch (error) {
        res.status(500).json({'msg': error});
        
    }
}

const deleteOneById = (req, res) => {
    try {
        const employee_id = req.params.employee_id;
        Employees.findByIdAndDelete(employee_id)
        .then((result) => {res.status(200).json({'msg': 'Employee deleted successfully'})})
        .catch((error) => {res.status(500).json({'msg': 'Error deleting employee', error})});
    } catch (error) {
        res.status(500).json({'msg': error});
        
    }
}

module.exports = { create, getAllEmployees, findOneById, deleteOneById };