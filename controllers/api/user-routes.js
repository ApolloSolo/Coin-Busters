const router = require("express").Router();
const { User, Wallet } = require("../../models/index");
const { getUserTickers, calcUserMoney } = require("../../util/alpha-helpers");
const startingFunds = 10000;

router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  let userData = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
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

  const userCoinTickers = await getUserTickers(userData.wallet.dataValues);

  userData = await calcUserMoney(userCoinTickers, userData);
  res.json(userData);
});

//create user
router.post("/", async (req, res) => {
  let newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    money: startingFunds,
  });
  let newWallet = await Wallet.create({
    user_id: newUser.id,
    btc: 0,
    eth: 0,
    ltc: 0,
    atom: 0,
    doge: 50,
  });
  req.session.save(() => {
    req.session.user_id = newUser.id;
    req.session.username = newUser.username;
    req.session.loggedIn = true;
  });
  res.json([newUser, newWallet]);
});

// log in
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((userData) => {
    if (!userData) {
      res.status(404).json({ message: "User email not found" });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.put("/:id", (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user of such id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
