import { useQuery } from '@apollo/client';
import { GET_CAMPING_ITEMS } from '../utils/queries';

const Camping = () => {
  const { loading, error, data } = useQuery(GET_CAMPING_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const campingItems = data.getCampingItems;

  return (
    <div>
      <h2>Camping Items</h2>
      <ul>
        {campingItems.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Camping;