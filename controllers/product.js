const e = require("express");
const client = require("../config/db");
const asyncHandler = require("../middlewares/async");

exports.addProdcut = asyncHandler(async (req, res, next) => {
  const {
    productname,
    productprice,
    productdescription,
    productimage,
    productcategoryid,
  } = req.body;
  console.log(req.body);
  await client.query(
    "insert into tbl_product (productname, productprice,productdescription, productimage,productcategoryid) values ($1,$2,$3,$4)",
    [
      productname,
      productprice,
      productdescription,
      productimage,
      productcategoryid,
    ],
    (err, resulat) => {
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [
            {
              productId: productname,
            },
          ],
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

exports.addProdcutCategory = asyncHandler(async (req, res, next) => {
  const { categoryproductname } = req.body;

  await client.query(
    "insert into tbl_categoryproduct ( categoryproductname ) values ($1)",
    [categoryproductname],
    (err, result) => {
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [{ categoryproductname: categoryproductname }],
        });
      } else {
        res.status(201).json({
          Success: false,
          data: [{}],
        });
      }
    }
  );
});

exports.searchProduct = asyncHandler(async (req, res, next) => {
  let { productname } = req.body;

  if (!productname) productname = "";

  await client.query(
    "select * from tbl_product tp  where  productname like '%" +
      productname +
      "%' ;",

    (err, result) => {
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [{ products: result.rows }],
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

exports.searchProductCategory = asyncHandler(async (req, res, next) => {
  await client.query("select * from tbl_categoryproduct", (err, resulat) => {
    if (!err) {
      res.status(201).json({
        Success: true,
        data: [{ ProductCategory: resulat.rows }],
      });
    } else {
      res.status(201).json({
        Success: false,
        data: [],
      });
    }
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { productid } = req.body;

  await client.query(
    "delete from tbl_product where productid = $1",
    [productid],
    (err, resulat) => {
      console.log(err);
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [],
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

// **************** Delete categoryproduct product ********************* \\
// exports.deleteProduct = asyncHandler(async (req, res, next) => {
//   const { productid } = req.body;

//   await client.query(
//     "delete from tbl_product where productid = $1",[productid]
//   ,(err ,resulat)=>{
//       console.log(err);
//       if(!err){
//         res.status(201).json({
//             Success:true,
//             data:[]
//         })
//       }else{
//         res.status(201).json({
//             Success:false,
//             data:[]
//         })
//       }
//   });
// });

exports.updateProduct = asyncHandler(async (req, res, next) => {
  console.log();
  const {
    productid,
    productname,
    productprice,
    productdescription,
    productimage,
    productcategoryid,
  } = req.body;
  await client.query(
    "update tbl_product set  productname = $2, productprice = $3 ,productdescription= $4 , productimage = $5 ,productcategoryid = $6 where productid = $1",
    [
      productid,
      productname,
      productprice,
      productdescription,
      productimage,
      productcategoryid,
    ],
    (err, resulat) => {
      if (!err) {
        res.status(201).json({
          Success: true,
          data: [],
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

exports.updateProductCategory = asyncHandler(async (req, res, next) => {
  const { categoryproductid, categoryproductname } = req.body;
  await client.query(
    "update tbl_ categoryproduct  categoryproductname = $2 where categoryproductid = $1 ",
    [categoryproductid, categoryproductname],
    (err, resulat) => {
        if (!err) {
            res.status(201).json({
              Success: true,
              data: [],
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
