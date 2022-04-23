const router = require("express").Router();
const { alphaCall } = require("../../util/alpha-vanatge");

router.get("/:ticker", async (req, res) => {
    const coinData = await(alphaCall(req.params.ticker));
    let coinPrice =
      coinData.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
    res.json(coinData.data)
});

module.exports = router;