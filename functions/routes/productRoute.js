const { Router } = require('express')
const { fieldValidator } = require('../middlewares/fieldValidators')
const {
  getPublishedProducts,
  getProductsByPlatform,
  getProductById,
  getProductByTitle,
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct
} = require('../controllers/product')
const { getSignedUrl } = require('../services/s3upload')

const router = Router()

// [GET]
router.get('/getAllProducts', [fieldValidator], getAllProducts)
router.get('/publishedProducts', [fieldValidator], getPublishedProducts)
router.get(
  '/productsByPlatform/:platform',
  [fieldValidator],
  getProductsByPlatform
)
router.get('/productById/:id', [fieldValidator], getProductById)
router.get('/productByTitle/:title', [fieldValidator], getProductByTitle)
router.get('/generateSignedUrl', getSignedUrl)

// [PUT]
router.put('/product/:id', [fieldValidator], updateProduct)

// [DELETE]
router.delete('/deleteProduct/:id', [fieldValidator], deleteProduct)

// [POST]
router.post('/product', [fieldValidator], createProduct)

module.exports = router
