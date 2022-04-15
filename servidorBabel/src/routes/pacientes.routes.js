import {Router} from "express";
import * as pacienteCtrl from '../controllers/pacientes.controller';
import {authJwt} from "../middlewares";

const router = Router();

router.get('/', pacienteCtrl.getPaciente)
router.get('/:psicologoId', pacienteCtrl.getPacienteById)
router.get('/uno/:nombre', pacienteCtrl.getPacienteNombre)
router.post('/', pacienteCtrl.createPaciente)
router.put('/:psicologoId', [authJwt.verifyToken], pacienteCtrl.updatePacienteById)
router.delete('/:psicologoId', [authJwt.verifyToken] ,pacienteCtrl.deletePacienteById)
router.get('/nombreNav/:nombre',pacienteCtrl.getPacientesNombre)

export default router;