var testblock1 = require("./pipline/testblock/TestBlockRunner");
var TestBlock = require("../model/TestBlock");

var testB = new TestBlock.TestBlock();
testB.ID = 'method';
testB.BEnv = 'javac';
testB.BuildClasses = [{classname :'TestJunit.java',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'},
                    {classname :'TestJunit1.java',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];
testB.REnv = 'java org.junit.runner.JUnitCore';
testB.RunClasses = [{classname :'TestJunit',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];
testB.Particepant=["send biuld Fail"];

testblock1.runTestBlock(testB,function(err,id,report){
    console.log(id+" "+report);
});
var test = new TestBlock.TestBlock();
test.ID = 'method12';
test.BEnv = 'javac';
test.BuildClasses = [{classname :'TestJunit1.java',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];
test.REnv = 'java org.junit.runner.JUnitCore';
test.RunClasses = [{classname :'TestJunit1',classpath :'D:/gr_proj/javacode/JUNIT_WORKSPACE'}];
test.Particepant=["send biuld Fail"];
test.Parent = 'method';
testblock1.runTestBlock(test,function(err,id,report){
    console.log(id+" "+report);
});

