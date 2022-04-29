const router = require("express").Router();
const { alphaCall } = require("../../util/alpha-vanatge");
const catchAsync = require("../../util/catchAsync");

router.get(
  "/:ticker",
  catchAsync(async (req, res) => {
    const coinData = await alphaCall(req.params.ticker);
    res.json(coinData.data);
  })
);

module.exports = router;
