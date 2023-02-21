import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import {
	getProducts,
	getOneProduct,
	createProduct,
	deleteProduct,
	updateProduct
} from './handlers/product';
import {
	createUpdate,
	deleteUpdate,
	getOneUpdate,
	getUpdates,
	updateUpdate
} from './handlers/update';
import { handleInputErrors } from './modules/middleware';
const router = Router();

//products
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

//updates
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
	'/update/:id',
	body('title').optional(),
	body('body').optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').optional(),
	updateUpdate
);
router.post(
	'/update',
	body('title').exists().isString(),
	body('body').exists().isString(),
	body('productId').exists().isString(),
	createUpdate
);
router.delete('/update/:id', deleteUpdate);

//updatePoints
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

router.use((err, req, res, next) => {
	if (err.type === 'auth') {
		res.status(401).json({ message: 'unauthorized-routerHandler' });
	} else if (err.type === 'input') {
		res.status(400).json({ message: 'invalid input-routerHandler' });
	} else {
		res.status(500).json({ message: 'oops thats on us-routerHandler' });
	}
});
export default router;
