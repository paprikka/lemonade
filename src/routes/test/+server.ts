import fs from 'fs';
import path from 'path';

export const GET = async ({}) => {
	// get the current file path:
	const __filename = path.resolve(import.meta.url);

	// read all files in the folder of __filename using node fs module:

	const filesHere = fs.readdirSync(path.dirname(__filename));

	// const files = fs.readdirSync(path.resolve('./src/routes/test'));

	// get current absolute path:
	const __dirname = path.resolve();

	const data = {
		filesHere,
		__filename,
		__dirname
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
};
