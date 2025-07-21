const mongoose = require('mongoose');

const EmployeesSchema = new mongoose.Schema(
    {
        nic: {type: String, required: true},
        username: {type: String, required: true},
        full_name: {type: String, required: true},
        tp: {type: Number, required: true},
        whathappNo: {type: Number, required: true},
        city: {type: String, required: true},
    }
)

module.exports = mongoose.model('Employees', EmployeesSchema);