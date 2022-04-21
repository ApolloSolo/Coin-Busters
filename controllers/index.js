const router = require("express").Router();

const apiRoutes = require("./api/index");
const homeRoutes = require('./home-routes');
const htmlRoutes = require('./html/index')

router.use("/api", apiRoutes);
router.use('/user', htmlRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
