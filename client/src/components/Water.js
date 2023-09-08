import React from "react";
import { useQuery } from "@apollo/client";
import { GET_WATER_PRODUCTS } from "../utils/queries";

const Water = () => {
  const { loading, error, data } = useQuery(GET_WATER_PRODUCTS);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error: {error.message}</p>;

  const waterItems = data.getWaterItems;

  return (
    <div>
      <h2>Snow Items</h2>
      <ul>
        {waterItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Water;
