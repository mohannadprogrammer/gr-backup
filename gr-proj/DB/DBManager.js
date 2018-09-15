var TestBlock = require("../model/BaseTestBlock");
var pg = require("pg");
var connectingString = process.env.DATABASE_URL|| 'postgres://postgres:cicd@localhost:5432/cicd' ;

function getPipline(id,root_tb,firfunc){
    var client = new pg.Client(connectingString );
   client.connect();
   var reulte = {test_blocks : [] , pro_id : id} ;
   
    getAllTB(id , root_tb);


   function getAllTB(pro_id,root_tb){

        var sql = "WITH RECURSIVE pipline AS ("+
            "select tes_id , call_id from testblock where own_id = $1 and tes_id = $2"+
            "UNION "+
            "select t.tes_id , t.call_id from testblock t "+
            "INNER JOIN pipline p ON  p.tes_id = t.call_id and t.own_id = $1)"+
            "select * from pipline ";

        client.query(sql,[pro_id,root_tb],function(err,res){
            var num_of_fin = 0;

            res.rows.forEach(row => {
                var test_b = new TestBlock.TestBlock();
                test_b.ID = row.tes_id;
                test_b.Parent = row.call_id ;
                
                getClasses('buildclass',pro_id,row.tes_id,function(buildclasses){
                    test_b.BuildClasses = buildclasses ;

                    getClasses('runclass',pro_id,row.tes_id,function(runclasses){
                        test_b.RunClasses = runclasses ;
                        reulte.test_blocks.push(test_b);

                        ++num_of_fin;
                        if(num_of_fin == res.rows.length){
                            firfunc(reulte);
                            client.end();
                        }
                    });
                });

            });
        });
        
    }

    function getClasses(c_type,pro_id,tes_id,func){
        var sql = "select classname  from "+c_type+"  where pro_id = $1 and tes_id = $2";
        var query = client.query(sql,[pro_id,tes_id],function(err,res){
            func(res.rows);
            
        });
    }
}
function getProjet(url,func){
    var client = new pg.Client(connectingString );
    client.connect();
    
    let quer = "select pro_id , config_file from project where url = $1";
   
    var query = client.query(quer,[url],function(err,res){
       func(res.rows[0]);
       client.end();
    });
}

function saveTestBlockReport(test_b_report,pro_id,commit_id){
    let finish = 0 ;
    var client = new pg.Client(connectingString );
    client.connect();
    let id = test_b_report.id ;
    let build_report = test_b_report.build_report ;
    let run_report = test_b_report.run_report ;
    let err = test_b_report.err;

    let sql = "insert into report (tes_id, pro_id, commit_id, err) values ( $1 , $2 , $3 ,$4 )";
    let query = client.query(sql,[id,pro_id,commit_id,err],function(err){
        if(!err){
            saveBuildReport(build_report);
            saveRunReport(run_report);
        }
        else {
            client.end();
        }
    });

    function saveBuildReport(b_report){
        b_report.reports.forEach(cls_rep =>{
            ++finish;

            let classname = cls_rep.classname ;
            let comp_rep = cls_rep.resulte ;
            let sql = "insert into build_report (tes_id, pro_id, commit_id , classname ,compile_rep) values ( $1, $2, $3, $4, $5 )";
            let query = client.query(sql,[id,pro_id,commit_id,classname,comp_rep],function(){
                --finish;
                if(finish == 0)
                    client.end();
            });
        });
    }

    function saveRunReport(run_report){
        ++finish;

        run_report.reports.forEach(cls_rep=>{
            let classname = cls_rep.classname;
            let j_rep = cls_rep.resulte ;
            let sql = "insert into run_report (tes_id, pro_id, commit_id , classname ,junit_rep ) values ( $1, $2, $3, $4, $5 )";
            let query = client.query(sql,[id,pro_id,commit_id,classname,j_rep],function(){
                --finish;
                if(finish == 0)
                    client.end();
            });
        });
    }

}

module.exports.getPipline = getPipline ;
module.exports.getProjet =getProjet ;
module.exports.saveTestBlockReport = saveTestBlockReport ;
