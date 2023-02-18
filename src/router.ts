import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
	getProducts,
	getOneProduct,
	createProduct,
	deleteProduct,
	updateProduct
} from './handlers/product';
import { handleInputErrors } from './modules/middleware';
const router = Router();

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);

router.put(
	'/product/:id',
	body('name').isString(),
	handleInputErrors,
	updateProduct
);
router.post(
	'/product',
	body('name').isString(),
	handleInputErrors,
	createProduct
);
router.delete('/product/:id', deleteProduct);

router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put(
	'/update/:id',
	body('title').optional(),
	body('body').optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional(),
	(req, res) => {}
);
router.post(
	'/update',
	body('title').exists().isString(),
	body('body').exists().isString(),
	body('productId').exists().isString(),
	() => {}
);
router.delete('/update/:id', () => {});

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put(
	'/updatepoint/:id',
	body('name').optional().isString(),
	body('description').optional().isString(),
	() => {}
);
router.post(
	'/updatepoint',
	body('name').isString(),
	body('description').isString(),
	body('updateId').exists().isString(),
	() => {}
);
router.delete('/updatepoint/:id', () => {});

export default router;
