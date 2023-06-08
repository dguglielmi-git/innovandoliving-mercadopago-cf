const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const {
  createAddress,
  findAddress,
  findAddressById,
  deleteAddressById,
  updateAddress,
} = require("../controllers/address");
const router = Router();

// [GET]
router.get("/addresses", [fieldValidator], findAddress);
router.get("/addresses/:id", [fieldValidator], findAddressById);

// [PUT]
router.put("/addresses/:id", [fieldValidator], updateAddress);

// [POST]
router.post("/addresses", [fieldValidator], createAddress);

// [DELETE]
router.delete("/addresses/:id", [fieldValidator], deleteAddressById);

module.exports = router;
