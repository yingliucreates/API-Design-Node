import jwt from 'jsonwebtoken';
export const createJWT = user => {
	const token = jwt.sign(
		{
			id: user.id,
			name: user.name
		},
		process.env.JWT_SECRET
	);
	return token;
};
