import React, { useState, useEffect } from "react";

function Portfolio() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const portfolio = JSON.parse(localStorage.getItem("data"));
    setData(portfolio);
  }, []);

  if (!data) return <p>No portfolio data</p>;

  const totalValue = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.value,
    0
  );

  const totalMortgages = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.mortgage,
    0
  );

  const composition = data.reduce(function (acc, obj) {
    let key = obj["city"];
    if (!acc[key]) {
      acc[key] = obj.value;
    } else {
      acc[key] = acc[key] + obj.value;
    }

    return acc;
  }, {});

  const growthRate = 5;

  return (
    <div>
      <h2>Portfolio value: £{totalValue}</h2>
      <h2>LTV: {Math.floor((totalMortgages / totalValue) * 100)}%</h2>
      <h2>
        Annual return:{" "}
        {Math.floor(
          (100 /
            Math.floor(
              (Math.floor(totalValue - totalMortgages) / totalValue) * 100
            )) *
            growthRate
        )}
        %
      </h2>
      <ul>
        {data.map(({ id, name }) => (
          <li key={id}>
            <a href={"/property/" + id}>{name}</a>
          </li>
        ))}
      </ul>
      <h3>Composition</h3>
      <ul>
        {Object.keys(composition).map((city) => (
          <li key={city}>
            {city} - {Math.floor((composition[city] / totalValue) * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Portfolio;
