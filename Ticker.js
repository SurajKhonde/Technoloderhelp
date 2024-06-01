// src/Ticker.js
import React, { useEffect, useState } from 'react';

const Ticker = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;

    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api3.binance.com/api/v3/ticker/price');
        const data = await response.json();
        const filteredPrices = data.filter(price => price.symbol.endsWith('USDT'));
        setPrices(filteredPrices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const fetchPricesWithTimeout = () => {
      timeoutId = setInterval(fetchPrices, 1000); // Adjust the timeout value if needed
    };

    fetchPricesWithTimeout();

    return () => clearInterval(timeoutId);
  }, [prices]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Binance Ticker Prices (USDT Pairs)</h1>
      <ul>
        {prices.map((price, index) => (
          <li key={index}>
            {price.symbol}: {price.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ticker;
