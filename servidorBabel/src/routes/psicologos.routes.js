import {Router} from "express";
import * as psicologoCtrl from '../controllers/psicologos.controller';
import {authJwt, verifySignup} from "../middlewares";
import * as authCtrl from "../controllers/auth.controller";

const router = Router();

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], psicologoCtrl.getPsicologo)
router.get('/uno', [authJwt.verifyToken, authJwt.isAdmin], psicologoCtrl.getPsicologoByToken)
router.get('/byUser/:username', [authJwt.verifyToken, authJwt.isAdmin], psicologoCtrl.getPsicologoByUserName)
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], psicologoCtrl.createPsicologo)

export default router;
