var events = require('events');
var PiplineRunner = require("../pipline/PiplineRunner");
var DBmanager = require("../../DB/DBManager");
var TestBlock = require("../../model/TestBlock");
var ModelPahtWarper = require("./suports/model_path_warper");
var DirPath = require("./suports/DirFile");
var ReadPipConfig = require("./suports/readPipeConfig");
var PathModule = require('path');

var eventEmitter = new events.EventEmitter();


eventEmitter.on('repoFinish',function(commit_id,url,path){
    DBmanager.getProjet(url,function(project){
        
        let path_arr = DirPath.getFilesPath(path);
        let config_file_path = PathModule.join(path , project.config_file);

        ReadPipConfig.getPackageArray(config_file_path , function(root , pac_arr){
            DBmanager.getPipline(project.pro_id , root ,function(pipline){
                ModelPahtWarper.modelPathWarper(pipline.test_blocks , pac_arr , path_arr ,function(testblock_arr){

                    pipline.test_blocks = testblock_arr;
                    pipline.commit_id = commit_id ;
                   runPipline(pipline,root);
                });
            })
        });
    });

});


function runPipline(pipline,root){
    PiplineRunner.runPipline(pipline,root,function(report){
        //console.log(report.test_block_report[0]);
    });
}

function runCI(commit_id,url,path){
    eventEmitter.emit('repoFinish',commit_id,url,path);
}
module.exports.runCI = runCI ;

