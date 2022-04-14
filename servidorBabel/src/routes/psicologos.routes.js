import {Router} from "express";
import * as psicologoCtrl from '../controllers/psicologos.controller';
import {authJwt} from "../middlewares";

const router = Router();

router.get('/', psicologoCtrl.getPsicologo)
router.get('/:psicologoId', psicologoCtrl.getPsicologoById)
router.post('/', psicologoCtrl.createPsicologo)
router.put('/:psicologoId', [authJwt.verifyToken], psicologoCtrl.updatePsicologoById)
router.delete('/:psicologoId', [authJwt.verifyToken] ,psicologoCtrl.deletePsicologoById)

export default router;