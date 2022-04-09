// import fetch from 'node-fetch';
import fs from 'fs';
import util from 'util';
const writeFileAsync = util.promisify(fs.writeFile);
import tinify from 'tinify';
tinify.key = 'mYG6xcsJ0WH7YYhY7Dy9k4zq0N2fjmww';

export async function optimizeAndSaveImage(buffer: Buffer, path: string): Promise<boolean> {
  try {
    const publicFolderPath = 'public/';
    const tinifyBuffer: Uint8Array = await tinify
      .fromBuffer(buffer)
      .resize({
        method: 'fit',
        width: 70,
        height: 70,
      })
      .toBuffer();

    await writeFileAsync(publicFolderPath + path, tinifyBuffer);
    console.log('file saved, path: ', publicFolderPath + path);
    return true;
  } catch (error) {
    return false;
  }
}
