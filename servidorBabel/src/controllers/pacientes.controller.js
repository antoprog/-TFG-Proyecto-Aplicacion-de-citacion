import Paciente from '../models/Paciente';
import NombrePacientes from '../models/NombrePacientes';

export const createPaciente = async (req, res) => {
    console.log('createPaciente');
    try {

        const newPaciente = new Paciente(req.body)

        let letra;

        switch (newPaciente.aseguradora[0]) {
            case "C":
            case "c":
                letra = "C";
                break;
            case "J":
            case "j":
                letra = "J";
                break;
            default:
                letra = "P";
                break;
        }

        let historia = '';
        let buscar;

        do {
            const numero = Math.floor(Math.random() * (999999999 - 1)) + 1
            buscar = letra + numero
            historia = await Paciente.findOne({numero_historia: buscar})
        } while (historia)

        newPaciente.numero_historia = buscar
        console.log('NEW PACIENTE',newPaciente);
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
try{
    const paciente = await Paciente.find();
    res.json(paciente);
}catch (e) {
    console.log(e);
}
}

export const getPacienteById = async (req, res) => { // GET
    console.log('getPacienteById');
    try {
        const paciente = await Paciente.findById(req.params.pacienteId);
        res.json(paciente);
    } finally {
    }
}

export const getPacienteNombre = async (req, res) => { // GET
    console.log('getPacienteNombre');
    try { //const paciente = await Paciente.findOne({nombre: req.params.nombre}, {datosMedicos:1})
        const paciente = await Paciente.findOne({nombre: req.params.nombre})
        res.json(paciente);
    } catch (e) {
    }
}

export const updatePacienteById = async (req, res) => { // PUT
    try {
        console.log('updatePacienteById');
        console.log(req.params.pacienteId);
        const paciente = await Paciente.findOneAndUpdate({_id: req.params.pacienteId}, req.body, {
            new: true
        });
        res.status(200).json(paciente);
    } catch (e) {
    }
}

export const deletePacienteById = async (req, res) => { // DELETE
    try {
        console.log('deletePacienteById');
        await Paciente.findOneAndDelete({name: req.params.pacienteId});
        res.status(204).json();
    } catch (e) {
    }
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

        if (datos.fecha_diagnostico) {
            console.log('entra 1');
            await Paciente.updateOne(
                {_id: idPaciente,},
                {
                    $push:
                        {
                            "datosMedicos.valoracion": {
                                procedencia: datos.procedencia,
                                motivo_consulta: datos.con_motivo,
                                sintomas: datos.con_sintomas,
                                fecha_inicio: datos.fecha_inicio,
                                diagnostico_medico: {
                                    fecha_diagnostico: datos.fecha_diagnostico,
                                    patologia_medica: datos.patologia_medica,
                                    posologia: datos.posologia
                                }
                            }
                        }
                })
        }else{
            console.log('entra 2');
            await Paciente.updateOne(
                {_id: idPaciente,},
                {
                    $push:
                        {
                            "datosMedicos.valoracion": {
                                procedencia: datos.procedencia,
                                motivo_consulta: datos.con_motivo,
                                sintomas: datos.con_sintomas,
                                fecha_inicio: datos.fecha_inicio,
                            }
                        }
                })
        }
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
        const indiceValoracion = req.params.valoracion

        await Paciente.findByIdAndUpdate(
            {
                _id: idPaciente
            },
            {
                $set:
                    {
                        [`datosMedicos.valoracion.${indiceValoracion}.motivo_consulta`]: datos.con_motivo,
                        [`datosMedicos.valoracion.${indiceValoracion}.sintomas`]: datos.con_sintomas,
                        [`datosMedicos.valoracion.${indiceValoracion}.diagnostico_medico.fecha_diagnostico`]: datos.fecha_diagnostico,
                        [`datosMedicos.valoracion.${indiceValoracion}.diagnostico_medico.patologia_medica`]: datos.patologia_medica,
                        [`datosMedicos.valoracion.${indiceValoracion}.diagnostico_medico.posologia`]: datos.posologia
                    }
            })

        return res.status(200).json({message: 'Alta consulta realizada.'})

    } catch (e) {
        console.log(e);
    }
}

export const modificarAntecedentes = async (req, res) => {
    console.log('modificarAntecedentes');
    try {
        const idPaciente = req.params.pacienteId;
        const datos = req.body;

        await Paciente.findByIdAndUpdate({_id: idPaciente,},
            {
                $set:
                    {
                        "datosMedicos.antecedentes.familiares.observaciones": datos.ant_familiares,
                        "datosMedicos.antecedentes.personales.observaciones": datos.ant_personales,
                    }
            })

        return res.status(200).json({message: 'Antecedentes modificados'})

    } catch (e) {
        console.log(e);
    }
}

export const modificarPruebas = async (req, res) => {
    console.log('modificarPruebas');
    try {
        const idPaciente = req.params.pacienteId;
        const datos = req.body;

        await Paciente.updateOne(
            {
                _id: idPaciente,
                "datosMedicos.valoracion.test_Diagnosticos": datos.test_Diagnosticos
            },
            {
                $set:
                    {
                        "datosMedicos.valoracion.$.diagnostico_psicologico.diagnostico": datos.dco_psicologico,
                        "datosMedicos.valoracion.$.cognitivo": datos.prueba1,
                        "datosMedicos.valoracion.$.emocional": datos.prueba2,
                        "datosMedicos.valoracion.$.pruebasPsicodiagnostico": datos.prueba3
                    }
            })

        return res.status(200).json({message: 'Pruebas modificadas.'})

    } catch (e) {
        console.log(e);
    }
}
export const modificarSeguimiento = async (req, res) => {
    console.log('modificacionSeguimiento');
    try {
        const idPaciente = req.params.pacienteId;
        const datos = req.body;

        await Paciente.updateOne(
            {
                _id: idPaciente,
                "datosMedicos.valoracion": datos
                
            },
            {
                $set:
                    {
                        "datosMedicos.valoracion.$.seguimiento.observaciones": datos.seguimiento.observaciones,
                        "datosMedicos.valoracion.$.seguimiento": datos.con_sintomas,
                        "datosMedicos.valoracion.$.seguimiento.fecha_diagnostico": datos.fecha_diagnostico,
                        "datosMedicos.valoracion.$.diagnosseguimientotico_medico.patologia_medica": datos.patologia_medica,
                        "datosMedicos.valoracion.$.seguimiento.posologia": datos.posologia
                    }
            })

        return res.status(200).json({message: 'Alta consulta realizada.'})

    } catch (e) {
        console.log(e);
    }
}
