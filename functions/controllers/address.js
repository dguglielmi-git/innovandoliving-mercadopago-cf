const Address = require("../models/address");
const jwt = require("jsonwebtoken");
const { HTTP_UNAUTHORIZED, HTTP_NOT_FOUND } = require("../utils/httpCode");
const {
  REQUEST_WITHOUT_TOKEN,
  ERROR_SAVING_ADDRESS,
  ERROR_FINDING_ADDRESS,
  ERROR_DELETING_ADDRESS,
  UNAUTHORIZED_USER_ADDRESS_OPERATION,
  ADDRESS_SUCCESSFULLY_REMOVED,
  ADDRESS_NOT_FOUND,
} = require("../utils/constants");

const createAddress = async (req, res) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN,
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);
    const address = new Address(req.body);
    address.users_permissions_user = id;

    await address.save();
    return res.json(address);
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_SAVING_ADDRESS} - error: ${error}`,
    });
  }
};

const findAddress = async (req, res) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN,
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);
    const addressesFound = await Address.find().where({
      users_permissions_user: id,
    });

    return res.json(addressesFound);
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    });
  }
};

const findAddressById = async (req, res) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN,
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);
    const addressFound = await Address.findById(req.params.id);
    if (addressFound) {
      const userOwner = addressFound.users_permissions_user?._id;
      if (userOwner.toString() !== id.toString()) {
        return res.status(HTTP_UNAUTHORIZED).json({
          error: UNAUTHORIZED_USER_ADDRESS_OPERATION,
        });
      }
    }

    return res.json(addressFound);
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    });
  }
};

const deleteAddressById = async (req, res) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN,
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY);
    const addressFound = await Address.findOne({_id: req.params.id});

    if (addressFound) {
      const userOwner = addressFound.users_permissions_user?._id;
      if (userOwner.toString() !== id.toString()) {
        return res.status(HTTP_UNAUTHORIZED).json({
          error: UNAUTHORIZED_USER_ADDRESS_OPERATION,
        });
      }
      await addressFound.remove();
      return res.json({
        result: ADDRESS_SUCCESSFULLY_REMOVED,
      });
    }

    return res.status(HTTP_NOT_FOUND).json({
      response: ADDRESS_NOT_FOUND,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      response: `${ERROR_DELETING_ADDRESS} - error: ${error}`,
    });
  }
};

module.exports = {
  createAddress,
  findAddress,
  findAddressById,
  deleteAddressById,
};
