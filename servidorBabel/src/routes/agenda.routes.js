import {Router} from "express";
const router = Router();
import * as authJwt from "../middlewares/authJwt";
import * as agendaCtrl from "../controllers/agenda.controller";

router.get('/getByPsicologo/:idPsicologo', [authJwt.verifyToken], agendaCtrl.getByPsicologo)

export default router;
