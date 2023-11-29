const Address = require('../models/address')
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
  SUCCESSFUL_OPERATION
} = require('../utils/constants')

const validateToken = (token, res) => {
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }
}

// It should call to the service with a method called createUserAddress
const createAddress = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const address = new Address(req.body)
    address.users_permissions_user = id

    await address.save()
    return res.json(address)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_SAVING_ADDRESS} - error: ${error}`
    })
  }
}

// this should call to a service called findUserAddresses
const findAddress = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const addressesFound = await Address.find().where({
      users_permissions_user: id
    })

    return res.json(addressesFound)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`
    })
  }
}

// in the service, the name of the method should be findUserAddressById
const findAddressById = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const addressFound = await Address.findById(req.params.id).where({
      users_permissions_user: id
    })

    return res.json(addressFound)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_FINDING_ADDRESS} - error: ${error}`
    })
  }
}

// when calling to the service it should call to deleteUserAddressById
const deleteAddressById = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const addressFound = await Address.findOne({ _id: req.params.id }).where({
      users_permissions_user: id
    })

    if (addressFound) {
      await Address.deleteOne({ _id: req.params.id })
      return res.json({
        result: ADDRESS_SUCCESSFULLY_REMOVED
      })
    }

    return res.status(HTTP_NOT_FOUND).json({
      response: ADDRESS_NOT_FOUND
    })
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_DELETING_ADDRESS} - error: ${error}`
    })
  }
}

// when creating the service, it should call to updateUserAddressById
const updateAddress = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const updatedBody = req.body
    await Address.findOneAndUpdate({ _id: req.params.id }, updatedBody)
      .then(() => {
        res.json({
          result: ADDRESS_SUCCESSFULLY_UPDATED
        })
      })
      .catch(error => {
        res.status(HTTP_SERVER_ERROR).json({
          error: `${ERROR_UPDATING_ADDRESS} - error: ${error}`
        })
      })
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_UPDATING_ADDRESS} - error: ${error}`
    })
  }
}

module.exports = {
  createAddress,
  findAddress,
  findAddressById,
  deleteAddressById,
  updateAddress
}
