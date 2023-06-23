import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

const getDirname = () => path.dirname(fileURLToPath(import.meta.url));

export const GET = async ({}) => {
	const filePath = fileURLToPath(import.meta.url);

	// get current absolute path:
	const __dirname = path.resolve();

	const data = {
		filePath,
		cwd: process.cwd(),
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
