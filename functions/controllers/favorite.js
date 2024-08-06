const Favorite = require('../models/favorite')
const jwt = require('jsonwebtoken')
const { REQUEST_WITHOUT_TOKEN } = require('../utils/constants')
const {
  ERROR_FINDING_FAVORITES
} = require('../utils/constants/favoriteConstants')
const { getValidToken, errorWithoutToken } = require('../utils/utils')
const {
  HTTP_REQUEST_NO_CONTENT,
  HTTP_NOT_FOUND,
  HTTP_REQUEST_CREATED,
  HTTP_REQUEST_ACCEPTED,
  HTTP_REQUEST_OK,
  HTTP_SERVER_ERROR
} = require('../utils/httpCode')

const isFavorite = async (req, res) => {
  const token = await getValidToken(req)

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const favoriteFound = await Favorite.find({
      producto: req.params.id
    }).where({
      users_permissions_user: id
    })

    if (favoriteFound?.length > 0) {
      return res.status(HTTP_REQUEST_NO_CONTENT).end()
    }
    return res.status(HTTP_NOT_FOUND).end()
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.json({
      response: `${ERROR_FINDING_FAVORITES} - error: ${error}`
    })
  }
}

const addFavorite = async (req, res) => {
  const token = await getValidToken(req)

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)

    const favorite = new Favorite(req.body)
    favorite.users_permissions_user = id

    await favorite.save()

    return res.status(HTTP_REQUEST_CREATED).end()
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.status(HTTP_REQUEST_ACCEPTED).end()
  }
}

const removeFavorite = async (req, res) => {
  const token = await getValidToken(req)
  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const favoriteFound = await Favorite.findOne().where({
      producto: req.params.id,
      users_permissions_user: id
    })

    if (favoriteFound) {
      await Favorite.deleteOne().where({
        producto: req.params.id,
        users_permissions_user: id
      })
    }
    return res.status(HTTP_REQUEST_OK).end()
  } catch (error) {
    console.error(error)
    if (error === REQUEST_WITHOUT_TOKEN) {
      return errorWithoutToken(res)
    }
    return res.status(HTTP_REQUEST_ACCEPTED).end()
  }
}

const getFavorites = async (req, res) => {
  const token = await getValidToken(req)

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const favoritesFound = await Favorite.find()
      .where({
        users_permissions_user: id
      })
      .populate({
        path: 'producto'
      })

    if (favoritesFound?.length > 0) {
      return res.json(favoritesFound)
    }
    return res.status(HTTP_NOT_FOUND).end()
  } catch (error) {
    console.error(error)
    return res.status(HTTP_SERVER_ERROR).end()
  }
}

module.exports = {
  getFavorites,
  isFavorite,
  removeFavorite,
  addFavorite
}
