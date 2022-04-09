import { get } from 'http';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getIntFromRange(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + start) + start);
}
export function urlToBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const data: Uint8Array[] = [];
    get(url, res => {
      res
        .on('data', (chunk: Uint8Array) => {
          data.push(chunk);
        })
        .on('end', () => {
          resolve(Buffer.concat(data));
        })
        .on('error', err => {
          reject(err);
        });
    });
  });
}
