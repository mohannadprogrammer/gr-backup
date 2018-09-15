var events = require('events');

function controleBuilding(b_class,builder,fir_fun){

    var eventEmitter = new events.EventEmitter();
    build(b_class.classpath , b_class.classname , builder ,eventEmitter); 

    var report = '';
    eventEmitter.on('error',function(mass){
        report += mass ;
    });

    eventEmitter.on('finish',function(code){
        let build_report = {classname : '' , resulte : '' , err : 0};

        build_report.classname = b_class.classname ;
        build_report.resulte = report ;
        build_report.err = code ;

         fir_fun(build_report);
       
    });
   
}

function build(path,classname,builder,eventEmitter){
    
    const { exec } = require('child_process');
    
    const child = exec(builder+' '+classname,{
        cwd: path
    });

    child.stderr.on('data',(data)=>{
        eventEmitter.emit('error',data);
    });
    
    child.on('exit',(code)=>{
        eventEmitter.emit('finish',code);
    });
    
}
module.exports.controleBuilding = controleBuilding ;

