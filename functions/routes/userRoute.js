const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const {
  userLogin,
  registerUser,
  getUser,
  updateUser,
} = require("../controllers/user");

const router = Router();

// [GET]
router.get("/users/me", [fieldValidator], getUser);

// [PUT]
router.put("/users/update", [fieldValidator], updateUser);

// [POST]
router.post("/login", [fieldValidator], userLogin);
router.post("/register", [fieldValidator], registerUser);

module.exports = router;
