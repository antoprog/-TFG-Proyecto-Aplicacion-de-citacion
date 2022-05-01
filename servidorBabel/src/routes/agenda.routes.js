import {Router} from "express";
const router = Router();
import {authJwt} from '../middlewares'
import * as agendaCtrl from "../controllers/agenda.controller";

router.get('/getByPsicologo/:idPsicologo', [authJwt.verifyToken], agendaCtrl.getByPsicologo)

export default router;
