var builder = require("./autobuild/BuilderRunner");
var runner = require("./autorun/Runners");
var events = require('events');

function runTestBlock(test_bolck,fir_fun){
    var eventEmitter = new events.EventEmitter();
    
    var test_bolck_report = {id : test_bolck.ID , build_report : {} , run_report : {} , err : 0};
    
    builder.controleBuilding(test_bolck.BuildClasses,test_bolck.BEnv,function(b_report){
        test_bolck_report.build_report = b_report ;
        test_bolck_report.err += b_report.err ;
        if(test_bolck_report.err == 0){
            eventEmitter.emit('BuildSucess',test_bolck_report);
        }
        else {
            fir_fun(test_bolck.ID,test_bolck_report);
        }
    });

    eventEmitter.on('BuildSucess',function(report){
        run(test_bolck.RunClasses,test_bolck.REnv,report,fir_fun);
    });
    
}
function run(runclasses,env,report,fir_f){
    runner.controleRunning(runclasses,env,function(r_report){
        report.run_report = r_report ;
        fir_f(report);
        
    });
}

module.exports.runTestBlock = runTestBlock;




