const router = require('express').Router();

const userRoute = require('./user-routes');
const walletRoute = require('./wallet-routes');

router.use('/users', userRoute);
router.use('/wallet', walletRoute);

module.exports = router;