var m = require("./server/CiControler");
m.runCI(112223232,"github/..","D:\\gr_proj\\repos\\testrepo");




/*var PiplineRunner = require("./pipline/PiplineRunner");
var TestBlock = require("../model/TestBlock");

var testB = new TestBlock.TestBlock();
testB.ID = 'method';
testB.BEnv = 'javac';
testB.BuildClasses = [{classname :'TestJunit.java',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];
testB.REnv = 'java org.junit.runner.JUnitCore';
testB.RunClasses = [{classname :'TestJunit',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];

testB.Particepant=["send biuld Fail"];


var testblock_arr = new Array();
testblock_arr[0]= testB;

var test = new TestBlock.TestBlock();
test.ID = 'method12';
test.BEnv = 'javac';
test.BuildClasses = [{classname :'TestJunit1.java',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];
test.REnv = 'java org.junit.runner.JUnitCore';
test.RunClasses = [{classname :'TestJunit1',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];
test.Particepant=["send biuld Fail"];
test.Parent = 'method'
testblock_arr[1] = test;

var t = new TestBlock.TestBlock();
t.ID = 'method123';
t.BEnv = 'javac';
t.BuildClasses = [{classname :'TestJunit.java',classpath :'D:\\gr_proj\\repos\\testrepo\\pac'}];
t.REnv = 'java org.junit.runner.JUnitCore';
t.RunClasses = [{classname :'pac.TestJunit',classpath :'D:\\gr_proj\\repos\\testrepo'}];
t.Particepant=["send biuld Fail"];
t.Parent = 'method12';

testblock_arr[2] = t ;

PiplineRunner.runPipline(testblock_arr,'method12',function(report){
    console.log("root " + report.pip_root);
    report.test_block_report.forEach(tes => {
        console.log(tes.id);
        tes.build_report.reports.forEach(b=>{
            console.log(b.classname + "  " + b.resulte + "  " +b.err);
        });
        tes.run_report.reports.forEach(b=>{
            console.log(b.classname + "  " + b.resulte + "  " +b.err);
        });
        
    });
});*/





/*TestBlock.runTestBlock(pipline);
TestBlock.Events.on(pipline.ID+'BuildSucess',function(){
    console.log('build success');
});
TestBlock.Events.on(pipline.ID+'RunSuccess',function(report){
    console.log(report);
});
TestBlock.Events.on(pipline.ID+'RunFail',function(report){
    console.log(report);
})*/
