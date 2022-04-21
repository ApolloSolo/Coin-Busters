const router = require('express').Router();

const loginRoute = require('./login-register-routes');

router.use('/login', loginRoute);

module.exports = router;