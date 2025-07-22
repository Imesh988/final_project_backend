const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');

router.post('/create', customerController.create);
router.get('/getAll', customerController.getAllCustomers);
router.put('/update/:customer_id', customerController.findOneById);
router.delete('/delete/:customer_id', customerController.deleteOneById);
router.post('/login', customerController.login);

module.exports = router;