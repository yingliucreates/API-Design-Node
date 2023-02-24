import express from 'express';
import router from './router';
/*Morgan is an HTTP request level Middleware. It is a great tool that logs the requests along with some other information depending upon its configuration and the preset used. It proves to be very helpful while debugging and also if you want to create Log files.
 */
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();
//app.use() takes in a middleware;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//custom middleware; a function that returns a function;
const customLogger = middlewareName => (req, res, next) => {
	console.log(`hello from middleware ${middlewareName}`);
	next();
};

// app.use(customLogger('customLogger'));

/* catch asynchronous error
 ** explicitly tell express that there's an error by wrapping the error with next();
 ** so that it can trigger the error handler down there
 */
app.get('/', (req, res, next) => {
	// setTimeout(() => {
	// 	next(new Error('hello'));
	// }, 1);

	res.json({ message: 'hello' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

//synchronous error handling
app.use((err, req, res, next) => {
	if (err.type === 'auth') {
		res.status(401).json({ message: 'unauthorized' });
	} else if (err.type === 'input') {
		res.status(400).json({ message: 'invalid input' });
	} else {
		res.status(500).json({ message: 'oops thats on us' });
	}
});
export default app;
