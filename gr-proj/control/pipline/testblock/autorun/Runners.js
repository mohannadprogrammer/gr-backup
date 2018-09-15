var events = require('events');
var run= require("./Runner");

function controleRunning(run_classes,runner,fir_fun){

    var eventEmitter = new events.EventEmitter();
    var run_report = {reports : [] , err : 0};

    run_classes.forEach(clas_d => {

        run.controleRunning(clas_d , runner ,function(report){

            run_report.reports.push(report);
            run_report.err = report.err ;

            if(run_report.reports.length == run_classes.length)
                eventEmitter.emit('finish',run_report);
        }); 
        
    });

    eventEmitter.on('finish',function(report){
        fir_fun(report);
    });  
}

module.exports.controleRunning = controleRunning ;

