const {
  REQUEST_WITHOUT_TOKEN,
  ERROR_GETTING_VALID_TOKEN
} = require('./constants')
const { HTTP_UNAUTHORIZED } = require('./httpCode')
const { v7: uuidv7 } = require('uuid')

const getJwtKey = () => process.env.SECRETJWTKEY

const getValidToken = async req => {
  try {
    const token = req.header('x-token')
    if (!token) {
      throw REQUEST_WITHOUT_TOKEN
    }
    return token
  } catch (error) {
    console.error(error)
    throw `${ERROR_GETTING_VALID_TOKEN} ${error}`
  }
}

const errorWithoutToken = res => {
  return res.status(HTTP_UNAUTHORIZED).json({
    error: REQUEST_WITHOUT_TOKEN
  })
}

const getFileExtension = file => {
  const fileSplit = file.split('.')
  return fileSplit.length > 1 ? '.' + fileSplit.pop() : ''
}

const getUUIDFileName = file => {
  const fileSplit = file.split('.')
  const extension = fileSplit.length > 1 ? '.' + fileSplit.pop() : ''
  return uuidv7() + extension
}

module.exports = {
  getValidToken,
  errorWithoutToken,
  getJwtKey,
  getFileExtension,
  getUUIDFileName
}
