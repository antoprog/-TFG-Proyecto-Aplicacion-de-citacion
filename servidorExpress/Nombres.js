const mongoose = require('mongoose');

const NombresSchema = mongoose.Schema({
    name: {
        type: String
    }
})

module.exports = mongoose.model('nombresClientes', NombresSchema);