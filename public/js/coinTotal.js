async function calcCoinCost(event) {
  event.preventDefault();

  let coin = document.getElementById("coinSelect");
  let coinValue = coin.options[coin.selectedIndex].value;
  let quantity = document.getElementById("quantity").value;
  let total = document.getElementById('total');

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
        console.log(quantity * price);
        total.value = quantity * price
      });
    }
  });
}

document.querySelector("#buyForm").addEventListener("submit", calcCoinCost);
