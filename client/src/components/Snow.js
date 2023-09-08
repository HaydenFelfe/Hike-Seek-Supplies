import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SNOW_ITEMS } from "../utils/queries";

const Snow = () => {
  const { loading, error, data } = useQuery(GET_SNOW_ITEMS);

  if (loading) return <p>Loadin...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const snowItems = data.getSnowItems;

  return (
    <div>
      <h2>Snow Items</h2>
      <ul>
        {snowItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Snow;
