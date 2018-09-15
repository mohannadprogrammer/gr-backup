var events = require('events');
var run = require("./r");

function controleRunning(run_classes,runner,fir_fun){
    var eventEmitter = new events.EventEmitter();
    var n_finish_clas = 0 ;
    var n_error = 0 ;
    var reports = '*************run Report*************** \n' ;
    
    run_classes.forEach(clas_d => {
        run.controleRunning(clas_d , runner , function(sign,report){
            reports += report +"\n";
            n_error += sign;
            n_finish_clas++;
            if(n_finish_clas == run_classes.length)
                eventEmitter.emit('finish',n_error,reports);
        }); 
        
    });

    eventEmitter.on('finish',function(err,report){
        fir_fun(err,report);
    });
}

module.exports.controleRunning = controleRunning;
