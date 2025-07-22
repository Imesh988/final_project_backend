const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
    {
        city: { type: String, required: true },
        address: { type: String, required: true },
    }
)

module.exports = mongoose.model('Location', LocationSchema);    