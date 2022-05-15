import AgendaSchema from '../models/Agenda'
import Paciente from "../models/Paciente";

export const getByPsicologo = async (req, res) => {
    try {
        //const idPsicologo = req.params.idPsicologo;
        const agenda = await AgendaSchema.find()
        console.log(agenda);

        return res.status(200).json(agenda)
    }catch (e) {
        console.log('ERROR AGENDA - getByPsicologo', e);
    }
}

export const addCita = async (req, res) => {
    try {
        const cita = new AgendaSchema(req.body)
        if (!cita.color.primary){
            cita.color.primary = '#000000'
        }
        await cita.save()
        return res.status(200).json(cita)
    }catch (e) {
        console.log('ERROR AGENDA - altaCita', e);
    }
}

export const modificarCita = async (req, res) => {
    try {
        const datos = req.body
        const id = datos.id
        await AgendaSchema.findByIdAndUpdate(id, {
            title: datos.title,
            start: datos.start,
            end: datos.end,
            "color.primary": datos.color.primary
        })

        const cita = await AgendaSchema.findById(datos.id)

        return res.status(200).json(cita)
    }catch (e) {
        console.log('ERROR AGENDA - modificarCita', e);
    }
}

export const eliminarCita = async (req, res) => {
    try {
        const id = req.params.id
        await AgendaSchema.findByIdAndRemove(id)

        return res.status(200).json({message: 'Correcto'})
    }catch (e) {
        console.log('ERROR AGENDA - eliminarCita', e);
    }
}