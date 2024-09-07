const fs = require('fs');  //--fs module is a module in node js library that can use interect with the file systme
const path = require('path'); ////--path module is also a module in node js library that can use for handling the files and directory paths

const basename = path.basename(__filename);

//generating name,handler pairs

  module.exports = fs

.readdirSync(__dirname) //read the contents of the current directory
.filter((file)=> file !== basename) // filter out the current file
.map( (file)=> [path.basename(file,'.js'),
                 require(`./${file}`)]) ;  // map the each file to a handler