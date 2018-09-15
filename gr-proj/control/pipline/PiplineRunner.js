var TestBlock = require("./testblock/TestBlockRunner");
var events = require('events');
var DBmanager = require("../../DB/DBManager");

function runPipline(pipline,root){
    var eventEmitter = new events.EventEmitter();

    pipline.test_blocks.forEach(test_block => {

        if(test_block.ID != root ){
            if(test_block.Parent != null){
                eventEmitter.on(test_block.Parent,function(){
                    runTest(test_block);
                });
            } 
        }
       else eventEmitter.on('root',function(){
                runTest(test_block);
       });
                
    });
    
    eventEmitter.emit('root');

    function runTest(test_block){
        
        TestBlock.runTestBlock(test_block,function(report){

            DBmanager.saveTestBlockReport(report, pipline.pro_id , pipline.commit_id);

            if(report.err == 0)
                eventEmitter.emit(report.id);
        });
    
    }
}

module.exports.runPipline = runPipline;
