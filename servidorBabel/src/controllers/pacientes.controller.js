import Paciente from '../models/Paciente';

export const createPaciente = async (req, res) => {
    const {nombre, apellido1, apellido2, tipo_doc,documento,fecha_nacimiento,telefono,email,direccion,
        aseguradora,company,numero_historia,contacto,permiso_grabacion,firma_proteccion_datos,datosMedicos} = req.body;
    const newPaciente = new Paciente({nombre, apellido1, apellido2, tipo_doc,documento,fecha_nacimiento,telefono,email,direccion,
        aseguradora,company,numero_historia,contacto,permiso_grabacion,firma_proteccion_datos,datosMedicos});
    const pacienteSaved = await newPaciente.save();
    res.status(200).json(pacienteSaved);
}

export const getPaciente = async (req, res) => {
    const paciente = await Paciente.find();
    res.json(paciente);
}

export const getPacienteById = async (req, res) => { // GET
    const paciente = await Paciente.findOne({name:req.params.pacienteId});
    res.json(paciente);
}

export const updatePacienteById = async (req, res) => { // PUT
    const paciente = await Paciente.findOneAndUpdate({name:req.params.pacienteId}, req.body, {
        new: true
    });
    res.status(200).json(paciente);

}

export const deletePacienteById = async (req, res) => { // DELETE
    await Paciente.findOneAndDelete({name:req.params.pacienteId});
    res.status(204).json();
}
