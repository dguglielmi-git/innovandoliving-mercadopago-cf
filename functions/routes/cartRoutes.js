const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const { getCart } = require("../controllers/cart");

const router = Router();

// [GET]
router.get("/carts", [fieldValidator], getCart);

module.exports = router;
