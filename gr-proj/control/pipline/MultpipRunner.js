var PiplineRunner = require("./pipline/PiplineRunner");

function controlPipLines(pipline){
    pipline.array.forEach(pip => {
        PiplineRunner.runPipline(pip.tb_arr,pip.root,function(root,err,report){
            console.log(root+"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"+err);
            console.log(report);
            console.log("&&&&&&&&&&&&&&&&&&&&&");
        });
        
    });
}

module.exports.controlPipLines = controlPipLines ;