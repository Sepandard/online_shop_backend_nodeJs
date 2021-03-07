const fs = require("fs");

class Logger {
    constructor(message){
        fs.appendFileSync('../log.txt',{message},(res,err)=>{
            if(res){
                console.log(res.green.underline.bold)
            }else if(err){
            }   console.log(err.read.underline.bold)
        })
        
    }
}
module.exports = Logger;
