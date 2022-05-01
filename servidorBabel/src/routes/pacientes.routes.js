import {Router} from "express";
import * as pacienteCtrl from '../controllers/pacientes.controller';
import {authJwt} from "../middlewares";

const router = Router();

router.get('/', pacienteCtrl.getPaciente)
router.get('/:pacienteId', pacienteCtrl.getPacienteById)
router.post('/', pacienteCtrl.createPaciente)
router.put('/actualizarPaciente/:pacienteId', [authJwt.verifyToken], pacienteCtrl.updatePacienteById)
router.delete('/:pacienteId', [authJwt.verifyToken] ,pacienteCtrl.deletePacienteById)
router.get('/nombreNav/:nombre',pacienteCtrl.getPacientesNombre)
router.put('/altaConsulta/:pacienteId', [authJwt.verifyToken], pacienteCtrl.altaConsultaPaciente)
router.put('/modificacionConsulta/:pacienteId', [authJwt.verifyToken], pacienteCtrl.modificacionConsulta)
export default router;
