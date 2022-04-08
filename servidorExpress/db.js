const mongoose = require('mongoose');

const connectBBDD = async () => {
    try {
        mongoose.connect('mongodb+srv://edward:Andreige9497@cluster0.ettfr.mongodb.net/tfg')
        console.log("BBDD conectada");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectBBDD;