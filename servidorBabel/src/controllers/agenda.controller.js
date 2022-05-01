import AgendaSchema from '../models/Agenda'

export const getByPsicologo = async (req, res) => {
    try {
        const idPsicologo = req.params.idPsicologo;
        const agenda = await AgendaSchema.find()
        return res.status(200).json(agenda)
    }catch (e) {
        console.log('ERROR AGENDA - getByPsicologo', e);
    }
}
