import app from './server';
import * as dotenv from 'dotenv';
dotenv.config();

app.listen(3001, () => {
	console.log('listening on 3001');
});
