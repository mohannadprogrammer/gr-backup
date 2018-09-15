var events = require('events');

function controleRunning(r_class,runner,fir_fun){

    var eventEmitter = new events.EventEmitter();
    run(r_class.classpath , r_class.classname , runner ,eventEmitter); 

    var run_report = {classname : r_class.classname , resulte : '' , err : 0};
    eventEmitter.on('output',function(mass){
        run_report.resulte += mass ;
    });

    eventEmitter.on('finish',function(code){
        run_report.err = code ;
         fir_fun(run_report);
       
    });
   
}

function run(path,classname,runner,eventEmitter){
    
    const { exec } = require('child_process');
    
    const child = exec(runner+' '+classname,{
        cwd: path
    });

    child.stdout.on('data',(data)=>{
        eventEmitter.emit('output',data);
    });
    
    child.on('exit',(code)=>{
        eventEmitter.emit('finish',code);
    });
    
}
module.exports.controleRunning = controleRunning ;

