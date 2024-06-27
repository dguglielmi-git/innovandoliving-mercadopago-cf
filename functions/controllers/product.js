const Product = require("../models/product");
const { ERROR_FINDING_ADDRESS, REQUEST_WITHOUT_TOKEN } = require("../utils/constants");
const {
  ERROR_GETTING_PRODUCTS,
  ERROR_GETTING_PRODUCTS_BY_PLATFORM,
  ERROR_SAVING_PRODUCT,
} = require("../utils/constants/productConstants");
const { HTTP_UNAUTHORIZED } = require('../utils/httpCode');

const getPublishedProducts = async (req, res) => {
  try {

    const { limit, sort, publish } = req.query;

    const productList = await Product.find({ publish })
      .limit(limit)
      .sort(sort)
      .populate({ path: "platform" });
    return res.json(productList);
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS} - error: ${error}`,
    });
  }
};

const getProductsByPlatform = async (req, res) => {
  try {
    const { sort, skip, limit } = req.query;

    const productByPlatformList = await Product.find()
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .populate({
        path: "platform",
      });
    return res.json(
      productByPlatformList.filter(
        (product) => product.platform.url === req.params.platform
      )
    );
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS_BY_PLATFORM} - error: ${error}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productFound = await Product.findById(req.params.id).populate({
      path: "platform",
    });

    return res.json(productFound);
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    });
  }
};

const getProductByTitle = async (req, res) => {
  try {
    const productFound = await Product.find()
      .where({
        title: {
          $regex: new RegExp(req.params.title, "i"),
        },
      })
      .populate({
        path: "platform",
      });

    return res.json(productFound);
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    });
  }
};

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

module.exports = {
  getPublishedProducts,
  getProductsByPlatform,
  getProductById,
  getProductByTitle,
  createProduct
};
