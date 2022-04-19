import {Router} from "express";
import * as psicologoCtrl from '../controllers/psicologos.controller';
import {authJwt, verifySignup} from "../middlewares";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.get('/', psicologoCtrl.getPsicologo)
router.get('/:psicologoId', psicologoCtrl.getPsicologoById)
router.post('/altaDatos', psicologoCtrl.createPsicologo)
router.post('/altaLogin', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp)
router.get('/uno/:nombre', psicologoCtrl.getPsicologoNombre)
router.post('/', psicologoCtrl.createPsicologo)
router.put('/:psicologoId', [authJwt.verifyToken], psicologoCtrl.updatePsicologoById)
router.delete('/:psicologoId', [authJwt.verifyToken] ,psicologoCtrl.deletePsicologoById)

export default router;