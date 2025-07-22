const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');

router.post('/create', locationController.create);
router.get('/getAll', locationController.getAllLocation);
router.put('/update/:location_id', locationController.findOneById);
router.delete('/delete/:location_id', locationController.deleteOneById);

module.exports = router;