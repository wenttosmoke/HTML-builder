import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const url = './03-files-in-folder/secret-folder'

function handleError() {
   
throw Error('Unexpected error, incorrect directory')
}
async function checkDir(url) {
    let files
    try {
        files =  await readdir(url,{withFileTypes: true})
    }
    catch {
        handleError()
    }

    for (const file of files) {
        if (!file.isDirectory()) {
            console.log(
                path.basename(file['name'], path.extname(file['name'])), ' - ',
                !path.extname(file['name'])?"none":path.extname(file['name']).replace(".",""), ' - ',
                (await stat(path.join(url, file['name']))).size / 1024, ' kb'
            )
        }
        
    }
}
checkDir(url)

 
 
