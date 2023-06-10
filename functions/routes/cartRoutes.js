const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const {
  getCart,
  cleanCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cart");

const router = Router();

// [GET]
router.get("/carts", [fieldValidator], getCart);

// [POST]
router.post("/addToCart", [fieldValidator], addToCart);

// [DELETE]
router.delete("/cleanCart", [fieldValidator], cleanCart);
router.delete("/removeFromCart", [fieldValidator], removeFromCart);

module.exports = router;
