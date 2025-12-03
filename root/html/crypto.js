const container = document.getElementById("crypto-container");

// Fetch top 10 coins from CoinGecko
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
  .then(res => res.json())
  .then(coins => {
    coins.forEach(coin => {
      // Create card container
      const card = document.createElement("div");
      card.className = "crypto-card";

      // Coin logo
      const img = document.createElement("img");
      img.src = coin.image; // live coin logo from web
      img.alt = coin.name;
      img.className = "coin-logo";

      // Coin name + symbol
      const name = document.createElement("h2");
      name.textContent = `${coin.name} (${coin.symbol.toUpperCase()})`;

      // Coin price
      const price = document.createElement("p");
      price.textContent = `$${coin.current_price.toLocaleString()} `;

      // Price change badge
      const badge = document.createElement("span");
      badge.className = coin.price_change_percentage_24h >= 0 ? "badge up" : "badge down";
      badge.innerHTML = `
        ${coin.price_change_percentage_24h >= 0 ? '↑' : '↓'} 
        ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
      `;

      // Append badge to price
      price.appendChild(badge);

      // Append elements to card
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(price);

      // Add card to container
      container.appendChild(card);
    });
  })
  .catch(err => console.error(err));
