import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Property = () => {
  const [data, setData] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const portfolioData = JSON.parse(localStorage.getItem("data"));
    const property = portfolioData.filter((item) => {
      return item.id.toString() === id;
    })[0];
    setData(property);
  }, [id]);

  if (!data) return <p>No property data</p>;

  return (
    <div>
      <p>Property: {data.name}</p>
      <p>Value: £{data.value}</p>
      <p>LTV: {Math.floor((data.mortgage / data.value) * 100)}%</p>
    </div>
  );
};

export default Property;
