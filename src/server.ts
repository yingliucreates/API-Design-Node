import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';

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

export default app;
