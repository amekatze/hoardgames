import { useEffect, useState } from 'react';

function Collection(props) {
  const [collection, setCollection] = useState([]);
  const userId = parseInt(props.userId);

  useEffect(() => {
    async function getCollection() {
      const response = await fetch(
        `http://localhost:5000/user/game?id=${userId}`
      );
      const data = await response.json();
      setCollection(data);
    }
    getCollection();
  }, [userId]);

  return (
    <div>
      <h1>This is my collection</h1>
      {collection.map((item) => {
        return <div key={item.id}>{item.game}</div>;
      })}
    </div>
  );
}

export default Collection;
