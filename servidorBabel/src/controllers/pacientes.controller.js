import Paciente from '../models/Paciente';
import NombrePacientes from '../models/NombrePacientes';

export const createPaciente = async (req, res) => {
    console.log('createPaciente');
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
    console.log('getPaciente');
    const paciente = await Paciente.find();
    res.json(paciente);
}

export const getPacienteById = async (req, res) => { // GET
    console.log('getPacienteById');
    const paciente = await Paciente.findById(req.params.pacienteId);
    res.json(paciente);
}

export const getPacienteNombre = async (req, res) => { // GET
    console.log('getPacienteNombre');
    //const paciente = await Paciente.findOne({nombre: req.params.nombre}, {datosMedicos:1})
    const paciente = await Paciente.findOne({nombre: req.params.nombre})
    res.json(paciente);
}

export const updatePacienteById = async (req, res) => { // PUT
    console.log('updatePacienteById');
    const paciente = await Paciente.findOneAndUpdate({name: req.params.pacienteId}, req.body, {
        new: true
    });
    res.status(200).json(paciente);
}

export const deletePacienteById = async (req, res) => { // DELETE
    console.log('deletePacienteById');
    await Paciente.findOneAndDelete({name: req.params.pacienteId});
    res.status(204).json();
}

export const getPacientesNombre = async (req, res) => {
    console.log('getPacientesNombre');
    try {
        const projection = {_id: 1, nomApe1Ape2: 1};
        const dato = await Paciente.find({nomApe1Ape2: new RegExp(req.params.nombre)}, projection);
        console.log(dato);
        res.send(dato)
    } catch (error) {
        console.log(error)
    }
}

export const altaConsultaPaciente = async (req, res) => {
    console.log('altaConsultaPaciente');
    try {
        const idPaciente = req.params.pacienteId;
        const datos = req.body;

        const user = await Paciente.updateOne(
            {_id: idPaciente,},
            {
                $push:
                    {
                        "datosMedicos.valoracion": {
                            procedencia: datos.procedencia,
                            motivo_consulta: datos.con_motivo,
                            sintomas: datos.con_sintomas,
                            diagnostico_medico: {
                                fecha_diagnostico: datos.fecha_diagnostico,
                                patologia_medica: datos.patologia_medica,
                                posologia: datos.posologia
                            }
                        }
                    }
            })

        return res.status(200).json({message: 'Alta consulta realizada.'})

    } catch (e) {
        console.log(e);
    }
}

export const modificacionConsulta = async (req, res) => {
    console.log('modificacionConsulta');
    try {
        const idPaciente = req.params.pacienteId;
        const datos = req.body;

        const user = await Paciente.updateOne(
            {
                _id: idPaciente,
                "datosMedicos.valoracion.procedencia": datos.procedencia
            },
            {
                $set:
                    {
                        "datosMedicos.valoracion.$.motivo_consulta": datos.con_motivo,
                        "datosMedicos.valoracion.$.sintomas": datos.con_sintomas,
                        "datosMedicos.valoracion.$.diagnostico_medico.fecha_diagnostico": datos.fecha_diagnostico,
                        "datosMedicos.valoracion.$.diagnostico_medico.patologia_medica": datos.patologia_medica,
                        "datosMedicos.valoracion.$.diagnostico_medico.posologia": datos.posologia
                    }
            })

        return res.status(200).json({message: 'Alta consulta realizada.'})

    } catch (e) {
        console.log(e);
    }
}