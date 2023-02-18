import prisma from '../db';

//get all
export const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		include: {
			products: true
		}
	});

	res.json({ data: user.products });
};

//get one

export const getOneProduct = async (req, res) => {
	const id = req.params.id;

	const product = await prisma.product.findFirst({
		where: {
			id,
			belongsToId: req.user.id
		}
	});

	res.json({ data: product });
};
//create one

export const createProduct = async (req, res) => {
	const product = await prisma.product.create({
		data: {
			name: req.body.name,
			belongsToId: req.user.id
		}
	});

	res.json({ data: product });
};

export const updateProduct = async (req, res) => {
	const updated = await prisma.product.update({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		},
		data: {
			name: req.body.name
		}
	});

	res.json({ data: updated });
};

export const deleteProduct = async (req, res) => {
	const id = req.params.id;
	/*
	 delete is findUnique
	 so instead of @@index in the schema, the directive should be @@unique
	 once changed, run migration
	 */
	const deleted = await prisma.product.delete({
		where: {
			id_belongsToId: {
				id: req.params.id,
				belongsToId: req.user.id
			}
		}
	});
	res.json({ data: deleted });
};
