fs = require('fs');
function getAllPackage(file,func){
    let data = fs.readFileSync(file);

    let config_data = JSON.parse(data);
    let config = config_data.config ;
    let tb_id = config.testblock_id ;

    let classPackage_arr = [] ;
    let finish = 0 ;

    config.packages.forEach(package => {
        package.classes.forEach(clas=>{
            ++finish ;
            classPackage_arr[clas] = package.name ;
            --finish;
            if(finish == 0)
                func(tb_id,classPackage_arr)
        });
    });
}
getAllPackage('D:\\gr_proj\\repos\\testrepo\\cofig.josn',function(root,cls_pac_arr){
    console.log(cls_pac_arr);
});