const express = require("express");
const router = express.Router();

// Controller imports
const {
  getAllProducts,
  createProduct,
} = require("../controller/products");

// Routes
router.route("/").post(createProduct)

router.route("/").get(getAllProducts)

module.exports = router;
