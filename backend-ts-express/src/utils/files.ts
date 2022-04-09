export function stream2buffer(stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const _buf = [];

    stream.on('data', chunk => _buf.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(_buf)));
    stream.on('error', err => reject(err));
  });
}
