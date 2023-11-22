const Cart = require('../models/cart')
const jwt = require('jsonwebtoken')
const { REQUEST_WITHOUT_TOKEN } = require('../utils/constants')
const { getValidToken, errorWithoutToken } = require('../utils/utils')
const {
  ERROR_CLEANING_CART,
  ERROR_GETTING_CART,
  UNAUTHORIZED_OPERATION,
  CART_CLEANED_SUCCESSFULLY,
  ERROR_ADDING_PRODUCT_TO_CART,
  ERROR_REMOVING_ITEM_FROM_CART,
  ITEM_SUCCESSFULLY_REMOVED,
  ITEM_NOT_FOUND
} = require('../utils/constants/cartConstants')
const { HTTP_UNAUTHORIZED, HTTP_NOT_FOUND } = require('../utils/httpCode')

const getCart = async (req, res) => {
  try {
    const token = await getValidToken(req)
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const cartFound = await Cart.find()
      .where({
        users_permissions_user: id
      })
      .populate({
        path: 'producto',
        populate: {
          path: 'poster'
        }
      })
    return res.json(cartFound)
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.json({
      response: `${ERROR_GETTING_CART} - error: ${error}`
    })
  }
}

const cleanCart = async (req, res) => {
  try {
    const token = await getValidToken(req)
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    
    await Cart.deleteMany({ users_permissions_user: id })
    return res.json({
      response: CART_CLEANED_SUCCESSFULLY
    })
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.json({
      response: `${ERROR_CLEANING_CART} - error: ${error}`
    })
  }
}

const addToCart = async (req, res) => {
  try {
    await getValidToken(req)

    const productToCart = new Cart(req.body)
    console.log(req.body)

   const result = await productToCart.save()
   console.log(result)
    return res.json(productToCart)
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.json({
      response: `${ERROR_ADDING_PRODUCT_TO_CART} - error: ${error}`
    })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const token = await getValidToken(req)
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)

    const itemFound = await Cart.findOne({
      _id: req.body.itemCartToRemove
    }).where({
      users_permissions_user: id
    })

    if (itemFound) {
      await Cart.deleteOne({ _id: itemFound._id, users_permissions_user: id })
      return res.json({
        result: ITEM_SUCCESSFULLY_REMOVED
      })
    }

    return res.status(HTTP_NOT_FOUND).json({
      response: ITEM_NOT_FOUND
    })
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.json({
      response: `${ERROR_REMOVING_ITEM_FROM_CART} - error: ${error}`
    })
  }
}

module.exports = {
  getCart,
  cleanCart,
  addToCart,
  removeFromCart
}
