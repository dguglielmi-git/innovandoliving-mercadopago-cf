const { Router } = require('express')
const { fieldValidator } = require('../middlewares/fieldValidators')
const {
  getPublishedProducts,
  getProductsByPlatform,
  getProductById,
  getProductByTitle,
  createProduct
} = require('../controllers/product')

const router = Router()

// [GET]
router.get('/publishedProducts', [fieldValidator], getPublishedProducts)
router.get(
  '/productsByPlatform/:platform',
  [fieldValidator],
  getProductsByPlatform
)
router.get('/productById/:id', [fieldValidator], getProductById)
router.get('/productByTitle/:title', [fieldValidator], getProductByTitle)

// [POST]
router.post('/product', [fieldValidator], createProduct)

module.exports = router
