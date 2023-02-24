setTimeout(() => {
	throw new Error('oops');
}, 300);

process.on('uncaughtException', () => {});
//async
process.on('unhandledRejection', () => {});
