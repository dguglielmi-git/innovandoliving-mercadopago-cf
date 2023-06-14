const Doctype = require("../models/doctype");
const { REQUEST_WITHOUT_TOKEN } = require("../utils/constants");
const {
  ERROR_GETTING_DOCTYPES,
} = require("../utils/constants/doctypeConstants");
const { getValidToken, errorWithoutToken } = require("../utils/utils");

const getDocTypes = async (req, res) => {
  try {
    await getValidToken(req);
    const docTypes = await Doctype().find();
    return res.json(docTypes);
  } catch (error) {
    console.error(error);
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res);
    }
    return res.json({
      response: `${ERROR_GETTING_DOCTYPES} - error: ${error}`,
    });
  }
};

module.exports = {
  getDocTypes,
};
