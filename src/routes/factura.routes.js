import { Router, urlencoded } from 'express';
import { crearFactura } from '../controllers/factura.controller.js';

const router = Router();

router.use(urlencoded({ extended: true }));
router.post('/', crearFactura);

export default router;