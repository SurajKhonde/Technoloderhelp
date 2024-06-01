const backendResponse = {
  totalFunds: 1000,
  allocationPercentages: {
    BTC: 10, // 10% allocation allowed for BTC
    ETH: 20, // 20% allocation allowed for ETH
    USDT: 15 // 15% allocation allowed for USDT
  },
  currentAllocations: {
    BTC: 50, // $50 already allocated to BTC
    ETH: 150, // $150 already allocated to ETH
    USDT: 90 // $90 already allocated to USDT
  }
};
const { totalFunds, allocationPercentages, currentAllocations } = backendResponse;

// Function to get the maximum allowed allocation for a specific coin
function getMaxAllocation(coin) {
  return (totalFunds * allocationPercentages[coin]) / 100;
}

// Function to check if the user can invest in a specific coin
function canInvest(coin, amount) {
  const maxAllocation = getMaxAllocation(coin);
  const currentAllocation = currentAllocations[coin];
  const newAllocation = currentAllocation + amount;

  return newAllocation <= maxAllocation;
}

// Function to invest in a specific coin
function invest(coin, amount) {
  if (canInvest(coin, amount)) {
    currentAllocations[coin] += amount;
    console.log(`Successfully invested $${amount} in ${coin}.`);
  } else {
    console.log(`Investment in ${coin} denied. Allocation exceeds the allowed limit.`);
  }
}

// Example usage
console.log("User's initial allocations:", currentAllocations);

invest('BTC', 30); // Try investing $30 in BTC
invest('BTC', 70); // Try investing $70 in BTC

console.log("User's updated allocations:", currentAllocations);

invest('ETH', 50); // Try investing $50 in ETH
invest('ETH', 100); // Try investing $100 in ETH

console.log("User's updated allocations:", currentAllocations);

invest('USDT', 30); // Try investing $30 in USDT
invest('USDT', 10); // Try investing $10 in USDT

console.log("User's updated allocations:", currentAllocations);


// src/Ticker.js
import React, { useEffect, useState } from 'react';

const Ticker = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/funds'); // Replace with your actual API endpoint
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMaxAllocation = (coin) => {
    return (data.totalFunds * data.allocationPercentages[coin]) / 100;
  };

  const canInvest = (coin, amount) => {
    const maxAllocation = getMaxAllocation(coin);
    const currentAllocation = data.currentAllocations[coin];
    const newAllocation = currentAllocation + amount;

    return newAllocation <= maxAllocation;
  };

  const invest = (coin, amount) => {
    if (canInvest(coin, amount)) {
      const newAllocations = { ...data.currentAllocations, [coin]: data.currentAllocations[coin] + amount };
      setData({ ...data, currentAllocations: newAllocations });
      console.log(`Successfully invested $${amount} in ${coin}.`);
    } else {
      console.log(`Investment in ${coin} denied. Allocation exceeds the allowed limit.`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Total Money: {data?.totalFunds}</h1>
      <button onClick={() => invest('BTC', 30)}>Invest $30 in BTC</button>
      <button onClick={() => invest('BTC', 70)}>Invest $70 in BTC</button>
      <button onClick={() => invest('ETH', 50)}>Invest $50 in ETH</button>
      <button onClick={() => invest('ETH', 100)}>Invest $100 in ETH</button>
      <button onClick={() => invest('USDT', 30)}>Invest $30 in USDT</button>
      <button onClick={() => invest('USDT', 10)}>Invest $10 in USDT</button>
      <pre>{JSON.stringify(data?.currentAllocations, null, 2)}</pre>
    </div>
  );
};

export default Ticker;
