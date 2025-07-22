const express = require('express');
const router = express.Router();
const EmployeesController = require('../controller/employeesController');

router.post('/create', EmployeesController.create);
router.get('/getAll', EmployeesController.getAllEmployees);
router.put('/update/:employee_id', EmployeesController.findOneById);
router.delete('/delete/:employee_id', EmployeesController.deleteOneById);
router.post('/login', EmployeesController.login);

module.exports = router;

