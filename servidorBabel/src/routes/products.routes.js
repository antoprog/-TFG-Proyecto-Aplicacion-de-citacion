import {Router} from "express";
import * as productCtrl from '../controllers/products.controller';
import {authJwt} from "../middlewares";

const router = Router();

router.get('/', productCtrl.getProducts)
router.get('/:productId', productCtrl.getProductById)
router.post('/', [authJwt.verifyToken], productCtrl.createProduct)
router.put('/:productId', [authJwt.verifyToken], productCtrl.updateProductById)
router.delete('/:productId', [authJwt.verifyToken] ,productCtrl.deleteProductById)


export default router;