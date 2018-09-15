/*this module for modle the main item of pipline
id , building classes , run classes , and user to notify ,
when one of the event is occur(build success , fail ,
run success , fail)*/


//initial value for pipline
module.exports.ID = 0;

module.exports.BEnv = null;

module.exports.REnv = null;

module.exports.Build = [];

module.exports.Run = [];

module.exports.onBuildFail = [];

module.exports.onBuildSuccess = [];

module.exports.onRunFail = [];

module.exports.onRunSuccess = [];