const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const {
  getPublishedProducts,
  getProductsByPlatform,
  getProductById,
  getProductByTitle,
} = require("../controllers/product");

const router = Router();

// [GET]
router.get("/publishedProducts", [fieldValidator], getPublishedProducts);
router.get(
  "/productsByPlatform/:platform",
  [fieldValidator],
  getProductsByPlatform
);
router.get("/productById/:id", [fieldValidator], getProductById);
router.get("/productByTitle/:title", [fieldValidator], getProductByTitle);

module.exports = router;
