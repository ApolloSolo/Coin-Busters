const { alphaCall } = require('./alpha-vanatge');

async function getUserTickers(obj) {
    const userCoinKeys = Object.entries(obj);
    const userCoins = [];
    for(let i = 0; i < userCoinKeys.length; i ++) {
      if(parseFloat(userCoinKeys[i][1]) > 0) {
        userCoins.push(userCoinKeys[i][0])
      }
    }
    return userCoins;
  }

  async function calcUserMoney(array, obj) {
    for(let i = 0; i < array.length; i++) {
      let coinData = await alphaCall(array[i]);
      let coinPrice =
      coinData.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      obj.money = parseFloat(obj.money) + parseFloat(obj.wallet.dataValues[array[i]]) * parseFloat(coinPrice);
      obj.money = "$ " + obj.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return obj;
  } 

module.exports = {
    getUserTickers,
    calcUserMoney
}