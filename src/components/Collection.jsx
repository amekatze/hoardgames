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

  const updateRating = async (gameId, memberId, rating) => {
    try {
      const response = await fetch('http://localhost:5000/user/game', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameId: gameId,
          memberId: memberId,
          rating: parseInt(rating),
        }),
      });
      const result = await response;
      console.log(result);
      setCollection((prevCollection) =>
        prevCollection.map((item) => {
          if (item.game_id === gameId && item.member_id === memberId) {
            return {
              ...item,
              rating: parseInt(rating),
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='collection'>
      <div className='collection-grid'>
        {collection.length === 0 && <p>Your collection is empty</p>}
        {collection.map((item) => {
          return (
            <div className='collection-card' key={item.id}>
              <h3>{item.game}</h3>
              <img src={item.game_image} />
              <select
                value={item.rating}
                onChange={(e) =>
                  updateRating(item.game_id, item.member_id, e.target.value)
                }
              >
                <option selected disabled>
                  Rating
                </option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
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
