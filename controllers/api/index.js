const router = require('express').Router();

const userRoute = require('./user-routes');
const walletRoute = require('./wallet-routes');
const coinRoutes = require('./coin-routes');

router.use('/users', userRoute);
router.use('/wallet', walletRoute);
router.use('/coin', coinRoutes);

module.exports = router;