const mongoose = require('mongoose');

const DatosSchema = mongoose.Schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    direccion: [
        {
            calle:{
                type: String
            }
        }
    ],
    medicamentos: [
        {
            pastilla:{type:String},
            desayuno:{type:String},
            cena: {type:String}
        }
    ]
})

module.exports = mongoose.model('Formato', DatosSchema);