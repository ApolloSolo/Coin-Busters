const router = require("express").Router();
const { User, Wallet } = require("../models/index");
const { getUserTickers, calcUserMoney } = require("../util/alpha-helpers");
const withAuth = require("../util/auth");

router.get("/", (req, res) => {
  res.render("homepage", { loggedIn: req.session.loggedIn });
  console.log(req.session.loggedIn);
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login-register");
});

router.get("/dashboard", withAuth, async (req, res) => {
  let userData = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Wallet,
        attributes: ["btc", "eth", "ltc", "atom", "doge"],
      },
    ],
  });
  if (!userData) {
    res.status(404).json({ message: "No user found by that id" });
    return;
  }

  const currentFunds = await userData.money;

  const userCoinTickers = await getUserTickers(userData.wallet.dataValues);
  // userCoinTickers = await userCoinTickers.get({})
  userData = await calcUserMoney(userCoinTickers, userData);
  userData = await userData.get({ plain: true });
  //res.json(userData);

  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
    userData,
    userCoinTickers,
    currentFunds,
  });
});

router.get("/buy", withAuth, async (req, res) => {
  let userData = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Wallet,
        attributes: ["btc", "eth", "ltc", "atom", "doge"],
      },
    ],
  });
  userData = await userData.get({ plain: true });
  res.render("buy", { userData, loggedIn: req.session.loggedIn });
});

router.get("/sell", withAuth, async (req, res) => {
  let userData = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.session.user_id,
    },
    include: [
      {
        model: Wallet,
        attributes: ["btc", "eth", "ltc", "atom", "doge"],
      },
    ],
  });
  userData = await userData.get({ plain: true });
  res.render("sell", { userData, loggedIn: req.session.loggedIn });
});

module.exports = router;
