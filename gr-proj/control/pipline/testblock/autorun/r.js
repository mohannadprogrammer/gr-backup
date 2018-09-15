var events = require('events');

function controleRunning(run_class,runner,firf){
    eventEmitter = new events.EventEmitter();    
    
    run(run_class.classpath , run_class.classname , runner ,eventEmitter);

    var report = run_class.classname+" :";
    eventEmitter.on('output',function(res){
        report += res ;
    });

    eventEmitter.on('runfinish',function(err){
            firf(err,report);
    });

}

function run(path,classname,runner,eventEmitter){

    const { exec } = require('child_process');

    const child = exec(runner +' '+classname,{
        cwd : path 
    });

    child.stdout.on('data',(data)=>
    {
        eventEmitter.emit('output',data);
    });
    child.on('exit',(code)=>{
        eventEmitter.emit('runfinish',code);
    });
    
}

module.exports.controleRunning = controleRunning;
