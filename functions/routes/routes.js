const { Router } = require("express");
const mercadoPagoRoutes = require("./mpRoute");
const addressRoutes = require("./addressRoute");
const cartRoutes = require("./cartRoutes");
const productRoutes = require("./productRoute");
const platformRoutes = require('./platformRoute');

const router = Router();

router.use(mercadoPagoRoutes);
router.use(addressRoutes);
router.use(cartRoutes);
router.use(productRoutes);
router.use(platformRoutes);

module.exports = router;
