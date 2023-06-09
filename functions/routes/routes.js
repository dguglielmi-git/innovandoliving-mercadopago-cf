const {Router} = require('express');
const mercadoPagoRoutes = require('./mpRoute');
const addressRoutes = require('./addressRoute');
const cartRoutes = require('./cartRoutes');

const router = Router();

router.use(mercadoPagoRoutes);
router.use(addressRoutes);
router.use(cartRoutes);

module.exports = router;