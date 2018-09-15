fs = require('fs');
path = require('path');

function getFilesPath(dir,filespath){
    files  = fs.readdirSync(dir);
    filespath = filespath || [] ;

    files.forEach(file => {
        if(fs.statSync(path.join(dir,file)).isDirectory()){
            filespath = getFilesPath(path.join(dir,file),filespath);
        }
        else{
            filespath[file] = dir;
        }
        
    });
    return filespath;

};

module.exports.getFilesPath = getFilesPath ;