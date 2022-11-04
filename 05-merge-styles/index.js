import { readdir} from 'node:fs/promises'
import { createReadStream, createWriteStream, readFile } from 'node:fs'
import path from 'node:path'
const writeStream = createWriteStream("./05-merge-styles/project-dist/bundle.css")
const files = await readdir('./05-merge-styles/styles',{withFileTypes: true})
async function check(file) {
  readFile(`./05-merge-styles/styles/${file['name']}`, (err, data) => {
      
    if (err) {throw err}
    else {
      writeStream.write(data, (err) => {
        if (err) {throw err}
      })
      
      
    }
  })
  
}
for(let file of files) {
  
  if (path.extname(file['name']) === '.css') {
    check(file)
    
  }

}




