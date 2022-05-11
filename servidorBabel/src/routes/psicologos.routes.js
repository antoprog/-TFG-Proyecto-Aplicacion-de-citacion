import {Router} from "express";
import * as psicologoCtrl from '../controllers/psicologos.controller';
import * as authJwt from "../middlewares/authJwt";

const router = Router();

router.get('/', [authJwt.verifyToken, authJwt.isAdmin], psicologoCtrl.getPsicologo)
router.get('/uno', [authJwt.verifyToken], psicologoCtrl.getPsicologoByToken)
router.get('/byUser/:username', [authJwt.verifyToken], psicologoCtrl.getPsicologoByUserName)
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], psicologoCtrl.createPsicologo)

export default router;
