const Logger = require("../utils/logger");
const asyncHandler = require("../middlewares/async");
const client = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
let loginStatus = false;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

exports.register = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { user_nickname, user_gender, password, user_email } = req.body;
  const hashedPassWord = await hashingPassWord(password);

  let mailOptions = {
    from: "",
    to: user_email,
    subject: "WELCOME TO ONLINE SHOP",
    html:
      "<h1>hi " +
      user_nickname +
      "; Thank you very much for your trust, we hope we deserve this trust.</h1>",
  };

  await client.query(
    "insert into tbl_user (user_nickname , user_email,user_gender,user_password) values ($1 , $2 , $3 , $4)",
    [user_nickname, user_email, user_gender, hashedPassWord],
    (err, result) => {
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [{ nickname: user_nickname }],
          error: null,
        });
        //send Email
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      } else {
        console.log(err.detail);
        res.status(201).json({ Success: false, error: err.detail });
      }
    }
  );
});

exports.Login = asyncHandler(async (req, res, next) => {
  const { user_email, password } = req.body;
 client.query(
    "select user_password,user_id,user_nickname from tbl_user where user_email = $1  ;",
    [user_email],
    (err, result) => {
      const { user_id, user_password, user_nickname } = result.rows[0];
      generateAccessToken(user_id).then((token) => {
        if (!err) {
            coparePassWord(password, user_password).then((loginStatus)=>{
              console.log(loginStatus);
          if (loginStatus) {
            res.status(201).json({
              Success: true,
              data: [
                { user_id: user_id, nickname: user_nickname, token: token },
              ],
            });
            new Logger("{ Success : true , user_id : " + user_id + "  }");
          } else {
            res
              .status(201)
              .json({ Success: false, message: "Password is wrong" });
            new Logger(
              `{ Success : false ,message : "Password is wrong", user_id :` +
                user_id +
                "}"
            );
          }
        })
        } else {
          console.log(err);
        }
      });
    }
  );
});
coparePassWord = async (enteredPass, Pass) => {

 var loginStatus = await bcrypt.compare(enteredPass, Pass);
  return loginStatus
};
hashingPassWord = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassWord = await bcrypt.hash(pass, salt);
  return hashedPassWord;
};

generateAccessToken = async (id) => {
  console.log(id);
  const token = await jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "30d",
  });
  console.log(token);
  return token;
};
