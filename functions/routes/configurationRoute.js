const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const {
  getConfigurations,
  updateConfigurations,
} = require("../controllers/configuration");

const router = Router();

// [GET]
router.get("/configurations", [fieldValidator], getConfigurations);

// [PUT]
router.put("/updateconfigurations/:id", [fieldValidator], updateConfigurations);

module.exports = router;
