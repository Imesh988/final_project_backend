const { text, json } = require('body-parser');
const Location = require('../model/Location');

const create = async (req, res) => {
    try {
        const location = new Location({
            city: req.body.city,
            address: req.body.address
        });
        location.save()
            .then((result) => { res.status(200).json({ 'msg': 'Location created successfully' }) })
            .catch((error) => { res.status(500).json({ 'msg': 'Error creating location', error }) });
    } catch (error) {

        res.status(500).json({ 'msg': error });

    }
}

const getAllLocation = async (req, res) => {
    try {
        const location = await Location.find();
        res.status(200).json({ 'msg': 'Location Get All !!', location });
    } catch (error) {

        res.status(500).json({ 'msg': error });

    }
}

const findOneById = async (req, res) => {
    try {
        const location_id = req.params.location_id;
        Location.findByIdAndUpdate(location_id, {
            city: req.body.city,
            address: req.body.address
        })
            .then((result) => { res.status(200).json({ 'msg': 'Location updated successfully' }) })
            .catch((error) => { res.status(500).json({ 'msg': 'Error updating location', error }) });
    } catch (error) {


    }
}

const deleteOneById = async (req, res) => {
    try {
        const location_id = req.params.location_id;
        Location.findByIdAndDelete(location_id)
            .then((result) => { res.status(200).json({ 'msg': 'Location deleted successfully' }) })
            .catch((error) => { res.status(500).json({ 'msg': 'Error deleting location', error }) });
    } catch (error) {
        res.status(500).json({ 'msg': 'Error delete location', error });

    }
}

module.exports = { create, getAllLocation, findOneById, deleteOneById };