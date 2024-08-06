const Platform = require('../models/platform')
const jwt = require('jsonwebtoken')
const {
  REQUEST_WITHOUT_TOKEN,
  PLATFORM_SUCCESSFULLY_REMOVED,
  CATEGORY_NOT_FOUND,
  ERROR_DELETING_CATEGORY,
  PLATFORM_ERROR_SAVING
} = require('../utils/constants')
const {
  ERROR_GETTING_PRODUCTS
} = require('../utils/constants/productConstants')
const { HTTP_NOT_FOUND, HTTP_UNAUTHORIZED } = require('../utils/httpCode')
const { getValidToken, errorWithoutToken } = require('../utils/utils')

const getPlatforms = async (req, res) => {
  try {
    const { sort } = req.query
    const [position, order] = sort.split(':')
    const sortOrder = order === '-1' ? -1 : 1

    const platformList = await Platform.find().sort({ [position]: sortOrder })
    return res.json(platformList)
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.json({
      response: `${ERROR_GETTING_PRODUCTS} - error: ${error}`
    })
  }
}

const addPlatform = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const platform = new Platform(req.body)
    platform.created_by = id
    platform.updated_by = id

    await platform.save()
    return res.json(platform)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${PLATFORM_ERROR_SAVING} - error: ${error}`
    })
  }
}

const deletePlatform = async (req, res) => {
  await getValidToken(req)

  try {
    const platformFound = await Platform.findOne({ _id: req.params.id })

    if (platformFound) {
      await Platform.deleteOne({ _id: platformFound._id })

      return res.json({
        result: PLATFORM_SUCCESSFULLY_REMOVED
      })
    }

    return res.status(HTTP_NOT_FOUND).json({
      response: CATEGORY_NOT_FOUND
    })
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_DELETING_CATEGORY} - error: ${error}`
    })
  }
}

module.exports = {
  addPlatform,
  getPlatforms,
  deletePlatform
}
