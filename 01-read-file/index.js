import { createReadStream} from 'node:fs';


const stream = createReadStream('./01-read-file/text.txt');

stream.on('data', function (chunk) {
  console.log(chunk.toString());
  stream.close(); 
  stream.push(null);
  stream.read(0);
});

