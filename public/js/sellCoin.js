async function defaultAmount() {
  let coin = document.getElementById("coinSelect");
  let coinTicker = coin.options[coin.selectedIndex].value;
  let currentQuantity = coin.options[coin.selectedIndex].dataset.userquantity;
  let quantity = document.getElementById("quantity");
  quantity.value = currentQuantity;
  console.log(currentQuantity);
}

async function calcCoinCost() {
  let coin = document.getElementById("coinSelect");
  let coinValue = coin.options[coin.selectedIndex].value;
  let quantity = document.getElementById("quantity").value;
  let total = document.getElementById("total");
  let userFunds = document.getElementById("userFunds").innerText;
  const buyBtn = document.getElementById("buy-btn");

  console.log(userFunds);

  fetch(`/api/coin/${coinValue}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res) {
      res.json().then((data) => {
        let price = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
        price = parseFloat(price);
        buyBtn.classList.remove("disabled");
        total.value = quantity * price;
      });
    }
  });
}

async function sellCoins(event) {
  event.preventDefault();

  let userFunds = document.getElementById("userFunds").innerText;
  userFunds = parseFloat(userFunds);
  let sellQuantity = document.getElementById("quantity").value;
  sellQuantity = parseFloat(sellQuantity);
  let coin = document.getElementById("coinSelect");
  let currentQuantity = coin.options[coin.selectedIndex].dataset.userquantity;
  currentQuantity = parseFloat(currentQuantity);
  let coinTicker = coin.options[coin.selectedIndex].value;
  let sellPrice = document.getElementById("total").value;
  const userID = document.getElementById("userFunds").dataset.id;
  sellPrice = parseFloat(sellPrice);
  let total = currentQuantity - sellQuantity;
  let sumOfSell = userFunds + sellPrice;

  let putCoin = {};

  if (coinTicker === "doge") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        doge: total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "btc") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        btc: total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else if (coinTicker === "eth") {
    putCoin = {
      method: "PUT",
      body: JSON.stringify({
        eth: total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const response = await fetch(`/api/wallet/${userID}`, putCoin);

  const userUpdate = await fetch(`/api/users/${userID}`, {
    method: "PUT",
    body: JSON.stringify({
      money: sumOfSell,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (userUpdate.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#coinSelect").addEventListener("change", defaultAmount);
document.querySelector("#quantity").addEventListener("blur", calcCoinCost);
document.querySelector("#buyForm").addEventListener("submit", sellCoins);
