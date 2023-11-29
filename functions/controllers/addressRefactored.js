const jwt = require('jsonwebtoken')
const { HTTP_UNAUTHORIZED, HTTP_NOT_FOUND } = require('../utils/httpCode')
const {
  REQUEST_WITHOUT_TOKEN,
  ERROR_SAVING_ADDRESS,
  ERROR_FINDING_ADDRESS,
  ERROR_DELETING_ADDRESS,
  ADDRESS_SUCCESSFULLY_REMOVED,
  ADDRESS_NOT_FOUND,
  ERROR_UPDATING_ADDRESS,
  ADDRESS_SUCCESSFULLY_UPDATED,
  SUCCESSFUL_OPERATION,
} = require('../utils/constants')
const AddressService = require('../services/address')

const validateToken = (token, res) => {
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN,
    })
  }
}

const createAddress = async (req, res) => {
  validateToken(req.header('x-token'), res)

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const newAddress = await AddressService.createUserAddress(req.body, id)

    return res.json(newAddress)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_SAVING_ADDRESS} - error: ${error}`,
    })
  }
}

const findAddress = async (req, res) => {
  validateToken(req.header('x-token'), res)

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const addressesFound = await AddressService.findUserAddresses(id)

    return res.json(addressesFound)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    })
  }
}

const findAddressById = async (req, res) => {
  validateToken(req.header('x-token'), res)

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const addressFound = await AddressService.findUserAddressById(
      req.params.id,
      id,
    )

    return res.json(addressFound)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`,
    })
  }
}

const deleteAddressById = async (req, res) => {
  validateToken(req.header('x-token'), res)

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const response = await AddressService.deleteUserAddressById(
      req.params.id,
      id,
    )

    if (response === SUCCESSFUL_OPERATION) {
      return res.json({
        result: ADDRESS_SUCCESSFULLY_REMOVED,
      })
    }

    return res.status(HTTP_NOT_FOUND).json({
      response: ADDRESS_NOT_FOUND,
    })
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_DELETING_ADDRESS} - error: ${error}`,
    })
  }
}

const updateAddress = async (req, res) => {
  validateToken(req.header('x-token'), res)

  try {
    const response = await AddressService.updateUserAddress(
      req.body,
      req.params.id,
    )

    if (response === SUCCESSFUL_OPERATION) {
      return res.json({
        result: ADDRESS_SUCCESSFULLY_UPDATED,
      })
    }

    return res.status(HTTP_SERVER_ERROR).json({
      error: `${ERROR_UPDATING_ADDRESS} - error: ${error}`,
    })
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_UPDATING_ADDRESS} - error: ${error}`,
    })
  }
}

module.exports = {
  createAddress,
  findAddress,
  findAddressById,
  deleteAddressById,
  updateAddress,
}
