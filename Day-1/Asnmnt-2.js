const fs = require('fs');
const path = require('path');

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];

switch (operation) {
  case 'read':
    file 
      ? fs.readFile(file, 'utf8', (err, data) => {
          err 
            ? console.error(`Error reading file '${file}': ${err.message}`)
            : console.log(data);
        })
      : console.log("Please specify a file to read.");
    break;

  case 'create':
    file 
      ? fs.writeFile(file, '', (err) => {
          err 
            ? console.error(`Error creating file '${file}': ${err.message}`)
            : console.log(`File '${file}' created`);
        })
      : console.log("Please specify a file to create.");
    break;

  case 'delete':
    file 
      ? fs.unlink(file, (err) => {
          err 
            ? console.error(`Error deleting file '${file}': ${err.message}`)
            : console.log(`File '${file}' deleted`);
        })
      : console.log("Please specify a file to delete.");
    break;

  case 'append':
    file && content
      ? fs.appendFile(file, `${content}\n`, (err) => {
          err 
            ? console.error(`Error appending to file '${file}': ${err.message}`)
            : console.log(`Content appended to the file '${file}'`);
        })
      : console.log("Please specify a file and content to append.");
    break;

  case 'rename':
    const newFileName = content;
    file && newFileName
      ? fs.rename(file, newFileName, (err) => {
          err 
            ? console.error(`Error renaming file '${file}': ${err.message}`)
            : console.log(`File '${file}' renamed to '${newFileName}'`);
        })
      : console.log("Please specify the file and new name for renaming.");
    break;

  case 'list':
    file 
      ? fs.readdir(file, (err, files) => {
          err 
            ? console.error(`Error listing directory '${file}': ${err.message}`)
            : files.forEach(f => console.log(f));
        })
      : console.log("Please specify a directory to list.");
    break;

  default:
    console.log(`Invalid operation '${operation}'`);
}



// Usage instructions
!operation && console.log(`Usage: node index.js <operation> <file> <content>
Supported operations:
  read    - Read the contents of a file
  create  - Create a new file
  delete  - Delete a file
  append  - Append content to a file
  rename  - Rename a file
  list    - List the contents of a directory
`);
