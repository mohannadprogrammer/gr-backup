
var microPip = require('./configration_modules/microPipline');
//read Configration file
function readConfig(path , file_name , func){
    var fs = require('fs');
    fs.readFile(path + file_name,'utf8',function(err,data){
        if(err){
            console.log(err);
        }
        else{
            func(data)
        }
    });
}
function intilizePipData(data){
    var arr = data.split("\r\n");
    extractId(arr[0]);
}
function extractId(str){
    var id = str.substring(str.indexOf("=")+1);
    microPip.ID = id.trim() ;
    console.log(microPip.ID);
}
function extractBuildClasses(str){
    
}
readConfig('D:/nodeTest/configFile/','config.txt',intilizePipData);

