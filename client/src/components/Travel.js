import { useQuery } from '@apollo/client';
import { GET_TRAVEL_ITEMS } from '../utils/queries';

const Travel = () => {
  const { loading, error, data } = useQuery(GET_TRAVEL_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const travelItems = data.getTravelItems;

  return (
    <div>
      <h2>Travel Items</h2>
      <ul>
        {travelItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Travel;