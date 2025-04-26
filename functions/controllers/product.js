const Product = require('../models/product')
const {
  ERROR_FINDING_ADDRESS,
  REQUEST_WITHOUT_TOKEN,
  PRODUCT_SUCCESSFULLY_UPDATED,
  ERROR_UPDATING_PRODUCT,
  PRODUCT_SUCCESSFULLY_DELETED,
  ERROR_DELETING_PRODUCT
} = require('../utils/constants')
const {
  ERROR_GETTING_PRODUCTS,
  ERROR_GETTING_PRODUCTS_BY_PLATFORM,
  ERROR_SAVING_PRODUCT
} = require('../utils/constants/productConstants')
const { HTTP_UNAUTHORIZED, HTTP_SERVER_ERROR } = require('../utils/httpCode')

const getAllProducts = async (req, res) => {
  try {
    const { limit, sort } = req.query

    const productList = await Product.find({ active: true })
      .limit(limit)
      .sort(sort)
      .populate({ path: 'platform' })
    return res.json(productList)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS} - error: ${error}`
    })
  }
}

const getPublishedProducts = async (req, res) => {
  try {
    const { limit, sort, publish } = req.query

    const productList = await Product.find({ publish })
      .limit(limit)
      .sort(sort)
      .populate({ path: 'platform' })
    return res.json(productList)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS} - error: ${error}`
    })
  }
}

const getProductsByPlatform = async (req, res) => {
  try {
    const { sort, skip, limit } = req.query

    const productByPlatformList = await Product.find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate({
        path: 'platform'
      })
    return res.json(
      productByPlatformList.filter(
        product => product.platform.url === req.params.platform
      )
    )
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS_BY_PLATFORM} - error: ${error}`
    })
  }
}

const getProductById = async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.id).populate({
      path: 'platform'
    })

    return res.json(productFound)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`
    })
  }
}

const getProductByTitle = async (req, res) => {
  try {
    const productFound = await Product.find()
      .where({
        title: {
          $regex: new RegExp(req.params.title, 'i')
        }
      })
      .populate({
        path: 'platform'
      })

    return res.json(productFound)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`
    })
  }
}

const createProduct = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const product = new Product(req.body)

    await product.save()
    return res.json(product)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_SAVING_PRODUCT} - error: ${error}`
    })
  }
}

const updateProduct = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const updatedBody = req.body

    if (updatedBody.screenshots && Array.isArray(updatedBody.screenshots)) {
      updatedBody.screenshots = updatedBody.screenshots.filter(
        (screenshot) => screenshot.url.startsWith('http')
      );
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      updatedBody,
      {
        new: true
      }
    )
    if (!updatedProduct) {
      return res.status(HTTP_NOT_FOUND).json({
        error: `${ERROR_UPDATING_PRODUCT}`
      })
    }

    res.json({
      result: PRODUCT_SUCCESSFULLY_UPDATED,
      product: updatedProduct
    })
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_UPDATING_PRODUCT} - error: ${error}`
    })
  }
}

const deleteProduct = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    await Product.findOneAndUpdate({ _id: req.params.id }, { active: false })
      .then(() => {
        res.json({
          result: PRODUCT_SUCCESSFULLY_DELETED
        })
      })
      .catch(error => {
        res.status(HTTP_SERVER_ERROR).json({
          error: `${ERROR_DELETING_PRODUCT} - error: ${error}`
        })
      })
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_DELETING_PRODUCT} - error: ${error}`
    })
  }
}

module.exports = {
  getPublishedProducts,
  getProductsByPlatform,
  getProductById,
  getProductByTitle,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
