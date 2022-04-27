import Paciente from '../models/Paciente';
import NombrePacientes from '../models/NombrePacientes';

export const createPaciente = async (req, res) => {
    try {
        const newPaciente = new Paciente(req.body)
        const pacienteSaved = await newPaciente.save();

        const nombreConcat = req.body.nombre + ' ' + req.body.apellido1 + ' ' + req.body.apellido2
        const newNombre = new NombrePacientes({name: nombreConcat.toUpperCase()})
        await newNombre.save();
        res.status(200).json(pacienteSaved);
    } catch (e) {
        console.log(e);
    }
}

export const getPaciente = async (req, res) => {
    const paciente = await Paciente.find();
    res.json(paciente);
}

export const getPacienteById = async (req, res) => { // GET
    const paciente = await Paciente.findById(req.params.pacienteId);
    res.json(paciente);
}

export const getPacienteNombre = async (req, res) => { // GET
    //const paciente = await Paciente.findOne({nombre: req.params.nombre}, {datosMedicos:1})
    const paciente = await Paciente.findOne({nombre: req.params.nombre})
    res.json(paciente);
}

export const updatePacienteById = async (req, res) => { // PUT
    const paciente = await Paciente.findOneAndUpdate({name: req.params.pacienteId}, req.body, {
        new: true
    });
    res.status(200).json(paciente);

}

export const deletePacienteById = async (req, res) => { // DELETE
    await Paciente.findOneAndDelete({name: req.params.pacienteId});
    res.status(204).json();
}

export const getPacientesNombre = async (req, res) => {
    try {
        console.log(req.params.nombre);
        const projection = {_id: 1, nomApe1Ape2: 1};
        const dato = await Paciente.find({nomApe1Ape2 : new RegExp(req.params.nombre)}, projection);
        console.log(dato);
        res.send(dato)
    } catch (error) {
        console.log(error)
    }
}