const express = require("express");
const router = express.Router();

const {
  addProdcut,
  addProdcutCategory,
  searchProduct,
  searchProductCategory,
  deleteProduct,
  updateProduct,
  updateProductCategory
} = require("../controllers/product");

router.post("/addProdcut", addProdcut);
router.post("/addProdcutCategory", addProdcutCategory);
router.get("/searchProduct", searchProduct);
router.get("/searchProductCategory", searchProductCategory);
router.delete("/deleteProduct", deleteProduct);
router.put("/updateProduct", updateProduct);
router.put("/updateProductCategory", updateProductCategory);

module.exports = router;
