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

app.get('/', (req, res) => {
	res.status(200);
	res.json({ message: 'hello from root' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

export default app;
