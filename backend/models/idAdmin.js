const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    idAdmin:
    {
        type: [String],
        required: true,
    }
});

module.exports = mongoose.model('idAdmin', schema)