const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const { getDocTypes } = require("../controllers/doctypes");

const router = Router();

// [GET]
router.get("/doctypes", [fieldValidator], getDocTypes);

module.exports = router;
