const express = require("express");
const router = express.Router();
const user = require("../controller/user");

router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));
router.post('/register',user.register);
router.post('/login', user.login);
router.get('/logout', (req, res) => {
    res.render('login');
});

module.exports = router;


  