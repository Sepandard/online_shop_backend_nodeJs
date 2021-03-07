const async = require("../middlewares/async");
const Logger = require("../utils/logger");
const asyncHandler = require("../middlewares/async");
const client = require("../config/db");

exports.register = asyncHandler(async (req, res, next) => {
  const { nickname, gender, password, email } = req.body;

  await client.query(
    "insert into tbl_user (user_nickname , user_email,user_gender,user_password) values ($1 , $2 , $3 , $4)",
    [nickname, email, gender, password],
    (err, result) => {
      if (!err) {
        res.status(201).json({ Success: true });
      } else {
        res.status(201).json({ Success: false });
      }
    }
  );
});

exports.Login = asyncHandler(async (req,res,next)=>{
    const {user_email , password} = req.body 

    await client.query('select user_password,user_id from tbl_user where user_email = $1  ;',[user_email] ,(err , result)=>{
        const {user_id , user_password } = result.rows[0]
        if(!err){
            if(password == user_password){
                 res.status(201).json({ Success : true , user_id : user_id  })
            }else{
                res.status(201).json({ Success : false , message : "Password is wrong"  })
            }
        }else{

        }
    })

})