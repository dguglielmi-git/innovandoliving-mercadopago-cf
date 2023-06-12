const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const router = Router();

const routeFiles = fs.readdirSync(__dirname).filter(file => file !== "routes.js");

routeFiles.forEach(file => {
  const route = require(path.join(__dirname, file));
  router.use(route);
});

module.exports = router;
