const Address = require('../models/address')
const {
  SUCCESSFUL_OPERATION,
  UNSUCCESSFUL_OPERATION
} = require('../utils/constants')

const createUserAddress = async (address, userId) => {
  const address = new Address(req.body)
  try {
    address.users_permissions_user = userId

    return await address.save()
  } catch (error) {
    console.log(error)
    return []
  }
}

const findUserAddresses = async userId => {
  try {
    const addressesFound = await Address.find().where({
      users_permissions_user: userId
    })
    return addressesFound
  } catch (error) {
    console.log(error)
    return {}
  }
}

/**
 * This method retrieves the searched address only if it belongs
 * to the user specified by the second parameter, userId
 * @param {string} addressId - The ID of the address to be searched.
 * @param {string} userId - The ID of the user to whom the address belong
 * @returns
 */
const findUserAddressById = async (addressId, userId) => {
  try {
    const addressFound = await Address.findById(addressId).where({
      users_permissions_user: userId
    })
    return addressFound
  } catch (error) {
    console.error(error)
    return {}
  }
}

const deleteUserAddressById = async (addressId, userId) => {
  try {
    const addressFound = await Address.findOne({ _id: addressId }).where({
      users_permissions_user: userId
    })
    if (addressFound) {
      await Address.deleteOne({ _id: addressId }).where({
        users_permissions_user: userId
      })
      return SUCCESSFUL_OPERATION
    }

    return UNSUCCESSFUL_OPERATION
  } catch (error) {
    console.error(error)
    return UNSUCCESSFUL_OPERATION
  }
}

const updateUserAddress = async (addressDataUpdated, addressId) => {
  try {
    await Address.findOneAndUpdate({ _id: addressId }, addressDataUpdated)
      .then(() => {
        return UNSUCCESSFUL_OPERATION
      })
      .catch(error => {
        return UNSUCCESSFUL_OPERATION
      })
  } catch (error) {
    console.error(error)
    return UNSUCCESSFUL_OPERATION
  }
}

module.exports = {
  createUserAddress,
  findUserAddresses,
  findUserAddressById,
  deleteUserAddressById,
  updateUserAddress
}
