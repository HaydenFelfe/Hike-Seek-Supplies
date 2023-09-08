import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USED_PRODUCTS } from "../utils/queries";

const UsedEquipment = () => {
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error: {error.message}</p>;

  const UsedEquipmentItems = data.getUsedEquipmentItems;

  return (
    <div>
      <h2>Used Equipment</h2>
      <ul>
        {UsedEquipmentItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UsedEquipment;
