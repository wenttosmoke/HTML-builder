import { Console } from 'node:console';
import { open, close, writeFile, createReadStream, createWriteStream } from 'node:fs';

const writeStream = createWriteStream("./02-write-file/text.txt")
// const handleErrors = () => {
//     console.log("Error")
//     readStream.destroy()
//     writeStream.end("Finished with Error")
// }
console.log("Здравствуйте, введите содержимое файла!\n")
process.stdin.on("data", (chunk) => {
    const data = chunk.toString()
    if (data.match("exit")) {
        process.stdout.write("Ввод завершён!")
        process.exit()
    }
    writeStream.write(data)
})

process.on('SIGINT', function() {
    console.log("Ввод завершён!");
    process.exit()
});


