const {
  REQUEST_WITHOUT_TOKEN,
  ERROR_GETTING_VALID_TOKEN,
} = require("./constants");
const { HTTP_UNAUTHORIZED } = require("./httpCode");

const getJwtKey = () => process.env.SECRETJWTKEY;

const getValidToken = async (req) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      throw REQUEST_WITHOUT_TOKEN;
    }
    return token;
  } catch (error) {
    console.error(error);
    throw `${ERROR_GETTING_VALID_TOKEN} ${error}`;
  }
};

const errorWithoutToken = (res) => {
  return res.status(HTTP_UNAUTHORIZED).json({
    error: REQUEST_WITHOUT_TOKEN,
  });
};

module.exports = {
  getValidToken,
  errorWithoutToken,
  getJwtKey
};
