const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EmployeesSchema = new mongoose.Schema(
    {
        nic: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        full_name: { type: String, required: true },
        tp: { type: Number, required: true },
        whathappNo: { type: Number, required: true },
        city: { type: String, required: true },
    },
    { timestamps: true }
);

EmployeesSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Employees', EmployeesSchema);