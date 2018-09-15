/*this module for modle the main item of pipline
id , building classes , run classes , and user to notify ,
when one of the event is occur(build success , fail ,
run success , fail)*/


//initial value for pipline
function TestBlock(){
this.ID = 0;

this.BEnv = null;

this.REnv = null;

this.BuildClasses = [];

this.RunClasses = [];

this.Particepant = [];

this.Parent = null ;
}
module.exports.TestBlock = TestBlock ;