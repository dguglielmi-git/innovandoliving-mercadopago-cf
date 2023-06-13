const Configuration = require("../models/configuration");
const { REQUEST_WITHOUT_TOKEN } = require("../utils/constants");
const {
  ERROR_GETTING_CONFIGURATIONS,
  ERROR_TRYING_TO_UPDATE_CONFIGS,
  CONFIGS_SUCCESSFULLY_UPDATED,
} = require("../utils/constants/configurationConstants");
const { HTTP_SERVER_ERROR } = require("../utils/httpCode");
const { getValidToken, errorWithoutToken } = require("../utils/utils");

const getConfigurations = async (req, res) => {
  try {
    await getValidToken(req);

    const configResult = await Configuration.find();
    if (configResult && configResult.length > 0) {
      return res.json(configResult[0]);
    } else return null;
  } catch (error) {
    console.error(error);
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res);
    }
    return res.json({
      response: `${ERROR_GETTING_CONFIGURATIONS} - error: ${error}`,
    });
  }
};

const updateConfigurations = async (req, res) => {
  try {
    await getValidToken(req);

    const updateBody = req.body;
    console.log(updateBody)
    await Configuration.findOneAndUpdate({ _id: req.params.id }, updateBody)
      .then(() => {
        res.json({
          result: CONFIGS_SUCCESSFULLY_UPDATED,
        });
      })
      .catch((error) => {
        res.status(HTTP_SERVER_ERROR).json({
          error: `${ERROR_TRYING_TO_UPDATE_CONFIGS} - error: ${error}`,
        });
      });
  } catch (error) {
    console.error(error);
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res);
    }
    return res.json({
      response: `${ERROR_TRYING_TO_UPDATE_CONFIGS} - error: ${error}`,
    });
  }
};

module.exports = {
  getConfigurations,
  updateConfigurations,
};
