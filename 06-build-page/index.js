import { mkdir, readdir, copyFile } from 'node:fs/promises'
import { createReadStream, createWriteStream, readFile } from 'node:fs'
import path from 'node:path'
const Folder = new URL('project-dist', import.meta.url);
const createDir = await mkdir(Folder, { recursive: true });
await copyDirectory('./06-build-page/assets','./06-build-page/project-dist/assets')
async function copyDirectory(src, dest) {
    mkdir(dest, { recursive: true })
    let files = await readdir(src, {withFileTypes: true})
    for(let file of files) {
        if (!path.extname(file['name'])) {
            copyDirectory(src + '/' + file['name'], dest + '/' + file['name'])
        }
        else {
            
            copyFile(src + '/' + file['name'], dest + '/' + file['name'])
        }
    }
    
}

const writeStream = createWriteStream("./06-build-page/project-dist/style.css")
const files = await readdir('./06-build-page/styles',{withFileTypes: true})
async function check(file) {
  readFile(`./06-build-page/styles/${file['name']}`, (err, data) => {
      
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


let fd
readFile("./06-build-page/template.html", (err, data) => {
    if(err) {throw err}
    
    fd = data.toString()
    
})

const html = await readdir("./06-build-page/components", {withFileTypes: true})

html.forEach((item, index)=> {
  if (path.extname(item['name'])==='.html') {
    readFile(`./06-build-page/components/${item['name']}`, (err, data) => {
      if (err) {throw err}
              
          fd = fd.replace(`{{${path.basename(item['name'], path.extname(item['name']))}}}`,data.toString())
    
          const stream = createWriteStream("./06-build-page/project-dist/index.html", {flags:'w+'})
          stream.write(fd, (err)=> {
            if (err) {throw err}
               
          })
          })
    }
    
})
