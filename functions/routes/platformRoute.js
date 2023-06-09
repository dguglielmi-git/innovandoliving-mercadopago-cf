const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const { getPlatforms } = require("../controllers/platform");

const router = Router();

router.get("/platforms", [fieldValidator], getPlatforms);

module.exports = router;
