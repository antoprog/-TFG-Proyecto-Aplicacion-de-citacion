import {Router} from "express";
import * as psicologoCtrl from '../controllers/psicologos.controller';
import {authJwt, verifySignup} from "../middlewares";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.get('/', psicologoCtrl.getPsicologo)
router.get('/uno', psicologoCtrl.getPsicologoByToken)
router.get('/byUser',psicologoCtrl.getPsicologoByUserName)
router.post('/altaDatos', psicologoCtrl.createPsicologo)
router.post('/', psicologoCtrl.createPsicologo)
router.put('/:psicologoId', [authJwt.verifyToken], psicologoCtrl.updatePsicologoById)
router.delete('/:psicologoId', [authJwt.verifyToken] ,psicologoCtrl.deletePsicologoById)

export default router;