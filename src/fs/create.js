// create.js - implement function that creates new file "fresh.txt"
// with content "I am fresh and young" inside of the files folder
// (if file already exists Error with message FS operation failed must be thrown)

import { open } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, 'files', 'fresh.txt');

  try {
    const file = await open(filePath, 'wx');
    await file.writeFile('I am fresh and young');
    await file.close();
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await create();
