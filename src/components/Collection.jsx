import { useEffect, useState } from 'react';
import '../styles/collection.scss';

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

  const deleteFromCollection = async (gameId, memberId) => {
    try {
      const response = await fetch('http://localhost:5000/user/game', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: gameId,
          memberId: memberId,
        }),
      });

      const result = await response;
      if (result.ok) {
        setCollection(collection.filter((item) => item.game_id !== gameId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='collection'>
      <div className='collection-grid'>
        {collection.map((item) => {
          return (
            <div className='collection-card' key={item.id}>
              <h3>{item.game}</h3>
              <img src={item.game_image} />
              <button
                onClick={() => {
                  deleteFromCollection(item.game_id, item.member_id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Collection;
