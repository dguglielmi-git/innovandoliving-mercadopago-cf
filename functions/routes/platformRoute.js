const { Router } = require('express')
const { fieldValidator } = require('../middlewares/fieldValidators')
const { getPlatforms, deletePlatform, addPlatform } = require('../controllers/platform')

const router = Router()

router.get('/platforms', [fieldValidator], getPlatforms)
router.post('/platform', [fieldValidator], addPlatform)
router.delete('/platform', [fieldValidator], deletePlatform)

module.exports = router
