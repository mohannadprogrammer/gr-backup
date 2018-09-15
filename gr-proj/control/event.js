var events = require('events');

var eventEmitter = new events.EventEmitter();


eventEmitter.on('method',function(mass){
    console.log(mass);
});


eventEmitter.emit('method',"hello");
