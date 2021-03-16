const client = require("../config/db");
const asyncHandler = require("../middlewares/async");
const Logger = require("../utils/logger");

exports.addOrder = asyncHandler(async (req, res, next) => {
  const {
    order_price,
    user_id,
    product_id,
    order_status,
    order_description,
  } = req.body;
  await client.query(
    "insert into tbl_order (order_price,user_id,product_id,order_status,order_description) values ($1,$2,$3,$4,$5) ;",
    [order_price, user_id, product_id, order_status, order_description],
    (err, resulat) => {
      console.log(err);
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [],
        });
        new Logger(
          "Success: true order_price:" +
            order_price +
            " user_id:" +
            user_id +
            " product_id:" +
            product_id +
            " order_status:" +
            order_status +
            " order_description:" +
            order_description
        );
      } else {
        res.status(201).json({ Success: false, data: [] });
      }
    }
  );
});

exports.searchOrders = asyncHandler(async (req, res, next) => {
  let { order_id } = req.body;
  await client.query(
    "select * from tbl_order tp  where  order_id = $1 ;",
    [order_id],
    (err, resulat) => {
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [{ Order: resulat.rows }],
        });
      } else {
        res.status(201).json({
          Success: false,
          data: [],
        });
      }
    }
  );
});

exports.updateOrder = asyncHandler(async (req, res, next) => {
  const {
    order_price,
    user_id,
    product_id,
    order_status,
    order_description,
    order_id,
  } = req.body;
  await client.query(
    "update tbl_order set order_price = $1 ,product_id = $2,order_status = $3,order_price = $4,order_description = $5 where order_id = $6"
  ,[order_price,user_id,product_id,order_status,order_description,order_id],(err,resulat)=>{
    if(!err){
      res.status(201).json({
        Success: true,
        data: [],
      });
    }else{
      res.status(201).json({
        Success: false,
        data: [],
      });
    }
  });
});
