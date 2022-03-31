const express = require('express');
const app = express();
const connectBBDD = require('./db');
const schema = require('./DatoSchema');
var bodyParser = require('body-parser');
const DatoSchema = require('./DatoSchema');

app.listen(4343, () => {
  console.log("Servidor online.")
})


connectBBDD();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/alta', jsonParser, function (req, res) {
  try {
    for (let index = 1; index < 50000; index++) {
      datos = new DatoSchema(req.body);
      req.body.nombre = index
      datos.save();
    }

    console.log("alta correcta")
    res.send({ status: 'SUCCESS' });
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
    const dat = await DatoSchema.findOne({ "nombre": req.params.nr });
   // res.send(dat.medicamentos[0].pastilla)
    res.send(dat)
  } catch (error) {
    console.log(error)
  }
})