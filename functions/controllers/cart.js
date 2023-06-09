const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
const { ERROR_GETTING_CART, REQUEST_WITHOUT_TOKEN } = require("../utils/constants");
const { HTTP_UNAUTHORIZED } = require("../utils/httpCode");

const getCart = async (req, res) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN,
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);
    const cartFound = await Cart.find()
      .where({
        users_permissions_user: id,
      })
      .populate({
        path: 'producto',
        populate: {
            path: 'poster'
        }
      });
    return res.json(cartFound);
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_GETTING_CART} - error: ${error}`,
    });
  }
};

module.exports = {
  getCart,
};
