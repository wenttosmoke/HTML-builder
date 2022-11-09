import { mkdir, copyFile, constants,  readdir, cp } from 'node:fs/promises';
import { lstat } from 'node:fs';
import path from 'node:path';
const Folder = new URL('files-copy', import.meta.url);
const createDir = await mkdir(Folder, { recursive: true });
const files = await readdir("./04-copy-directory/files", {withFileTypes: true})
copyDirectory('./04-copy-directory/files','./04-copy-directory/files-copy')
async function copyDirectory(src, dest) {
    mkdir(dest, { recursive: true })
    let files = await readdir(src, {withFileTypes: true})
    for(let file of files) {
        
        lstat(path.join(src, file['name']), (err, stats) => {

            if(err)
                return console.log(err); //Handle error
        
            if (stats.isFile()) {
                copyFile(path.join(src, file['name']), path.join(dest, file['name'])) 
            }
            else {
                copyDirectory(path.join(src, file['name']), path.join(dest, file['name']))
            } 
        }); 
    }
}
