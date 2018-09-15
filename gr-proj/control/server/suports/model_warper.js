var TestBlock = require("../../../model/TestBlock");
var path = require('path');

function modelPathWarper(tb_arr,package_arr,path_arr,func){
    let respons = [] ;
    let finish = 0 ;
    tb_arr.forEach(tb => {

        mapBaseToRealTB(tb , function(r_tb){

            warpBuildClassPath(tb , path_arr ,function(warp_bc){
                r_tb.BuildClasses = warp_bc ;

                warpRunClassesPath(tb,path_arr,package_arr,function(warp_rc){
                    r_tb.RunClasses = warp_rc ;
                    respons.push(r_tb);
                    if(respons.length == tb_arr.length)
                        func(respons);
                })

            });
        });
        
    });
}

function mapBaseToRealTB(b_tb,func){
    let t = new TestBlock.TestBlock();

    t.ID = b_tb.ID;
    t.BEnv = 'javac';
    t.REnv = 'java org.junit.runner.JUnitCore';
    t.Particepant = b_tb.Particepant;
    t.Parent = b_tb.Parent;

    func(t);
}

function warpBuildClassPath(tb,path_arr,func){
    let build_cls_arr = [] ;
    tb.BuildClasses.forEach(cls =>{

        let build_cls = {} ;
        build_cls.classname = cls.classname;
        build_cls.classpath = path_arr[cls.classname];

        build_cls_arr.push(build_cls);

        if(build_cls_arr.length == tb.BuildClasses.length)
            func(build_cls_arr);
    });
}

function warpRunClassesPath(tb,path_arr,package_arr,func){
    let run_cls_arr = [] ;
    tb.RunClasses.forEach(cls =>{

        let run_cls = {};

        let classname = cls.classname;
        let classpath = path_arr[cls.classname+'.java'];
        let packg = package_arr[cls.classname+'.java'];
        let package = '';

        if(packg){
            let p_size = classpath.length - packg.length - 1 ;
            classpath = classpath.substring(0,p_size);
            classname = packg+"."+classname ; 
        }

        run_cls.classname = classname;
        run_cls.classpath = classpath ;

        run_cls_arr.push(run_cls);

        if(run_cls_arr.length == tb.RunClasses.length)
            func(run_cls_arr);
    });
}
function packagePath(package , path){
    package.forEach(cha=>{
        if(cha == '.')

    });
}
module.exports.modelPathWarper = modelPathWarper ;
