import {Router} from "express";
const router = Router();
import * as authCtrl from '../controllers/auth.controller'
import * as authJwt from "../middlewares/authJwt";
import * as verifySignup from "../middlewares/verifySignup";

router.post('/signin', authCtrl.signIn);
router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);
router.get('/getRoles', [authJwt.verifyToken], authJwt.getRoles)
router.put('/changePassword', [authJwt.verifyToken], authCtrl.changePassword)
export default router;