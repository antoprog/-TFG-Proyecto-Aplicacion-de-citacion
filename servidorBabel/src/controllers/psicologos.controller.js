import Psicologo from '../models/Psicologo';
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const createPsicologo = async (req, res) => {
    console.log('ENTRA A CREAR PSICOLOGO');
    try {
        const newPsicologo = new Psicologo(req.body);
        const psicologoSaved = await newPsicologo.save();
        res.status(200).json(psicologoSaved);
    }catch (e) {
        res.status(300).json({message: 'ERROR AL CREAR EL PSICOLOGO'})
    }
}

export const getPsicologo = async (req, res) => {
    const psicologo = await Psicologo.find();
    res.json(psicologo);
}

export const getPsicologoByToken = async (req, res) => { // GET
    try {
        const token = req.headers["authorization"]
        if (!token) return res.status(403).json({message: 'No token'})

        const tokenString = token.split(' ')[1];
        const decoded = jwt.verify(tokenString, config.SECRET, null, null);

        const id = await User.findById(decoded.id)
        const psicologo = await Psicologo.findOne({username: id.username})
        console.log(psicologo);
        res.status(200).json(psicologo)
    }catch (e) {
        console.log(e);
    }
}

export const getPsicologoByUserName = async (req, res) => { // GET
    console.log(req.params.username);
    const psicologo = await Psicologo.findOne({username: req.params.username})
    console.log(psicologo);
    res.status(200).json(psicologo)
}
