const express = require('express');
const app = express();
const connectBBDD = require('./db');
var bodyParser = require('body-parser');
const DatoSchema = require('./DatoSchema');
const NombreSchema = require('./Nombres');
var cors = require('cors')

app.listen(4343, () => {
    console.log("Servidor online.")
})

connectBBDD();

app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false})

app.post('/alta', jsonParser, function (req, res) {
    try {
        datos = new DatoSchema(req.body);
        datos.save();
        console.log("alta correcta")
        res.send({status: 'SUCCESS'});
    } catch (error) {
        console.log(error)
    }
})

app.get('/todos', async (req, res) => {
    try {
        const dat = await DatoSchema.find();
        res.json(dat)
    } catch (error) {
        console.log(error)
    }
})

app.get('/uno/:nr', async (req, res) => {
    try {
        const dat = await DatoSchema.findOne({"nombre": req.params.nr});
        // res.send(dat.medicamentos[0].pastilla)
        res.send(dat)
    } catch (error) {
        console.log(error)
    }
})

// Devuelve todas las ocurrencias donde encuentra el registro del parametro. Hay que convertirlo a UPPERCASE porque
// en bbdd está así además de utilizar REGEX para que no valide la cadena completa, sino ver si la contiene.
// Ejemplo:
// Parametro: AR // Resultado -> Alvaro, Carlos, Oscar, Eduardo...
app.get('/unos/:nombre', async (req, res) => {
    try {
        const dat = await NombreSchema.find({"name": new RegExp(req.params.nombre.toUpperCase())});
        res.send(dat)
    } catch (error) {
        console.log(error)
    }
})