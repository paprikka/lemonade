import fs from 'fs';
import path from 'path';
export const GET = async ({ request }) => {
	// read all files in the current module dir using node fs module:

	const files = fs.readdirSync(path.resolve('./src/routes/test'));

	// get current absolute path:
	const __dirname = path.resolve();

	const data = {
		files,
		__dirname
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
};
