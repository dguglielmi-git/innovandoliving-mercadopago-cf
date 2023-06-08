const {Router} = require('express');
const mercadoPagoRoutes = require('./mpRoute');
const addressRoutes = require('./addressRoute');

const router = Router();

router.use(mercadoPagoRoutes);
router.use(addressRoutes);

module.exports = router;