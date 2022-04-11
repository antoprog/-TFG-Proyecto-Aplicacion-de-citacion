const express = require('express');
const app = express();
const connectBBDD = require('./db');
const bodyParser = require('body-parser');
const DatoSchema = require('./DatoSchema');
const nombreSchema = require('./nombreClientes');
const cors = require('cors')
const UsuarioRegistro = require('./usuario.js')
const btoa = require('btoa');

app.listen(4343, () => {
    console.log("Servidor online.")
})

connectBBDD();

app.use(cors());
app.use(express.json());

const jwt = require('jsonwebtoken');
const {verify} = require("jsonwebtoken");

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false})

app.post('/alta', jsonParser, function (req, res) {
    try {
        datos = new DatoSchema(req.body);
        datos.save();
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
        const dat = await nombreSchema.find({"name": new RegExp(req.params.nombre.toUpperCase())});
        res.send(dat)
    } catch (error) {
        console.log(error)
    }
})

app.post('/singup', jsonParser, async function (req, res) {
    try {
        const {user, pass} = req.body;
        const usuario = new UsuarioRegistro({user, pass});
        await usuario.save();

        const token = jwt.sign({_id: usuario._id}, 'claveSecreta');
        res.status(200).json({token})

    } catch (error) {
        console.log(error)
    }
})

app.post('/signin', async (req, res) => {
    const {user, pass} = req.body;
    const us = await UsuarioRegistro.findOne({user});

    console.log(user);

    if (!us) return res.status(401).send("El usuario no existe.");
    if (us.pass !== pass) res.status(401).send("Contraseña incorrecta.");

    const token = jwt.sign({_id: us._id}, 'claveSecreta', null, null);
    return res.status(200).json({token})
})

app.get('/usuarioPublico', verifyToken, (req,res) => {
    res.json([
        {
            _id: 1,
            name: 'Usuario publico',
            description: "area publica"
        }
    ])
})

app.get('/usuarioPrivado', verifyToken, (req,res) => {
    res.json([
        {
            _id: 1,
            name: 'Usuario privado',
            description: "area privada"
        }
    ])
})

function verifyToken(req, res, next){
    if (!req.headers.authorization){
        return res.status(401).send('No tienes autorización.');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === null){
        return res.status(401).send('Autorización no valida.');
    }

    let jwtData = token.split('.')[1]
    let decodedJwtJsonData = btoa(jwtData)
    console.log(decodedJwtJsonData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    let isAdmin = decodedJwtData.admin

    console.log('jwtData: ' + jwtData)
    console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
    console.log('decodedJwtData: ' + decodedJwtData)
    console.log('Is admin: ' + isAdmin)

    const payload = jwt.verify(token, "claveSecreta", null, null);
    req.userId = payload._id;
    next();
}