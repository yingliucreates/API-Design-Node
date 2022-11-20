import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = password => {
	const salt = 5;
	return bcrypt.hash(password, salt);
};

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

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;
	if (!bearer) {
		res.status(401);
		res.json({ message: 'not authorized' });
		return;
	}

	const [_, token] = bearer.split(' ');
	if (!token) {
		res.status(401);
		res.json({ message: 'not valid token' });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JTW_SECRET);
		req.user = user;
		next();
	} catch (e) {
		console.error(e.message);
		res.status(401);
		res.json({ message: 'not valid token' });
	}
};
