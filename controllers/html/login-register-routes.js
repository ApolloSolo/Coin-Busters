const router = require("express").Router();

router.get('/', (req, res) => {
    res.render('login-register');
});

module.exports = router;