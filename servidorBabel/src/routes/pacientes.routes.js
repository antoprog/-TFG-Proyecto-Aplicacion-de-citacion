import {Router} from "express";
import * as pacienteCtrl from '../controllers/pacientes.controller';
import {authJwt} from "../middlewares";

const router = Router();

router.get('/', pacienteCtrl.getPaciente)
router.get('/:psicologoId', pacienteCtrl.getPacienteById)
router.post('/', pacienteCtrl.createPaciente)
router.put('/:psicologoId', [authJwt.verifyToken], pacienteCtrl.updatePacienteById)
router.delete('/:psicologoId', [authJwt.verifyToken] ,pacienteCtrl.deletePacienteById)

export default router;