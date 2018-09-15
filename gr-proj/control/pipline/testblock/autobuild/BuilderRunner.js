var events = require('events');
var classbuilder = require("./Builder");

function controleBuilding(build_classes,builder,fir_fun){

    var eventEmitter = new events.EventEmitter();
    var n_of_error = 0;
    var building_report = {reports : [] , err : 0};

    build_classes.forEach(clas_d => {

        classbuilder.controleBuilding(clas_d , builder ,function(b_report){
            
            building_report.reports.push(b_report);
            building_report.err += b_report.err;

            if(building_report.reports.length == build_classes.length)
                eventEmitter.emit('finish',building_report);
        }); 
        
    });

    eventEmitter.on('finish',function(report){
        fir_fun(report);
    });  
}

module.exports.controleBuilding = controleBuilding ;

