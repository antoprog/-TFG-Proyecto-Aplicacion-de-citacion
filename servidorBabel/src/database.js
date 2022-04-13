import mongoose from "mongoose";

mongoose.connect("mongodb+srv://edward:Andreige9497@cluster0.ettfr.mongodb.net/pruebaServidor")
    .then(db => console.log("Base de datos conectada"))
    .catch(error => console.log(error))