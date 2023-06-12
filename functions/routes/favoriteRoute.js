const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const {
  getFavorites,
  isFavorite,
  removeFavorite,
  addFavorite,
} = require("../controllers/favorite");
const router = Router();

// [GET]
router.get("/favorites", [fieldValidator], getFavorites);
router.get("/isFavorite/:id", [fieldValidator], isFavorite);

// [DELETE]
router.delete("/favorite/:id", [fieldValidator], removeFavorite);

// [POST]
router.post("/favorite", [fieldValidator], addFavorite);

module.exports = router;
