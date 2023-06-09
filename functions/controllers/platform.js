const Platform = require("../models/platform");
const { REQUEST_WITHOUT_TOKEN } = require("../utils/constants");
const {
  ERROR_GETTING_PRODUCTS,
} = require("../utils/constants/productConstants");
const { getValidToken, errorWithoutToken } = require("../utils/utils");

const getPlatforms = async (req, res) => {
  try {
    await getValidToken(req);
    const { sort } = req.query;
    const [position, order] = sort.split(":");
    const sortOrder = order === "-1" ? -1 : 1;

    const platformList = await Platform.find().sort({ [position]: sortOrder });
    return res.json(platformList);
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

module.exports = {
  getPlatforms,
};
