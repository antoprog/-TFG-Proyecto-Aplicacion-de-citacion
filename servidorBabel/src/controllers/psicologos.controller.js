import Psicologo from '../models/Psicologo';
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const createPsicologo = async (req, res) => {
    const {username, nombre, apellido1, apellido2, tipo_doc,documento,titulacion,especialidad,credenciales_adic,
        num_colegiado,telefono,email,direccion} = req.body;
    const newPsicologo = new Psicologo({username, nombre, apellido1, apellido2, tipo_doc,documento,titulacion,especialidad,credenciales_adic,
        num_colegiado,telefono,email,direccion});
    const psicologoSaved = await newPsicologo.save();
    res.status(200).json(psicologoSaved);
}

export const getPsicologo = async (req, res) => {
    const psicologo = await Psicologo.find();
    res.json(psicologo);
}

export const getPsicologoById = async (req, res) => { // GET
    const token = req.headers["authorization"]
    if (!token) return res.status(403).json({message: 'No token'})

    const tokenString = token.split(' ')[1];
    const decoded = jwt.verify(tokenString, config.SECRET, null, null);

    const id = await User.findById(decoded.id)
    const psicologo = await Psicologo.findOne({username: id.username})
    console.log(psicologo);
    res.status(200).json(psicologo)
}
export const getPsicologoNombre = async (req, res) => { // GET
    const psicologo = await Psicologo.findOne({nombre: req.params.nombre});
    res.json(psicologo);
}
export const updatePsicologoById = async (req, res) => { // PUT
    const psicologo = await Psicologo.findOneAndUpdate({name:req.params.psicologoId}, req.body, {
        new: true
    });
    res.status(200).json(psicologo);

}

export const deletePsicologoById = async (req, res) => { // DELETE
    await Psicologo.findOneAndDelete({name:req.params.psicologoId});
    res.status(204).json();
}
