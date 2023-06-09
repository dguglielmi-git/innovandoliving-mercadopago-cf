const Product = require("../models/product");
const {
  REQUEST_WITHOUT_TOKEN,
  ERROR_FINDING_ADDRESS,
} = require("../utils/constants");
const {
  ERROR_GETTING_PRODUCTS,
  ERROR_GETTING_PRODUCTS_BY_PLATFORM,
} = require("../utils/constants/productConstants");
const { getValidToken, errorWithoutToken } = require("../utils/utils");

const getPublishedProducts = async (req, res) => {
  try {
    await getValidToken(req);
    const { limit, sort, publish } = req.query;

    const productList = await Product.find({ publish })
      .limit(limit)
      .sort(sort)
      .populate({ path: "platform" });
    return res.json(productList);
  } catch (error) {
    console.error(error);
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res);
    }
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS} - error: ${error}`,
    });
  }
};

const getProductsByPlatform = async (req, res) => {
  try {
    await getValidToken(req);
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
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res);
    }
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS_BY_PLATFORM} - error: ${error}`,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    await getValidToken(req);

    const productFound = await Product.findById(req.params.id).populate({
      path: "platform",
    });

    return res.json(productFound);
  } catch (error) {
    console.error(error);
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res);
    }
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    });
  }
};

const getProductByTitle = async (req, res) => {
  try {
    await getValidToken(req);

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
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res);
    }
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    });
  }
}

module.exports = {
  getPublishedProducts,
  getProductsByPlatform,
  getProductById,
  getProductByTitle,
};
