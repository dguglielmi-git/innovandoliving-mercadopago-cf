const Platform = require('../models/platform')
const { ERROR_GETTING_PLATFORMS } = require('../utils/constants/platform')

const getPlatforms = async (req, res) => {
  try {
    const { sort } = req.query
    const [position, order] = sort.split(':')
    const sortOrder = order === '-1' ? -1 : 1

    const platformList = await Platform.find().sort({ [position]: sortOrder })
    return res.json(platformList)
  } catch (error) {
    console.error(error)
    return res.json({
      response: `${ERROR_GETTING_PLATFORMS}`,
    })
  }
}

module.exports = {
  getPlatforms,
}
