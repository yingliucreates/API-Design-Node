const fs = require('fs/promises');
const path = require('path');

const read = async () => {
	const res = fs.readFile(path.join(__dirname, 'package.json'), 'utf-8');
	return res;
};

read().then(f => console.log(f));
console.log('hi');
