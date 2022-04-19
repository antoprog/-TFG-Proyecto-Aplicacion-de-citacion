import {Router} from "express";
const router = Router();
import * as authCtrl from '../controllers/auth.controller'
import {authJwt, verifySignup} from '../middlewares'

router.post('/signin', authCtrl.signIn);
router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);
router.get('/checkRole/admin', [authJwt.verifyToken, authJwt.isAdmin])
router.get('/checkRole/user', [authJwt.verifyToken, authJwt.isUser])
router.get('/checkRole/psicologo', [authJwt.verifyToken, authJwt.isPsicologo])

export default router;