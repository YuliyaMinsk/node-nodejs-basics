// copy.js - implement function that copies folder files files
// with all its content into folder files_copy at the same level
// (if files folder doesn't exists or files_copy has already been created Error
// with message FS operation failed must be thrown)

import { cp, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const src = path.join(__dirname, 'files');
  const dest = path.join(__dirname, 'files_copy');

  try {
    const isSrcExists = await checkExistence(src);
    const isDestExists = await checkExistence(dest);

    if (!isSrcExists || isDestExists) {
      throw new Error('FS operation failed');
    }

    await cp(src, dest, { recursive: true });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

async function checkExistence(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

await copy();
